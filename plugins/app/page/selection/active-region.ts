import { Context } from "@nuxt/types";
import { Nullable } from "~/types/deep-notes";
import { AppPage } from "../page";
import { Note } from "../notes/notes";
import { Arrow } from "../arrows/arrows";
import { Elem } from "../elems/elems";




export class AppActiveRegion {
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




    $static.vue.ssrRef(this, '$app.page.activeRegion.id', () => null)




    $static.vue.computed(this, '$app.page.activeRegion.parent', () => {
      if (this.id == null)
        return null
      else
        return this.page.notes.map[this.id]
    })




    $static.vue.computed(this, '$app.page.activeRegion.noteIds', () => {
      if (this.id == null)
        return this.page.data.collab.noteIds
      else
        return this.page.notes.collab[this.id].noteIds
    })
    $static.vue.computed(this, '$app.page.activeRegion.notes', () =>
      this.page.notes.fromIds(this.noteIds))




    $static.vue.computed(this, '$app.page.activeRegion.arrowIds', () => {
      if (this.id == null)
        return this.page.data.collab.arrowIds
      else
        return []
    })
    $static.vue.computed(this, '$app.page.activeRegion.arrows', () =>
      this.page.arrows.fromIds(this.arrowIds))




    $static.vue.computed(this, '$app.page.activeRegion.elems', () =>
      (this.notes as Elem[]).concat(this.arrows as Elem[]))
  }
}