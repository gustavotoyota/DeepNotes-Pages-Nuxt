import { Context } from "@nuxt/types"
import Vue from 'vue'
import { AppPage } from "../page"
import { Note } from "../notes/notes"




export {
  AppDeleting,
}




class AppDeleting {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  perform(notes?: Note[]) {
    notes = notes ?? this.page.selection.notes

    for (const note of notes) {
      if (this.page.activeElem.is(note))
        this.page.activeElem.clear()

      this.perform(note.children)

      note.removeFromRegion()
      Vue.delete(this.page.collab.store.notes, note.id)
    }

    this.page.selection.clear()
  }
}