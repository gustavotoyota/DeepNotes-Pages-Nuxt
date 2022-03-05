import { Context } from "@nuxt/types"
import Vue from "vue"
import { AppPage } from "../page"
import { Note } from "./notes"




export {
  AppDropping,
}




class AppDropping {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  perform(event: PointerEvent, regionNote: Note, dropIndex: number) {
    this.page.dragging.cancel()
    



    const selectedNotes = this.page.selection.notes.slice()
    
    selectedNotes.sort((a: Note, b: Note) => b.index - a.index)
    
    this.page.collab.doc.transact(() => {
      for (const selectedNote of selectedNotes) {
        selectedNote.removeFromRegion()
        regionNote.collab.childIds.splice(dropIndex++, 0, selectedNote.id)
        selectedNote.parentId = regionNote.id
      }
    })

    this.page.activeRegion.id = regionNote.id




    Vue.nextTick(() => {
      const lastSelectedNote = this.page.selection.notes.at(-1) as Note
      
      lastSelectedNote.scrollIntoView()
    })
  }
}