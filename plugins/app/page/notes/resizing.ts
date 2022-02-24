import { Context } from "@nuxt/types"
import { Nullable } from "~/types/deep-notes"
import { AppPage } from "../page"
import { Note } from "./notes"




export {
  AppResizing,
}




class AppResizing {
  page: AppPage

  active!: boolean

  side!: Nullable<string>
  section!: Nullable<string>




  constructor(page: AppPage) {
    this.page = page

    $static.vue.ref(this, 'active', () => false)

    $static.vue.ref(this, 'side', () => null)
    $static.vue.ref(this, 'section', () => null)
  }




  start(event: PointerEvent, note: Note, side: string, section?: Nullable<string>) {
    if (event.button !== 0)
      return
  
    this.page.activeElem.set(note)



    this.active = true

    this.side = side
    this.section = section ?? null
  }




  update(event: PointerEvent) {
    if (!this.active)
      return
    



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
  
    const newClientRect = $static.utils.deepCopy(oldClientRect)
  
    if (this.side!.includes('w'))
      newClientRect.start.x = event.clientX
    if (this.side!.includes('n'))
      newClientRect.start.y = event.clientY
    if (this.side!.includes('e'))
      newClientRect.end.x = event.clientX
    if (this.side!.includes('s'))
      newClientRect.end.y = event.clientY
  
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
  }




  finish(event: PointerEvent) {
    if (!this.active || event.button !== 0)
      return
  
    this.active = false
  }
}