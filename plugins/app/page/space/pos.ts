import { Vec2 } from "~/plugins/static/vec2"
import { AppPage } from "../page"




export class AppPos {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  getClientPos(event: MouseEvent): Vec2 {
    return new Vec2(event.clientX, event.clientY)
  }
  getDisplayPos(event: MouseEvent): Vec2 {
    return this.clientToDisplay(this.getClientPos(event))
  }
  getWorldPos(event: MouseEvent): Vec2 {
    return this.clientToWorld(this.getClientPos(event))
  }




  clientToDisplay(clientPos: Vec2): Vec2 {
    const displayRect = this.page.rects.fromDisplay()

    return clientPos.sub(displayRect.topLeft)
  }
  displayToClient(displayPos: Vec2): Vec2 {
    const displayRect = this.page.rects.fromDisplay()

    return displayPos.add(displayRect.topLeft)
  }




  displayToWorld(displayPos: Vec2): Vec2 {
    const displayRect = this.page.rects.fromDisplay()

    return new Vec2(
      this.page.camera.pos.x + (displayPos.x - displayRect.size.x / 2) / this.page.camera.zoom,
      this.page.camera.pos.y + (displayPos.y - displayRect.size.y / 2) / this.page.camera.zoom,
    )
  }
  worldToDisplay(worldPos: Vec2): Vec2 {
    const displayRect = this.page.rects.fromDisplay()

    return new Vec2(
      displayRect.size.x / 2 + (worldPos.x - this.page.camera.pos.x) * this.page.camera.zoom,
      displayRect.size.y / 2 + (worldPos.y - this.page.camera.pos.y) * this.page.camera.zoom,
    )
  }




  clientToWorld(clientPos: Vec2): Vec2 {
    return this.displayToWorld(this.clientToDisplay(clientPos))
  }
  worldToClient(worldPos: Vec2): Vec2 {
    return this.displayToClient(this.worldToDisplay(worldPos))
  }
}