import { Vec2 } from "~/plugins/static/vec2"
import { AppPage } from "../page"




export class AppSizes {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  screenToWorld1D(screenSize: number): number {
    return screenSize / this.page.camera.zoom
  }
  worldToScreen1D(worldSize: number): number {
    return worldSize * this.page.camera.zoom
  }




  screenToWorld2D(screenSize: Vec2): Vec2 {
    return new Vec2(
      this.screenToWorld1D(screenSize.x),
      this.screenToWorld1D(screenSize.y),
    )
  }
  worldToScreen2D(worldSize: Vec2): Vec2 {
    return new Vec2(
      this.worldToScreen1D(worldSize.x),
      this.worldToScreen1D(worldSize.y),
    )
  }
}