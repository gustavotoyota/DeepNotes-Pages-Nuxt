import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"
import { AppPage } from "../page"




export {
  AppPanning,
}




class AppPanning {
  page: AppPage

  active!: boolean
  currentPos!: IVec2




  constructor(page: AppPage) {
    this.page = page
    
    $static.vue.ref(this, 'panning.active', () => false)
    $static.vue.ref(this, 'panning.currentPos', () => null)
  }
  



  start(event: PointerEvent) {
    if (this.page.camera.lockPos)
      return

    const clientPos = this.page.pos.getClientPos(event)

    this.active = true
    this.currentPos = $static.utils.deepCopy(clientPos)
  }

  update(event: PointerEvent) {
    if (!this.active)
      return

    const clientPos = this.page.pos.getClientPos(event)

    this.page.camera.pos.x -= (clientPos.x - this.currentPos.x) / this.page.camera.zoom
    this.page.camera.pos.y -= (clientPos.y - this.currentPos.y) / this.page.camera.zoom

    this.currentPos = $static.utils.deepCopy(clientPos)
  }

  finish(event: PointerEvent) {
    if (!this.active)
      return

    this.active = false
  }
}