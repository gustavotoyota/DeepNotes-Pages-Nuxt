import { nextTick } from "@nuxtjs/composition-api"
import { AppPage } from "../page"
import { Note } from "./notes"




export class AppDropping {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  perform(event: PointerEvent, regionNote: Note, dropIndex: number) {
    const selectedNotes = this.page.selection.notes.slice()
    
    selectedNotes.sort((a: Note, b: Note) => b.index - a.index)
    
    this.page.collab.doc.transact(() => {
      for (const selectedNote of selectedNotes) {
        selectedNote.removeFromRegion()
        regionNote.collab.noteIds.splice(dropIndex++, 0, selectedNote.id)
        selectedNote.parentId = regionNote.id
      }
    })

    this.page.activeRegion.id = regionNote.id




    nextTick(() => {
      const lastSelectedNote = this.page.selection.notes.at(-1) as Note
      
      lastSelectedNote.scrollIntoView()
    })



    
    this.page.dragging.cancel()
  }
}