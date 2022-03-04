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
    notes = notes.slice()
    
    notes.sort((a: Note, b: Note) => b.index - a.index)

    for (const note of notes) {
      note.removeFromRegion()

      this._performAux(note.children, noteIds)
      
      noteIds.push(note.id)
    }
  }
  perform() {
    const noteIds: string[] = []
    
    this._performAux(this.page.selection.notes, noteIds)
    
    for (const noteId of noteIds)
      Vue.delete(this.page.collab.store.notes, noteId)

    this.page.selection.clear()
  }
}