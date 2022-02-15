import { Context } from "@nuxt/types"
import { Exact, IVec2 } from "~/types/deep-notes"




interface IAppSizes {
  screenToWorld1D(screenSize: number): number;
  worldToScreen1D(worldSize: number): number;
  screenToWorld2D(screenSize: IVec2): IVec2;
  worldToScreen2D(worldSize: IVec2): IVec2;
}

export type {
  IAppSizes,
}




export const init = <T>({ $app }: Context) => 
new class implements IAppSizes {
  screenToWorld1D(screenSize: number) {
    return screenSize / $app.camera.zoom
  }
  worldToScreen1D(worldSize: number) {
    return worldSize * $app.camera.zoom
  }




  screenToWorld2D(screenSize: IVec2) {
    return {
      x: $app.sizes.screenToWorld1D(screenSize.x),
      y: $app.sizes.screenToWorld1D(screenSize.y),
    }
  }
  worldToScreen2D(worldSize: IVec2) {
    return {
      x: $app.sizes.worldToScreen1D(worldSize.x),
      y: $app.sizes.worldToScreen1D(worldSize.y),
    }
  }
} as Exact<IAppSizes, T>
