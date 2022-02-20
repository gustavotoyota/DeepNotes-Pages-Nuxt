import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"
import { Note } from "../notes/notes"




export {
  AppCamera,
}




class AppCamera {
  ctx: Context

  pos!: IVec2
  zoom!: number

  lockPos!: boolean
  lockZoom!: boolean




  constructor(ctx: Context) {
    this.ctx = ctx

    $static.vue.ref(this, 'camera.pos')
    $static.vue.ref(this, 'camera.zoom')

    $static.vue.ref(this, 'camera.lockPos')
    $static.vue.ref(this, 'camera.lockZoom')
  }




  reset() {
    this.pos = { x: 0, y: 0 }
    this.zoom = 1
  
    this.lockPos = false
    this.lockZoom = false
  }



  
  resetZoom() {
    if (this.ctx.$app.camera.lockZoom)
      return
      
    this.ctx.$app.camera.zoom = 1
  }



  
  fitToScreen() {
    let notes: Note[]

    if (this.ctx.$app.selection.notes.length > 0)
      notes = this.ctx.$app.selection.notes
    else
      notes = this.ctx.$app.page.notes
      
  
  
  
    if (notes.length === 0) {
      this.ctx.$app.camera.pos = { x: 0, y: 0 }
      this.ctx.$app.camera.resetZoom()
      return
    }
    
  
  
  
    const clientTopLeft = { x: Infinity, y: Infinity }
    const clientBottomRight = { x: -Infinity, y: -Infinity }
  
    for (const note of notes) {
      const clientRect = note.getClientRect('frame')
  
      clientTopLeft.x = Math.min(clientTopLeft.x, clientRect.start.x)
      clientTopLeft.y = Math.min(clientTopLeft.y, clientRect.start.y)
  
      clientBottomRight.x = Math.max(clientBottomRight.x, clientRect.end.x)
      clientBottomRight.y = Math.max(clientBottomRight.y, clientRect.end.y)
    }
  
  
  
  
    const worldTopLeft = this.ctx.$app.pos.clientToWorld(clientTopLeft)
    const worldBottomRight = this.ctx.$app.pos.clientToWorld(clientBottomRight)
  
  
  
  
    if (!this.ctx.$app.camera.lockPos) {
      this.ctx.$app.camera.pos.x = (worldTopLeft.x + worldBottomRight.x) / 2
      this.ctx.$app.camera.pos.y = (worldTopLeft.y + worldBottomRight.y) / 2
    }
  
  
    
  
    if (!this.ctx.$app.camera.lockZoom) {
      const displayRect = this.ctx.$app.rects.fromDisplay()
  
      this.ctx.$app.camera.zoom = Math.min(
        (Math.min(70, displayRect.size.x / 4) - displayRect.size.x / 2) /
        (worldTopLeft.x - this.ctx.$app.camera.pos.x),
        (Math.min(35, displayRect.size.y / 4) - displayRect.size.y / 2) /
        (worldTopLeft.y - this.ctx.$app.camera.pos.y))
  
      this.ctx.$app.camera.zoom = Math.min(Math.max(this.ctx.$app.camera.zoom, this.ctx.$app.zooming.minZoom), 1)
    }
  }
}