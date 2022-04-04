import Vue from 'vue'
import { Arrow } from "../arrows/arrows"
import { Note } from "../notes/notes"
import { AppPage } from "../page"




export class AppDeleting {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  private _performAux(notes: Note[], arrows: Arrow[] = []) {
    // Delete arrows

    const arrowSet = new Set<Arrow>(arrows)

    for (const note of notes) {
      for (const arrow of note.incomingArrows)
        arrowSet.add(arrow)
      for (const arrow of note.outgoingArrows)
        arrowSet.add(arrow)
      for (const arrow of note.arrows)
        arrowSet.add(arrow)
    }

    const sortedArrows = Array.from(arrowSet).sort(
      (a: Arrow, b: Arrow) => b.index - a.index)

    for (const arrow of sortedArrows) {
      arrow.removeFromRegion()
      Vue.delete(this.page.collab.store.arrows, arrow.id)
    }




    // Delete notes

    notes.sort((a: Note, b: Note) => b.index - a.index)

    for (const note of notes) {
      this._performAux(note.notes)
      
      note.removeFromRegion()
      Vue.delete(this.page.collab.store.notes, note.id)
    }
  }
  perform() {
    this.page.collab.doc.transact(() => {
      this._performAux(this.page.selection.notes, this.page.selection.arrows)
    })




    this.page.selection.clear()



    
    this.page.undoRedo.resetCapturing()
  }
}