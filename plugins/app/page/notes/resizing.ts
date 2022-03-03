import { Context } from "@nuxt/types"
import { cloneDeep } from "lodash"
import { Nullable } from "~/types/deep-notes"
import { AppPage } from "../page"
import { Note } from "./notes"




export {
  AppResizing,
}




class AppResizing {
  page: AppPage

  side!: string
  section!: Nullable<string>




  constructor(page: AppPage) {
    this.page = page



    
    $static.vue.ssrRef(this, 'resizing.side', () => '')
    $static.vue.ssrRef(this, 'resizing.section', () => null)
  }




  start(event: PointerEvent, note: Note, side: string, section?: Nullable<string>) {
    this.side = side
    this.section = section ?? null



    
    this.page.activeElem.set(note)




    document.addEventListener('pointermove', this._update)
    document.addEventListener('pointerup', this._finish)
  }




  private _update = function (this: AppResizing, event: PointerEvent) {
    const activeNote = this.page.activeElem.get as Note
    
    const frameClientRect = activeNote.getClientRect('frame')
    const sectionClientRect = this.section != null ?
      activeNote.getClientRect(`${this.section}-section`) :
      frameClientRect




    // Old client rect
  
    const oldClientRect = this.page.rects.fromStartEnd(
      { x: frameClientRect.start.x, y: sectionClientRect.start.y },
      { x: frameClientRect.end.x, y: sectionClientRect.end.y })
  
  
  
  
    // New client rect
  
    const newClientRect = cloneDeep(oldClientRect)
  
    if (this.side.includes('w'))
      newClientRect.start.x = event.clientX
    if (this.side.includes('n'))
      newClientRect.start.y = event.clientY
    if (this.side.includes('e'))
      newClientRect.end.x = event.clientX
    if (this.side.includes('s'))
      newClientRect.end.y = event.clientY

    if (event.ctrlKey && activeNote.parent == null) {
      const oldCenterPos = {
        x: oldClientRect.start.x + oldClientRect.size.x / 2,
        y: oldClientRect.start.y + oldClientRect.size.y / 2,
      }

      if (this.side.includes('w'))
        newClientRect.end.x = oldCenterPos.x + oldCenterPos.x - event.clientX
      if (this.side.includes('n'))
        newClientRect.end.y = oldCenterPos.y + oldCenterPos.y - event.clientY
      if (this.side.includes('e'))
        newClientRect.start.x = oldCenterPos.x + oldCenterPos.x - event.clientX
      if (this.side.includes('s'))
        newClientRect.start.y = oldCenterPos.y + oldCenterPos.y - event.clientY
    }
  
    this.page.rects.updateSize(newClientRect)
  
  
  
  
    // Old world rect
  
    const oldWorldRect = this.page.rects.clientToWorld(oldClientRect)
  
  
  
  
    // New world rect
    
    const newWorldRect = this.page.rects.clientToWorld(newClientRect)




    this.page.collab.doc.transact(() => {
      for (const note of this.page.selection.notes) {
        if (newClientRect.size.x !== oldClientRect.size.x)
          note.width = `${newWorldRect.size.x}px`

        if (this.section != null
        && newClientRect.size.y !== oldClientRect.size.y)
          note[`${this.section}Height`] = `${newWorldRect.size.y}px`

        note.collab.pos.x +=
          (newWorldRect.start.x - oldWorldRect.start.x) * (1 - note.collab.anchor.x)
          + (newWorldRect.end.x - oldWorldRect.end.x) * note.collab.anchor.x
        note.collab.pos.y +=
          (newWorldRect.start.y - oldWorldRect.start.y) * (1 - note.collab.anchor.y)
          + (newWorldRect.end.y - oldWorldRect.end.y) * note.collab.anchor.y
      }
    })
  }.bind(this)




  private _finish = function (this: AppResizing, event: PointerEvent) {
    document.removeEventListener('pointermove', this._update)
    document.removeEventListener('pointerup', this._finish)
  }.bind(this)
}