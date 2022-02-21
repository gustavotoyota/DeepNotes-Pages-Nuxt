import { Context } from "@nuxt/types"
import { Nullable } from "~/types/deep-notes"
import { Note } from "../notes/notes";




export {
  AppActiveRegion,
}




class AppActiveRegion {
  ctx: Context

  id!: Nullable<string>
  parent!: Nullable<Note>
  noteIds!: string[]
  notes!: Note[]




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ref(this, 'activeRegion.id')




    $static.vue.computed(this, 'parent', () =>
      this.ctx.$app.elems.map[this.id ?? ''] ?? null)




    $static.vue.computed(this, 'noteIds', () => {
      if (this.id == null)
        return this.ctx.$app.page.collab.noteIds
      else
        return this.ctx.$app.notes.collab[this.id].childIds
    })
    $static.vue.computed(this, 'notes', () =>
      this.ctx.$app.activeRegion.noteIds
        .map(noteId => this.ctx.$app.elems.map[noteId])
        .filter(note => note != null))
  }




  reset() {
    this.ctx.$app.activeRegion.id = null
  }
}