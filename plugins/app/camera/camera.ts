import { Context } from "@nuxt/types"
import { Exact, IVec2 } from "~/types/deep-notes"
import { INote } from "../notes/notes"




export type {
  IAppCamera,
}




interface IAppCamera {
  pos: IVec2
  zoom: number

  lockPos: boolean
  lockZoom: boolean



  reset(): void
  resetZoom(): void
  fitToScreen(): void
}




export const init = <T>({ $app }: Context) =>
new class implements IAppCamera {
  pos: IVec2 = { x: 0, y: 0 }
  zoom: number = 1

  lockPos = false
  lockZoom = false




  constructor() {
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
    if ($app.camera.lockZoom)
      return
      
    $app.camera.zoom = 1
  }



  
  fitToScreen() {
    let notes: INote[]

    if ($app.selection.notes.length > 0)
      notes = $app.selection.notes
    else
      notes = $app.page.notes
      
  
  
  
    if (notes.length === 0) {
      $app.camera.pos = { x: 0, y: 0 }
      $app.camera.resetZoom()
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
  
  
  
  
    const worldTopLeft = $app.pos.clientToWorld(clientTopLeft)
    const worldBottomRight = $app.pos.clientToWorld(clientBottomRight)
  
  
  
  
    if (!$app.camera.lockPos) {
      $app.camera.pos.x = (worldTopLeft.x + worldBottomRight.x) / 2
      $app.camera.pos.y = (worldTopLeft.y + worldBottomRight.y) / 2
    }
  
  
    
  
    if (!$app.camera.lockZoom) {
      const displayRect = $app.rects.fromDisplay()
  
      $app.camera.zoom = Math.min(
        (Math.min(70, displayRect.size.x / 4) - displayRect.size.x / 2) /
        (worldTopLeft.x - $app.camera.pos.x),
        (Math.min(35, displayRect.size.y / 4) - displayRect.size.y / 2) /
        (worldTopLeft.y - $app.camera.pos.y))
  
      $app.camera.zoom = Math.min(Math.max($app.camera.zoom, $app.zooming.minZoom), 1)
    }
  }
} as Exact<IAppCamera, T>