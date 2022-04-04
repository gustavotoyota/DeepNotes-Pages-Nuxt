import { nextTick } from "@nuxtjs/composition-api"
import { cloneDeep, pull } from "lodash"
import { Elem } from "../elems/elems"
import { AppPage } from "../page"
import { INoteCollab, Note } from "./notes"




export class AppCloning {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  perform() {
    // Serialize selection

    const serialContainer = this.page.app.serialization.serialize(this.page.selection)




    // Deserialize into structure

    let destIndex
    if (this.page.selection.notes.length > 0)
      destIndex = this.page.selection.notes.at(-1)!.index + 1

    const { noteIds, arrowIds } = this.page.app.serialization.deserialize(
      serialContainer, this.page.activeRegion, destIndex)




    // Select and reposition clones

    const notes = this.page.notes.fromIds(noteIds)
    const arrows = this.page.arrows.fromIds(arrowIds)

    this.page.selection.set(...(notes as Elem[]).concat(arrows))

    if (this.page.activeRegion.id == null) {
      this.page.collab.doc.transact(() => {
        for (const note of notes) {
          note.collab.pos.x += 8
          note.collab.pos.y += 8
        }
      })
    }



    
    // Reset undo-redo capturing
    
    this.page.undoRedo.resetCapturing()




    // Scroll into view

    if (this.page.selection.notes.length > 0) {
      nextTick(() => {
        const lastSelectedNote = this.page.selection.notes.at(-1) as Note
        
        lastSelectedNote.scrollIntoView()
      })
    }
  }
}