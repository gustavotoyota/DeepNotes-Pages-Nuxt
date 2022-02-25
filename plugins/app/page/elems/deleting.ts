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




  private _performAux(notes: Note[]) {
    for (const note of notes) {
      if (this.page.activeElem.is(note))
        this.page.activeElem.clear()

      note.removeFromRegion()
      Vue.delete(this.page.collab.store.notes, note.id)

      this._performAux(note.children)
    }
  }
  perform() {
    this._performAux(this.page.selection.notes)

    this.page.selection.clear()
  }
}