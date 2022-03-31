import { Context } from "@nuxt/types"
import { cloneDeep, pull } from "lodash"
import { Nullable } from "~/types/deep-notes"
import { INoteCollab } from "./page/notes/notes"
import { z } from "zod"
import { Op } from "~/plugins/static/types"
import { IContainerCollab } from "./page/container"




export const ISerialArrow = z.object({})
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




    for (const noteId of container.noteIds) {
      // Children

      const note = this.ctx.$app.page.notes.fromIds([noteId])[0]
      
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




      serialContainer.notes.push(serialNote as ISerialNote)
    }




    return serialContainer
  }




  private _deserializeAux(serialContainer: ISerialContainer): string[] {
    const noteIds = []



    
    for (const serialNote of serialContainer.notes) {
      const collab = {} as Partial<INoteCollab>




      // Head and body

      collab.head = $static.syncedStore.createText(serialNote.head)
      collab.body = $static.syncedStore.createText(serialNote.body)




      // Rest of the keys

      const collabKeys = Object.keys(serialNote)
      pull(collabKeys, 'head', 'body', 'notes', 'arrows')
      for (const collabKey of collabKeys)
        // @ts-ignore
        collab[collabKey] = cloneDeep(serialNote[collabKey])




      // Children

      collab.noteIds = this._deserializeAux({
        notes: serialNote.notes,
        arrows: serialNote.arrows,
      })



      
      const noteId = this.ctx.$app.page.notes.create(collab as INoteCollab)
      
      noteIds.push(noteId)
    }




    return noteIds
  }
  deserialize(serialContainer: ISerialContainer,
  destContainer: IContainerCollab, destIndex?: Nullable<number>): string[] {
    serialContainer = ISerialContainer.parse(serialContainer)




    const noteIds = this._deserializeAux(serialContainer)



    
    destIndex = destIndex ?? destContainer.noteIds.length
    destContainer.noteIds.splice(destIndex, 0, ...noteIds)




    return noteIds
  }
}