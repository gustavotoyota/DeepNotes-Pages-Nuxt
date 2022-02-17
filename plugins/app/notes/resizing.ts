import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IElem } from "../elems/elems"
import { INote } from "./notes"




export type {
  IAppResizing,
}




interface IAppResizing {
  active: boolean

  side: string
  section?: string
  


  reset(): void;
  start(event: PointerEvent, note: INote, side: string, section?: string): void;
  update(event: PointerEvent): void;
  finish(event: PointerEvent): void;
}




export const init = <T>({ $app }: Context) =>
new class implements IAppResizing {
  active!: boolean

  side!: string
  section?: string




  constructor() {
    $static.vue.ref(this, 'active')
  }




  reset() {
    this.active = false
  }




  start(event: PointerEvent, note: INote, side: string, section?: string) {
    if (event.button !== 0)
      return
  
    $app.activeElem.set(note)



    this.active = true

    this.side = side
    this.section = section

    console.log('Resize')
  }




  update(event: PointerEvent) {
    if (!this.active)
      return
    
    const activeNote = $app.activeElem.get as INote
    
    const frameClientRect = $app.notes.getClientRect(activeNote, 'frame')
    const sectionClientRect = this.section != null ?
      $app.notes.getClientRect(activeNote, `${this.section}-section`) :
      frameClientRect




    // Old client rect
  
    const oldClientRect = $app.rects.fromStartEnd(
      { x: frameClientRect.start.x, y: sectionClientRect.start.y },
      { x: frameClientRect.end.x, y: sectionClientRect.end.y })
  
  
  
  
    // New client rect
  
    const newClientRect = $static.utils.deepCopy(oldClientRect)
  
    if (this.side.includes('w'))
      newClientRect.start.x = event.clientX
    if (this.side.includes('n'))
      newClientRect.start.y = event.clientY
    if (this.side.includes('e'))
      newClientRect.end.x = event.clientX
    if (this.side.includes('s'))
      newClientRect.end.y = event.clientY
  
    $app.rects.updateSize(newClientRect)
  
  
  
  
    // Old world rect
  
    const oldWorldRect = $app.rects.clientToWorld(oldClientRect)
  
  
  
  
    // New world rect
    
    const newWorldRect = $app.rects.clientToWorld(newClientRect)




    for (const note of $app.selection.notes) {
      if (newClientRect.size.x !== oldClientRect.size.x) {
        if (note.size.x === 'expanded')
          note.collab.expandedSize.x = `${newWorldRect.size.x}px`
        else
          note.size.x = `${newWorldRect.size.x}px`
      }

      if (this.section != null
      && newClientRect.size.y !== oldClientRect.size.y) {
        if (note.size.y[this.section] === 'auto')
          note.collab.expandedSize.y[this.section] = `${newWorldRect.size.y}px`
        else
          note.size.y[this.section] = `${newWorldRect.size.y}px`
      }

      note.collab.pos.x +=
        (newWorldRect.start.x - oldWorldRect.start.x) * (1 - note.collab.anchor.x)
        + (newWorldRect.end.x - oldWorldRect.end.x) * note.collab.anchor.x
      note.collab.pos.y +=
        (newWorldRect.start.y - oldWorldRect.start.y) * (1 - note.collab.anchor.y)
        + (newWorldRect.end.y - oldWorldRect.end.y) * note.collab.anchor.y
    }
  }




  finish(event: PointerEvent) {
    if (!this.active || event.button !== 0)
      return
  
    this.reset()
  }
} as Exact<IAppResizing, T>