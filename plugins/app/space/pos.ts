import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"




export {
  AppPos,
}




class AppPos {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  getClientPos(event: MouseEvent): IVec2 {
    return {
      x: event.clientX,
      y: event.clientY,
    }
  }
  getDisplayPos(event: MouseEvent): IVec2 {
    return this.ctx.$app.pos.clientToDisplay(this.ctx.$app.pos.getClientPos(event))
  }
  getWorldPos(event: MouseEvent): IVec2 {
    return this.ctx.$app.pos.clientToWorld(this.ctx.$app.pos.getClientPos(event))
  }




  clientToDisplay(clientPos: IVec2): IVec2 {
    const displayRect = this.ctx.$app.rects.fromDisplay()

    return {
      x: clientPos.x - displayRect.start.x,
      y: clientPos.y - displayRect.start.y,
    }
  }
  displayToClient(displayPos: IVec2): IVec2 {
    const displayRect = this.ctx.$app.rects.fromDisplay()

    return {
      x: displayPos.x + displayRect.start.x,
      y: displayPos.y + displayRect.start.y,
    }
  }




  displayToWorld(displayPos: IVec2): IVec2 {
    const displayRect = this.ctx.$app.rects.fromDisplay()

    return {
      x: this.ctx.$app.camera.pos.x + (displayPos.x - displayRect.size.x / 2) / this.ctx.$app.camera.zoom,
      y: this.ctx.$app.camera.pos.y + (displayPos.y - displayRect.size.y / 2) / this.ctx.$app.camera.zoom,
    }
  }
  worldToDisplay(worldPos: IVec2): IVec2 {
    const displayRect = this.ctx.$app.rects.fromDisplay()

    return {
      x: displayRect.size.x / 2 + (worldPos.x - this.ctx.$app.camera.pos.x) * this.ctx.$app.camera.zoom,
      y: displayRect.size.y / 2 + (worldPos.y - this.ctx.$app.camera.pos.y) * this.ctx.$app.camera.zoom,
    }
  }




  clientToWorld(clientPos: IVec2): IVec2 {
    return this.ctx.$app.pos.displayToWorld(this.ctx.$app.pos.clientToDisplay(clientPos))
  }
  worldToClient(worldPos: IVec2): IVec2 {
    return this.ctx.$app.pos.displayToClient(this.ctx.$app.pos.worldToDisplay(worldPos))
  }
}