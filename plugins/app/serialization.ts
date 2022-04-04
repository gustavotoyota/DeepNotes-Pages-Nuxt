import { Context } from "@nuxt/types"
import { cloneDeep, pull } from "lodash"
import { v4 as uuidv4 } from 'uuid'
import Vue from "vue"
import { z } from "zod"
import { Op } from "~/plugins/static/types"
import { Nullable } from "~/types/deep-notes"
import { IVec2 } from "../static/vec2"
import { IArrowCollab } from "./page/arrows/arrows"
import { IContainerCollab } from "./page/container"
import { INoteCollab } from "./page/notes/notes"




export const ISerialArrowEndpoint = z.object({
  noteIndex: z.number().nullable().default(null),
  pos: IVec2.default({ x: 0, y: 0 }),
})
export type ISerialArrowEndpoint = z.infer<typeof ISerialArrowEndpoint>

export const ISerialArrow = z.object({
  start: ISerialArrowEndpoint.default({}),
  end: ISerialArrowEndpoint.default({}),
})
export type ISerialArrow = z.infer<typeof ISerialArrow>




export interface ISerialContainer {
  notes: ISerialNote[]
  arrows: ISerialArrow[]
}
export const ISerialContainer = z.lazy(() => 
  z.object({
    notes: ISerialNote.array().default([]),
    arrows: ISerialArrow.array().default([]),
  })
) as z.ZodType<ISerialContainer>




export interface ISerialNote
extends Omit<INoteCollab, 'head' | 'body' | 'noteIds' | 'zIndex'>,
ISerialContainer {
  head: Op[]
  body: Op[]
}
export const ISerialNote = z.lazy(() =>
  INoteCollab.omit({
    head: true,
    body: true,
    noteIds: true,
    zIndex: true,
  }).extend({
    head: Op.array().default([{ insert: '\n' }]),
    body: Op.array().default([{ insert: '\n' }]),
    
    notes: ISerialNote.array().default([]),
    arrows: ISerialArrow.array().default([]),
  })
) as z.ZodType<ISerialNote>




export class AppSerialization {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  serialize(container: IContainerCollab): ISerialContainer {
    const serialContainer: ISerialContainer = {
      notes: [],
      arrows: [],
    }




    // Serialize notes

    const noteMap = new Map<string, number>()

    for (const noteId of container.noteIds) {
      // Children

      const note = this.ctx.$app.page.notes.fromId(noteId)
      
      const serialNote: Partial<ISerialNote> = this.serialize(note.collab)




      // Head and body

      serialNote.head = note.collab.head.toDelta()
      serialNote.body = note.collab.body.toDelta()




      // Rest of the properties
      
      const collabKeys = Object.keys(note.collab)
      pull(collabKeys, 'head', 'body', 'noteIds', 'zIndex')
      for (const collabKey of collabKeys)
        // @ts-ignore
        serialNote[collabKey] = cloneDeep(note.collab[collabKey])




      noteMap.set(noteId, serialContainer.notes.length)
      
      serialContainer.notes.push(serialNote as ISerialNote)
    }




    // Serialize arrows

    for (const arrowId of container.arrowIds) {
      const arrow = this.ctx.$app.page.arrows.fromId(arrowId)




      const serialArrow: ISerialArrow = {
        start: {
          noteIndex: noteMap.get(arrow.collab.start.noteId ?? '') ?? null,
          pos: arrow.collab.start.pos,
        },
        end: {
          noteIndex: noteMap.get(arrow.collab.end.noteId ?? '') ?? null,
          pos: arrow.collab.end.pos,
        },
      }




      serialContainer.arrows.push(serialArrow)
    }




    return serialContainer
  }




  private _deserializeAux(serialContainer: ISerialContainer): IContainerCollab {
    const noteMap = new Map<number, string>()




    // Deserialize notes

    const noteIds = []
    
    for (let i = 0; i < serialContainer.notes.length; i++) {
      const serialNote = serialContainer.notes[i]

      const noteCollab = {} as Partial<INoteCollab>




      // Head and body

      noteCollab.head = $static.syncedStore.createText(serialNote.head)
      noteCollab.body = $static.syncedStore.createText(serialNote.body)




      // Rest of the keys

      const collabKeys = Object.keys(serialNote)
      pull(collabKeys, 'head', 'body', 'notes', 'arrows')
      for (const collabKey of collabKeys)
        // @ts-ignore
        noteCollab[collabKey] = cloneDeep(serialNote[collabKey])

      noteCollab.zIndex = this.ctx.$app.page.data.collab.nextZIndex++




      // Children

      const deserializedChild = this._deserializeAux(serialNote)

      noteCollab.noteIds = deserializedChild.noteIds
      noteCollab.arrowIds = deserializedChild.arrowIds


      

      // Add note data to the store
      
      const noteId = uuidv4()

      Vue.set(this.ctx.$app.page.notes.collab, noteId, noteCollab)

      noteMap.set(i, noteId)

      

      
      noteIds.push(noteId)
    }




    // Deserialize arrows

    const arrowIds = []

    for (const serialArrow of serialContainer.arrows) {
      const arrowCollab: IArrowCollab = {
        start: {
          noteId: noteMap.get(serialArrow.start.noteIndex ?? -1) ?? null,
          pos: serialArrow.start.pos,
        },
        end: {
          noteId: noteMap.get(serialArrow.end.noteIndex ?? -1) ?? null,
          pos: serialArrow.end.pos,
        },
      }




      const arrowId = uuidv4()

      Vue.set(this.ctx.$app.page.arrows.collab, arrowId, arrowCollab)




      arrowIds.push(arrowId)
    }




    return { noteIds, arrowIds }
  }
  deserialize(serialContainer: ISerialContainer,
  destContainer: IContainerCollab, destIndex?: Nullable<number>): IContainerCollab {
    serialContainer = ISerialContainer.parse(serialContainer)




    let result: IContainerCollab = { noteIds: [], arrowIds: [] }

    this.ctx.$app.page.collab.doc.transact(() => {
      result = this._deserializeAux(serialContainer)



      
      destIndex = destIndex ?? destContainer.noteIds.length
      destContainer.noteIds.splice(destIndex, 0, ...result.noteIds)




      destContainer.arrowIds.push(...result.arrowIds)
    })




    return result
  }
}