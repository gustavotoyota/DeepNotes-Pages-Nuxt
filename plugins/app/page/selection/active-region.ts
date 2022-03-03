import { Context } from "@nuxt/types";
import { Nullable } from "~/types/deep-notes";
import { AppPage } from "../page";
import { Note } from "../notes/notes";
import { Arrow } from "../arrows/arrows";
import { Elem } from "../elems/elems";




export {
  AppActiveRegion,
};




class AppActiveRegion {
  page: AppPage

  id!: Nullable<string>
  parent!: Nullable<Note>

  noteIds!: string[]
  notes!: Note[]

  arrowIds!: string[]
  arrows!: Arrow[]
  
  elems!: Elem[]




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ssrRef(this, 'activeRegion.id', () => null)




    $static.vue.computed(this, 'parent', () => {
      if (this.id == null)
        return null
      else
        return this.page.notes.map[this.id]
    })




    $static.vue.computed(this, 'noteIds', () => {
      if (this.id == null)
        return this.page.data.collab.noteIds
      else
        return this.page.notes.collab[this.id].childIds
    })
    $static.vue.computed(this, 'notes', () =>
      this.noteIds
        .map(noteId => this.page.notes.map[noteId])
        .filter(note => note != null))




    $static.vue.computed(this, 'arrowIds', () => {
      if (this.id == null)
        return this.page.data.collab.arrowIds
      else
        return []
    })
    $static.vue.computed(this, 'arrows', () =>
      this.arrowIds
        .map(arrowId => this.page.arrows.map[arrowId])
        .filter(arrow => arrow != null))




    $static.vue.computed(this, 'elems', () =>
      (this.notes as Elem[]).concat(this.arrows as Elem[]))
  }
}