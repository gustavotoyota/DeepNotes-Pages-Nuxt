import { Context } from "@nuxt/types"
import Vue from 'vue'
import { AppPage } from "../page"
import { Note } from "../notes/notes"
import { Arrow } from "../arrows/arrows"




export class AppDeleting {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  private _performAux(notes: Note[], noteSet: Set<Note>, arrowSet: Set<Arrow>) {
    for (const note of notes) {
      noteSet.add(note)

      for (const arrow of note.incomingArrows)
        arrowSet.add(arrow)
      for (const arrow of note.outgoingArrows)
        arrowSet.add(arrow)
      for (const arrow of note.arrows)
        arrowSet.add(arrow)
      
      this._performAux(note.notes, noteSet, arrowSet)
    }
  }
  perform() {
    const noteSet = new Set<Note>()
    const arrowSet = new Set<Arrow>()




    this.page.collab.doc.transact(() => {
      // Delete notes
      
      this._performAux(this.page.selection.notes, noteSet, arrowSet)
  
      const sortedNotes = Array.from(noteSet).sort((a: Note, b: Note) => b.index - a.index)
      
      for (const note of sortedNotes) {
        note.removeFromRegion()
        Vue.delete(this.page.collab.store.notes, note.id)
      }
  
  
  
  
      // Delete arrows
  
      for (const arrow of this.page.selection.arrows)
        arrowSet.add(arrow)
        
      const sortedArrows = Array.from(arrowSet).sort((a: Arrow, b: Arrow) => b.index - a.index)
  
      for (const arrow of sortedArrows) {
        arrow.removeFromRegion()
        Vue.delete(this.page.collab.store.arrows, arrow.id)
      }
    })




    this.page.selection.clear()



    
    // Reset undo-redo capturing
    
    this.page.undoRedo.resetCapturing()
  }
}