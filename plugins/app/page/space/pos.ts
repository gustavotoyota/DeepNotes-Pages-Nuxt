import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"
import { AppPage } from "../page"




export {
  AppPos,
}




class AppPos {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  getClientPos(event: MouseEvent): IVec2 {
    return {
      x: event.clientX,
      y: event.clientY,
    }
  }
  getDisplayPos(event: MouseEvent): IVec2 {
    return this.clientToDisplay(this.getClientPos(event))
  }
  getWorldPos(event: MouseEvent): IVec2 {
    return this.clientToWorld(this.getClientPos(event))
  }




  clientToDisplay(clientPos: IVec2): IVec2 {
    const displayRect = this.page.rects.fromDisplay()

    return {
      x: clientPos.x - displayRect.start.x,
      y: clientPos.y - displayRect.start.y,
    }
  }
  displayToClient(displayPos: IVec2): IVec2 {
    const displayRect = this.page.rects.fromDisplay()

    return {
      x: displayPos.x + displayRect.start.x,
      y: displayPos.y + displayRect.start.y,
    }
  }




  displayToWorld(displayPos: IVec2): IVec2 {
    const displayRect = this.page.rects.fromDisplay()

    return {
      x: this.page.camera.pos.x + (displayPos.x - displayRect.size.x / 2) / this.page.camera.zoom,
      y: this.page.camera.pos.y + (displayPos.y - displayRect.size.y / 2) / this.page.camera.zoom,
    }
  }
  worldToDisplay(worldPos: IVec2): IVec2 {
    const displayRect = this.page.rects.fromDisplay()

    return {
      x: displayRect.size.x / 2 + (worldPos.x - this.page.camera.pos.x) * this.page.camera.zoom,
      y: displayRect.size.y / 2 + (worldPos.y - this.page.camera.pos.y) * this.page.camera.zoom,
    }
  }




  clientToWorld(clientPos: IVec2): IVec2 {
    return this.displayToWorld(this.clientToDisplay(clientPos))
  }
  worldToClient(worldPos: IVec2): IVec2 {
    return this.displayToClient(this.worldToDisplay(worldPos))
  }
}