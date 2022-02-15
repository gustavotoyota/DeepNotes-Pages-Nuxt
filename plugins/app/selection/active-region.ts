import { Context } from "@nuxt/types"
import { Exact, Nullable } from "~/types/deep-notes"
import { INote } from "../notes/notes";




export type {
  IAppActiveRegion,
}




interface IAppActiveRegion {
  id: Nullable<string>
  parent: Nullable<INote>
  noteIds: string[]
  notes: INote[]

  reset(): void
}




export const init = <T>({ $app }: Context) => 
new class implements IAppActiveRegion {
  id: Nullable<string> = null
  parent: Nullable<INote> = null
  noteIds: string[] = []
  notes: INote[] = []




  constructor() {
    $static.vue.ref(this, 'activeRegion.id')




    $static.vue.computed(this, 'parent', () => {
      return $app.elems.map[$app.activeRegion.id ?? ''] ?? null
    })




    $static.vue.computed(this, 'noteIds', () => {
      if ($app.activeRegion.id == null)
        return $app.page.collab.noteIds
      else
        return $app.notes.collab[$app.activeRegion.id].childIds
    })
    $static.vue.computed(this, 'notes', () => 
      $app.activeRegion.noteIds.map(noteId => $app.elems.map[noteId]))
  }




  reset() {
    $app.activeRegion.id = null
  }
} as Exact<IAppActiveRegion, T>