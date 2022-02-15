import { Context } from "@nuxt/types"
import { Exact, IVec2 } from "~/types/deep-notes"




interface IAppSizes {
  screenToWorld1D(screenSize): number;
  worldToScreen1D(worldSize): number;
  screenToWorld2D(screenSize): IVec2;
  worldToScreen2D(worldSize): IVec2;
}

export type {
  IAppSizes,
}




export const init = <T>({ $app }: Context) => 
new class implements IAppSizes {
  screenToWorld1D(screenSize) {
    return screenSize / $app.camera.zoom
  }
  worldToScreen1D(worldSize) {
    return worldSize * $app.camera.zoom
  }




  screenToWorld2D(screenSize) {
    return {
      x: $app.sizes.screenToWorld1D(screenSize.x),
      y: $app.sizes.screenToWorld1D(screenSize.y),
    }
  }
  worldToScreen2D(worldSize) {
    return {
      x: $app.sizes.worldToScreen1D(worldSize.x),
      y: $app.sizes.worldToScreen1D(worldSize.y),
    }
  }
} as Exact<IAppSizes, T>
