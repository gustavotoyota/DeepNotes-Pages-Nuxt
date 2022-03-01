import { watch } from "@nuxtjs/composition-api"
import { debounce } from "lodash"
import { IVec2 } from "~/types/deep-notes"
import { Note } from "../notes/notes"
import { AppPage } from "../page"




export {
  AppCamera,
}




class AppCamera {
  page: AppPage

  pos!: IVec2

  _zoom!: number
  zoom!: number

  lockPos!: boolean
  lockZoom!: boolean

  loaded: boolean = false




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ref(this, 'camera.pos', () => ({ x: 0, y: 0 }))

    $static.vue.ref(this, 'camera._zoom', () => 1)
    $static.vue.computed(this, 'zoom', {
      get: () => { return this._zoom },
      set: (value: number) => {
        if (this.loaded && this.lockZoom)
          return

        this._zoom = value
      },
    })

    $static.vue.ref(this, 'camera.lockPos', () => false)
    $static.vue.ref(this, 'camera.lockZoom', () => false)
  }




  watchChanges() {
    watch([
      () => this.pos,
      () => this.zoom,
      () => this.lockPos,
      () => this.lockZoom,
    ], debounce(() => {
      this.page.ctx.$axios.post('/api/page/update-camera', {
        pageId: this.page.id,

        camera: {
          pos: { x: this.pos.x, y: this.pos.y },
          zoom: this.zoom,

          lockPos: this.lockPos,
          lockZoom: this.lockZoom,
        },
      })
    }, 2000), {
      deep: true,
    })
  }



  
  resetZoom() {
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
      this.pos = {
        x: (worldTopLeft.x + worldBottomRight.x) / 2,
        y: (worldTopLeft.y + worldBottomRight.y) / 2,
      }
    }
  
  
    
  
    const displayRect = this.page.rects.fromDisplay()

    this.zoom = Math.min(
      (Math.min(70, displayRect.size.x / 4) - displayRect.size.x / 2) /
      (worldTopLeft.x - this.pos.x),
      (Math.min(35, displayRect.size.y / 4) - displayRect.size.y / 2) /
      (worldTopLeft.y - this.pos.y))

    this.zoom = Math.min(Math.max(this.zoom, this.page.zooming.minZoom), 1)
  }
}