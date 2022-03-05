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




  private _performAux(notes: Note[], noteIds: string[]) {
    for (let i = notes.length - 1; i >= 0; --i) {
      noteIds.push(notes[i].id)
      notes[i].removeFromRegion()
    }

    for (const note of notes)
      this._performAux(note.children, noteIds)
  }
  perform() {
    const noteIds: string[] = []

    this.page.collab.doc.transact(() => {
      const selectedNotes = this.page.selection.notes
      selectedNotes.sort((a: Note, b: Note) => a.index - b.index)
      this._performAux(selectedNotes, noteIds)
      
      for (const noteId of noteIds)
        Vue.delete(this.page.collab.store.notes, noteId)
    })

    this.page.selection.clear()
  }
}