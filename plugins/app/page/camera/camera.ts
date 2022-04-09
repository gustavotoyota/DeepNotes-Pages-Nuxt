import { watch } from "@nuxtjs/composition-api"
import { debounce } from "lodash"
import { Rect } from "~/plugins/static/rect"
import { IVec2, Vec2 } from "~/plugins/static/vec2"
import { Note } from "../notes/notes"
import { AppPage } from "../page"




export class AppCamera {
  page: AppPage

  pos!: IVec2

  _zoom!: number
  zoom!: number

  lockPos!: boolean
  lockZoom!: boolean




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ssrRef(this, '$app.page.camera.pos', () => ({ x: 0, y: 0 }))

    $static.vue.ssrRef(this, '$app.page.camera._zoom', () => 1)
    $static.vue.computed(this, '$app.page.camera.zoom', {
      get: () => { return this._zoom },
      set: (value: number) => {
        if (this.lockZoom)
          return

        this._zoom = value
      },
    })

    $static.vue.ssrRef(this, '$app.page.camera.lockPos', () => false)
    $static.vue.ssrRef(this, '$app.page.camera.lockZoom', () => false)
  }




  setup(pageData: any) {
    if (pageData.camera) {
      this.pos = pageData.camera.pos
      this.zoom = pageData.camera.zoom

      this.lockPos = pageData.camera.lockPos
      this.lockZoom = pageData.camera.lockZoom
    } else
      this.fitToScreen()

    if (!this.page.ctx.isDev)
      this.watchChanges()
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
      this.pos = new Vec2(0, 0)
      this.resetZoom()
      return
    }
    
  
  
  
    const clientTopLeft = new Vec2(Infinity, Infinity)
    const clientBottomRight = new Vec2(-Infinity, -Infinity)
  
    for (const note of notes) {
      clientTopLeft.x = Math.min(clientTopLeft.x, note.clientRect.topLeft.x)
      clientTopLeft.y = Math.min(clientTopLeft.y, note.clientRect.topLeft.y)
  
      clientBottomRight.x = Math.max(clientBottomRight.x, note.clientRect.bottomRight.x)
      clientBottomRight.y = Math.max(clientBottomRight.y, note.clientRect.bottomRight.y)
    }
  
  
  
  
    const worldRect = new Rect(
      this.page.pos.clientToWorld(clientTopLeft),
      this.page.pos.clientToWorld(clientBottomRight),
    )

  
  
  
    if (!this.lockPos)
      this.pos = worldRect.topLeft.lerp(worldRect.bottomRight, 0.5)
  
  
    
  
    const displayRect = this.page.rects.fromDisplay()

    this.zoom = Math.min(
      (Math.min(70, displayRect.size.x / 4) - displayRect.size.x / 2) /
      (worldRect.topLeft.x - this.pos.x),
      (Math.min(35, displayRect.size.y / 4) - displayRect.size.y / 2) /
      (worldRect.topLeft.y - this.pos.y))

    this.zoom = Math.min(this.zoom, 1)
  }
}