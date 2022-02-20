import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"




export {
  AppPanning,
}




class AppPanning {
  ctx: Context

  active!: boolean
  currentPos!: IVec2




  constructor(ctx: Context) {
    this.ctx = ctx
    
    $static.vue.ref(this, 'panning.active')
    $static.vue.ref(this, 'panning.currentPos')
  }




  reset() {
    this.ctx.$app.panning.active = false
  }
  



  start(event: PointerEvent) {
    if (event.button !== 1)
      return

    if (this.ctx.$app.camera.lockPos)
      return

    const clientPos = this.ctx.$app.pos.getClientPos(event)

    this.ctx.$app.panning.active = true
    this.ctx.$app.panning.currentPos = $static.utils.deepCopy(clientPos)
  }

  update(event: PointerEvent) {
    if (!this.ctx.$app.panning.active)
      return

    const clientPos = this.ctx.$app.pos.getClientPos(event)

    this.ctx.$app.camera.pos.x -= (clientPos.x - this.ctx.$app.panning.currentPos.x) / this.ctx.$app.camera.zoom
    this.ctx.$app.camera.pos.y -= (clientPos.y - this.ctx.$app.panning.currentPos.y) / this.ctx.$app.camera.zoom

    this.ctx.$app.panning.currentPos = $static.utils.deepCopy(clientPos)
  }

  finish(event: PointerEvent) {
    if (!this.ctx.$app.panning.active || event.button !== 1)
      return

    this.ctx.$app.panning.active = false
  }
}