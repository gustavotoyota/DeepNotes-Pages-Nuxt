import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"




export {
  AppSizes,
}




class AppSizes {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  screenToWorld1D(screenSize: number) {
    return screenSize / this.ctx.$app.camera.zoom
  }
  worldToScreen1D(worldSize: number) {
    return worldSize * this.ctx.$app.camera.zoom
  }




  screenToWorld2D(screenSize: IVec2) {
    return {
      x: this.ctx.$app.sizes.screenToWorld1D(screenSize.x),
      y: this.ctx.$app.sizes.screenToWorld1D(screenSize.y),
    }
  }
  worldToScreen2D(worldSize: IVec2) {
    return {
      x: this.ctx.$app.sizes.worldToScreen1D(worldSize.x),
      y: this.ctx.$app.sizes.worldToScreen1D(worldSize.y),
    }
  }
}