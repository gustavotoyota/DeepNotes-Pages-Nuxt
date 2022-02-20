import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"




export {
  IRect,
  AppRects,
}




interface IRect {
  start: { x: number, y: number }
  end: { x: number, y: number }
  size: { x: number, y: number }
}

class AppRects {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  fromDisplay() {
    const node = document.getElementById('display')

    const domClientRect = node!.getBoundingClientRect()

    return this.ctx.$app.rects.fromDOM(domClientRect)
  }




  fromDOM(domRect: DOMRect) {
    return {
      start: { x: domRect.left, y: domRect.top },
      end: { x: domRect.right, y: domRect.bottom },
      size: { x: domRect.width, y: domRect.height },
    }
  }
  fromStartEnd(start: IVec2, end: IVec2) {
    return {
      start: $static.utils.deepCopy(start),
      end: $static.utils.deepCopy(end),
      size: { x: end.x - start.x, y: end.y - start.y },
    }
  }
  fromStartSize(start: IVec2, size: IVec2) {
    return {
      start: $static.utils.deepCopy(start),
      end: { x: start.x + size.x, y: start.y + size.y },
      size: $static.utils.deepCopy(size),
    }
  }




  clientToWorld(clientRect: IRect): IRect {
    return {
      start: this.ctx.$app.pos.clientToWorld(clientRect.start),
      end: this.ctx.$app.pos.clientToWorld(clientRect.end),
      size: this.ctx.$app.sizes.screenToWorld2D(clientRect.size),
    }
  }
  worldToClient(clientRect: IRect): IRect {
    return {
      start: this.ctx.$app.pos.worldToClient(clientRect.start),
      end: this.ctx.$app.pos.worldToClient(clientRect.end),
      size: this.ctx.$app.sizes.worldToScreen2D(clientRect.size),
    }
  }




  displayToWorld(displayRect: IRect): IRect {
    return {
      start: this.ctx.$app.pos.displayToWorld(displayRect.start),
      end: this.ctx.$app.pos.displayToWorld(displayRect.end),
      size: this.ctx.$app.sizes.screenToWorld2D(displayRect.size),
    }
  }
  worldToDisplay(displayRect: IRect): IRect {
    return {
      start: this.ctx.$app.pos.worldToDisplay(displayRect.start),
      end: this.ctx.$app.pos.worldToDisplay(displayRect.end),
      size: this.ctx.$app.sizes.worldToScreen2D(displayRect.size),
    }
  }




  displayToClient(displayRect: IRect): IRect {
    return {
      start: this.ctx.$app.pos.displayToClient(displayRect.start),
      end: this.ctx.$app.pos.displayToClient(displayRect.end),
      size: $static.utils.deepCopy(displayRect.size),
    }
  }
  clientToDisplay(displayRect: IRect): IRect {
    return {
      start: this.ctx.$app.pos.clientToDisplay(displayRect.start),
      end: this.ctx.$app.pos.clientToDisplay(displayRect.end),
      size: $static.utils.deepCopy(displayRect.size),
    }
  }




  updateSize(rect: IRect): void {
    rect.size = {
      x: rect.end.x - rect.start.x,
      y: rect.end.y - rect.start.y,
    }
  }
  updateEnd(rect: IRect): void {
    rect.end = {
      x: rect.start.x + rect.size.x,
      y: rect.start.y + rect.size.y,
    }
  }
}