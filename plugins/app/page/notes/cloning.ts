import { nextTick } from "@nuxtjs/composition-api"
import { cloneDeep, pull } from "lodash"
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

    const cloneIds = this.page.app.serialization.deserialize(
      serialContainer, this.page.activeRegion, destIndex)




    // Select and reposition clones

    const clones = this.page.notes.fromIds(cloneIds)

    this.page.selection.set(...clones)

    if (this.page.activeRegion.id == null) {
      this.page.collab.doc.transact(() => {
        for (const clone of clones) {
          clone.collab.pos.x += 8
          clone.collab.pos.y += 8
        }
      })
    }



    
    // Reset undo-redo capturing
    
    this.page.undoRedo.resetCapturing()




    // Scroll into view

    nextTick(() => {
      const lastSelectedNote = this.page.selection.notes.at(-1) as Note
      
      lastSelectedNote.scrollIntoView()
    })
  }
}