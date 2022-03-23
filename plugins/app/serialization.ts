import { Context } from "@nuxt/types"
import { cloneDeep, pull } from "lodash"
import { Nullable } from "~/types/deep-notes"
import { INoteCollab } from "./page/notes/notes"
import { z } from "zod"
import { Op } from "~/plugins/static/types"




export const IContainer = z.object({
  noteIds: z.string().array(),
  arrowIds: z.string().array(),
})
export type IContainer = z.infer<typeof IContainer>




export const ISerialArrow = z.object({})
export type ISerialArrow = z.infer<typeof ISerialArrow>




export interface ISerialContainer {
  notes: ISerialNote[]
  arrows: ISerialArrow[]
}
export const ISerialContainer: z.ZodType<ISerialContainer> = z.lazy(() => 
  z.object({
    notes: ISerialNote.array(),
    arrows: ISerialArrow.array(),
  })
)




export interface ISerialNote
extends Omit<INoteCollab, 'title' | 'body' | 'childIds' | 'zIndex'>,
ISerialContainer {
  title: Op[]
  body: Op[]
}
export const ISerialNote = z.lazy(() =>
  INoteCollab.omit({
    title: true,
    body: true,
    childIds: true,
    zIndex: true,
  }).extend({
    title: Op.array(),
    body: Op.array(),
    notes: ISerialNote.array(),
    arrows: ISerialArrow.array(),
  })
) as z.ZodType<ISerialNote>




export class AppSerialization {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  serialize(container: IContainer): ISerialContainer {
    const serialContainer: ISerialContainer = {
      notes: [],
      arrows: [],
    }




    for (const noteId of container.noteIds) {
      // Children

      const note = this.ctx.$app.page.notes.fromIds([noteId])[0]
      
      const serialNote: Partial<ISerialNote> = this.serialize({
        noteIds: note.collab.childIds,
        arrowIds: [],
      })




      // Title and body

      serialNote.title = note.collab.title.toDelta()
      serialNote.body = note.collab.body.toDelta()




      // Rest of the properties
      
      const collabKeys = Object.keys(note.collab)
      pull(collabKeys, 'title', 'body', 'childIds', 'zIndex')
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




      // Title and body

      collab.title = $static.syncedStore.createText(serialNote.title)
      collab.body = $static.syncedStore.createText(serialNote.body)




      // Rest of the keys

      const collabKeys = Object.keys(serialNote)
      pull(collabKeys, 'title', 'body', 'notes', 'arrows')
      for (const collabKey of collabKeys)
        // @ts-ignore
        collab[collabKey] = cloneDeep(serialNote[collabKey])




      // Children

      collab.childIds = this._deserializeAux({
        notes: serialNote.notes,
        arrows: serialNote.arrows,
      })



      
      const noteId = this.ctx.$app.page.notes.create(collab as INoteCollab)
      
      noteIds.push(noteId)
    }




    return noteIds
  }
  deserialize(serialContainer: ISerialContainer,
  destContainer: IContainer, destIndex?: Nullable<number>): string[] {
    const noteIds = this._deserializeAux(serialContainer)



    
    destIndex = destIndex ?? destContainer.noteIds.length
    destContainer.noteIds.splice(destIndex, 0, ...noteIds)




    return noteIds
  }
}