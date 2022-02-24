import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"
import { AppPage } from "../page"
import { Note } from "../notes/notes"




export {
  AppCamera,
}




class AppCamera {
  page: AppPage

  pos!: IVec2
  zoom!: number

  lockPos!: boolean
  lockZoom!: boolean




  constructor(page: AppPage) {
    this.page = page

    $static.vue.ref(this, 'camera.pos', () => ({ x: 0, y: 0 }))
    $static.vue.ref(this, 'camera.zoom', () => 1)

    $static.vue.ref(this, 'camera.lockPos', () => false)
    $static.vue.ref(this, 'camera.lockZoom', () => false)
  }



  
  resetZoom() {
    if (this.lockZoom)
      return
      
    this.zoom = 1
  }



  
  fitToScreen() {
    let notes: Note[]

    if (this.page.selection.notes.length > 0)
      notes = this.page.selection.notes
    else
      notes = this.page.data.notes
      
  
  
  
    if (notes.length === 0) {
      this.pos = { x: 0, y: 0 }
      this.resetZoom()
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
  
  
  
  
    const worldTopLeft = this.page.pos.clientToWorld(clientTopLeft)
    const worldBottomRight = this.page.pos.clientToWorld(clientBottomRight)
  
  
  
  
    if (!this.lockPos) {
      this.pos.x = (worldTopLeft.x + worldBottomRight.x) / 2
      this.pos.y = (worldTopLeft.y + worldBottomRight.y) / 2
    }
  
  
    
  
    if (!this.lockZoom) {
      const displayRect = this.page.rects.fromDisplay()
  
      this.zoom = Math.min(
        (Math.min(70, displayRect.size.x / 4) - displayRect.size.x / 2) /
        (worldTopLeft.x - this.pos.x),
        (Math.min(35, displayRect.size.y / 4) - displayRect.size.y / 2) /
        (worldTopLeft.y - this.pos.y))
  
      this.zoom = Math.min(Math.max(this.zoom, this.page.zooming.minZoom), 1)
    }
  }
}