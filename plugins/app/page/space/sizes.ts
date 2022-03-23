import { IVec2 } from "~/plugins/static/types"
import { AppPage } from "../page"




export class AppSizes {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  screenToWorld1D(screenSize: number) {
    return screenSize / this.page.camera.zoom
  }
  worldToScreen1D(worldSize: number) {
    return worldSize * this.page.camera.zoom
  }




  screenToWorld2D(screenSize: IVec2) {
    return {
      x: this.screenToWorld1D(screenSize.x),
      y: this.screenToWorld1D(screenSize.y),
    }
  }
  worldToScreen2D(worldSize: IVec2) {
    return {
      x: this.worldToScreen1D(worldSize.x),
      y: this.worldToScreen1D(worldSize.y),
    }
  }
}