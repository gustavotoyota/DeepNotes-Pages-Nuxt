import { Vec2 } from "~/plugins/static/vec2"
import { ISerialContainer } from "../../serialization"
import { Arrow } from "../arrows/arrows"
import { Note } from "../notes/notes"
import { AppPage } from "../page"
import { Elem, ElemType } from "./elems"




export class AppClipboard {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  copy() {
    let clipboardContainer = this.page.app.serialization.serialize(this.page.selection)




    // Subtract center

    const centerPos = this.page.selection.centerPos
    
    for (const clipboardNote of clipboardContainer.notes) {
      clipboardNote.pos.x -= centerPos.x
      clipboardNote.pos.y -= centerPos.y
    }

    for (const clipboardArrow of clipboardContainer.arrows) {
      if (clipboardArrow.start.noteIndex == null) {
        clipboardArrow.start.pos.x -= centerPos.x
        clipboardArrow.start.pos.y -= centerPos.y
      }

      if (clipboardArrow.end.noteIndex == null) {
        clipboardArrow.end.pos.x -= centerPos.x
        clipboardArrow.end.pos.y -= centerPos.y
      }
    }




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
      const destCenter = this.page.selection.centerPos.add(new Vec2(8, 8))

      for (const clipboardNote of clipboardContainer.notes) {
        clipboardNote.pos.x += destCenter.x
        clipboardNote.pos.y += destCenter.y
      }
    }




    // Insert notes into structure

    let destIndex
    if (this.page.selection.notes.length > 0)
      destIndex = this.page.selection.notes.at(-1)!.index + 1

    const { noteIds, arrowIds } = this.page.app.serialization.deserialize(
      clipboardContainer, this.page.activeRegion, destIndex)




    // Select notes
    
    const notes = this.page.notes.fromIds(noteIds)
    const arrows = this.page.arrows.fromIds(arrowIds)

    this.page.selection.set(...(notes as Elem[]).concat(arrows))




    // Reset undo-redo capturing
    
    this.page.undoRedo.resetCapturing()
  }
  
  
  
  
  cut() {
    this.copy()
    this.page.deleting.perform()
  }
}