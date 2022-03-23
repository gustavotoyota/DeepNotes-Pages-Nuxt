import { IVec2 } from "~/plugins/static/types"
import { ISerialContainer } from "../../serialization"
import { Note } from "../notes/notes"
import { AppPage } from "../page"




export class AppClipboard {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  copy() {
    let clipboardContainer = this.page.app.serialization.serialize({
      noteIds: this.page.selection.noteIds,
      arrowIds: [],
    })




    // Calculate center position

    const centerPos = { x: 0, y: 0 }

    for (const clipboardNote of clipboardContainer.notes) {
      centerPos.x += clipboardNote.pos.x
      centerPos.y += clipboardNote.pos.y
    }

    centerPos.x /= clipboardContainer.notes.length
    centerPos.y /= clipboardContainer.notes.length




    // Subtract center from note positions
    
    for (const clipboardNote of clipboardContainer.notes) {
      clipboardNote.pos.x -= centerPos.x
      clipboardNote.pos.y -= centerPos.y
    }




    clipboardContainer = ISerialContainer.parse(clipboardContainer)
    const clipboardText = JSON.stringify(clipboardContainer)
    $static.clipboard.set(clipboardText)
  }
  
  
  
  
  async paste(text?: string) {
    // Get clipboard notes from clipboard

    const clipboardText = text ?? await $static.clipboard.get()
    let clipboardContainer = JSON.parse(clipboardText)
    clipboardContainer = ISerialContainer.parse(clipboardContainer)




    // Center notes around destination

    if (this.page.activeRegion.id == null) {
      let destCenter: IVec2

      if (this.page.activeElem.exists) {
        const auxPos = (this.page.activeElem.get as Note).collab.pos

        destCenter = {
          x: auxPos.x + 8,
          y: auxPos.y + 8,
        }
      } else
        destCenter = this.page.camera.pos



        
      for (const clipboardNote of clipboardContainer.notes) {
        clipboardNote.pos.x += destCenter.x
        clipboardNote.pos.y += destCenter.y
      }
    }




    // Insert notes into structure

    let destIndex
    if (this.page.selection.notes.length > 0)
      destIndex = this.page.selection.notes.at(-1)!.index + 1

    const noteIds = this.page.app.serialization.deserialize(
      clipboardContainer, this.page.activeRegion, destIndex)




    // Select notes
    
    const notes = this.page.notes.fromIds(noteIds)

    this.page.selection.set(...notes)




    // Reset undo-redo capturing
    
    this.page.undoRedo.resetCapturing()
  }
  
  
  
  
  cut() {
    this.copy()
    this.page.deleting.perform()
  }
}