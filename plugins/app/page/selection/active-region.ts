import { Context } from "@nuxt/types";
import { Nullable } from "~/types/deep-notes";
import { AppPage } from "../page";
import { Note } from "../notes/notes";




export {
  AppActiveRegion,
};




class AppActiveRegion {
  page: AppPage

  id!: Nullable<string>
  parent!: Nullable<Note>
  noteIds!: string[]
  notes!: Note[]




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ref(this, 'activeRegion.id', () => null)




    $static.vue.computed(this, 'parent', () =>
      this.page.elems.map[this.id ?? ''] ?? null)




    $static.vue.computed(this, 'noteIds', () => {
      if (this.id == null)
        return this.page.data.collab.noteIds
      else
        return this.page.notes.collab[this.id].childIds
    })
    $static.vue.computed(this, 'notes', () =>
      this.page.activeRegion.noteIds
        .map(noteId => this.page.elems.map[noteId])
        .filter(note => note != null))
  }
}