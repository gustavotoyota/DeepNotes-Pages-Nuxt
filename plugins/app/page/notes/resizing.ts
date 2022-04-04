import { Context } from "@nuxt/types"
import { cloneDeep } from "lodash"
import { Rect } from "~/plugins/static/rect"
import { Vec2 } from "~/plugins/static/vec2"
import { Nullable } from "~/types/deep-notes"
import { AppPage } from "../page"
import { Note, NoteSection } from "./notes"




export class AppResizing {
  page: AppPage

  side!: string
  section!: Nullable<NoteSection>




  constructor(page: AppPage) {
    this.page = page



    
    $static.vue.ssrRef(this, '$app.page.resizing.side', () => '')
    $static.vue.ssrRef(this, '$app.page.resizing.section', () => null)
  }




  start(event: PointerEvent, note: Note, side: string, section?: Nullable<NoteSection>) {
    this.side = side
    this.section = section ?? null



    
    this.page.activeElem.set(note)




    document.addEventListener('pointermove', this._update)
    document.addEventListener('pointerup', this._finish)
  }




  private _update = function (this: AppResizing, event: PointerEvent) {
    const activeNote = this.page.activeElem.get as Note
    
    const frameClientRect = activeNote.getClientRect('note-frame')
    const sectionClientRect = this.section != null ?
      activeNote.getClientRect(`note-${this.section}-section`) :
      frameClientRect




    // Old client rect
  
    const oldClientRect = new Rect(
      new Vec2(frameClientRect.topLeft.x, sectionClientRect.topLeft.y),
      new Vec2(frameClientRect.bottomRight.x, sectionClientRect.bottomRight.y),
    )
  
  
  
  
    // New client rect
  
    const newClientRect = cloneDeep(oldClientRect)
  
    if (this.side.includes('w'))
      newClientRect.topLeft.x = event.clientX
    if (this.side.includes('n'))
      newClientRect.topLeft.y = event.clientY
    if (this.side.includes('e'))
      newClientRect.bottomRight.x = event.clientX
    if (this.side.includes('s'))
      newClientRect.bottomRight.y = event.clientY

    if (event.ctrlKey && activeNote.parent == null) {
      const oldCenterPos = oldClientRect.topLeft.lerp(oldClientRect.bottomRight, 0.5)

      if (this.side.includes('w'))
        newClientRect.bottomRight.x = oldCenterPos.x + oldCenterPos.x - event.clientX
      if (this.side.includes('n'))
        newClientRect.bottomRight.y = oldCenterPos.y + oldCenterPos.y - event.clientY
      if (this.side.includes('e'))
        newClientRect.topLeft.x = oldCenterPos.x + oldCenterPos.x - event.clientX
      if (this.side.includes('s'))
        newClientRect.topLeft.y = oldCenterPos.y + oldCenterPos.y - event.clientY
    }
  
  
  
  
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
          note[`${this.section}Height` as `${NoteSection}Height`] = `${newWorldRect.size.y}px`

        note.collab.pos.x +=
          (newWorldRect.topLeft.x - oldWorldRect.topLeft.x) * (1 - note.collab.anchor.x)
          + (newWorldRect.bottomRight.x - oldWorldRect.bottomRight.x) * note.collab.anchor.x
        note.collab.pos.y +=
          (newWorldRect.topLeft.y - oldWorldRect.topLeft.y) * (1 - note.collab.anchor.y)
          + (newWorldRect.bottomRight.y - oldWorldRect.bottomRight.y) * note.collab.anchor.y
      }
    })
  }.bind(this)




  private _finish = function (this: AppResizing, event: PointerEvent) {
    document.removeEventListener('pointermove', this._update)
    document.removeEventListener('pointerup', this._finish)




    this.page.undoRedo.resetCapturing()
  }.bind(this)
}