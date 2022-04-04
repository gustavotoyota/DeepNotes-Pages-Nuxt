import { cloneDeep } from "lodash"
import { Rect } from "~/plugins/static/rect"
import { Vec2 } from "~/plugins/static/vec2"
import { AppPage } from "../page"




export class AppRects {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  fromDisplay() {
    const node = document.getElementById('display')

    const domClientRect = node!.getBoundingClientRect()

    return this.fromDOM(domClientRect)
  }




  fromDOM(domRect: DOMRect) {
    return new Rect(
      new Vec2(domRect.left, domRect.top),
      new Vec2(domRect.right, domRect.bottom),
    )
  }




  clientToWorld(clientRect: Rect): Rect {
    return new Rect(
      this.page.pos.clientToWorld(clientRect.topLeft),
      this.page.pos.clientToWorld(clientRect.bottomRight),
    )
  }
  worldToClient(clientRect: Rect): Rect {
    return new Rect(
      this.page.pos.worldToClient(clientRect.topLeft),
      this.page.pos.worldToClient(clientRect.bottomRight),
    )
  }




  displayToWorld(displayRect: Rect): Rect {
    return new Rect(
      this.page.pos.displayToWorld(displayRect.topLeft),
      this.page.pos.displayToWorld(displayRect.bottomRight),
    )
  }
  worldToDisplay(displayRect: Rect): Rect {
    return new Rect(
      this.page.pos.worldToDisplay(displayRect.topLeft),
      this.page.pos.worldToDisplay(displayRect.bottomRight),
    )
  }




  displayToClient(displayRect: Rect): Rect {
    return new Rect(
      this.page.pos.displayToClient(displayRect.topLeft),
      this.page.pos.displayToClient(displayRect.bottomRight),
    )
  }
  clientToDisplay(displayRect: Rect): Rect {
    return new Rect(
      this.page.pos.clientToDisplay(displayRect.topLeft),
      this.page.pos.clientToDisplay(displayRect.bottomRight),
    )
  }
}