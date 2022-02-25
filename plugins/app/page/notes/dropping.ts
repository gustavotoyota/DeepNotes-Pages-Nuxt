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
    this.page.dragging.finish(event)
    



    const selectedNotes = this.page.selection.notes.splice(0).reverse()

    for (const selectedNote of selectedNotes) {
      if (selectedNote === regionNote)
        continue

      selectedNote.removeFromRegion()

      regionNote.collab.childIds.splice(dropIndex, 0, selectedNote.id)
      selectedNote.parentId = regionNote.id
    }

    this.page.activeRegion.id = regionNote.id




    Vue.nextTick(() => {
      const lastSelectedNote = this.page.selection.notes.at(-1) as Note
      
      lastSelectedNote.scrollIntoView()
    })
  }
}