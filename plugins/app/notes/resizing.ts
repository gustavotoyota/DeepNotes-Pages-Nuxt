import { Context } from "@nuxt/types"
import { Note } from "./notes"




export {
  AppResizing,
}




class AppResizing {
  ctx: Context

  active!: boolean

  side!: string
  section?: string




  constructor(ctx: Context) {
    this.ctx = ctx

    $static.vue.ref(this, 'active')

    $static.vue.ref(this, 'side')
    $static.vue.ref(this, 'section')
  }




  reset() {
    this.active = false
  }




  start(event: PointerEvent, note: Note, side: string, section?: string) {
    if (event.button !== 0)
      return
  
    this.ctx.$app.activeElem.set(note)



    this.active = true

    this.side = side
    this.section = section
  }




  update(event: PointerEvent) {
    if (!this.active)
      return
    
    const activeNote = this.ctx.$app.activeElem.get as Note
    
    const frameClientRect = activeNote.getClientRect('frame')
    const sectionClientRect = this.section != null ?
      activeNote.getClientRect(`${this.section}-section`) :
      frameClientRect




    // Old client rect
  
    const oldClientRect = this.ctx.$app.rects.fromStartEnd(
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
  
    this.ctx.$app.rects.updateSize(newClientRect)
  
  
  
  
    // Old world rect
  
    const oldWorldRect = this.ctx.$app.rects.clientToWorld(oldClientRect)
  
  
  
  
    // New world rect
    
    const newWorldRect = this.ctx.$app.rects.clientToWorld(newClientRect)




    for (const note of this.ctx.$app.selection.notes) {
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
  }




  finish(event: PointerEvent) {
    if (!this.active || event.button !== 0)
      return
  
    this.reset()
  }
}