import { Context } from "@nuxt/types"
import Vue from 'vue'
import { Note } from "../notes/notes"




export {
  AppDeleting,
}




class AppDeleting {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  perform(notes?: Note[]) {
    notes = notes ?? this.ctx.$app.selection.notes

    for (const note of notes) {
      if (this.ctx.$app.activeElem.is(note))
        this.ctx.$app.activeElem.clear()

      this.perform(note.children)

      note.removeFromRegion()
      Vue.delete(this.ctx.$app.collab.store.notes, note.id)
    }

    this.ctx.$app.selection.clear()
  }
}