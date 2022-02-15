import { Context } from "@nuxt/types"
import { Exact, IVec2, Nullable } from "~/types/deep-notes"




export type {
  IRect,
  IAppRects,
}




interface IRect {
  start: { x: number, y: number }
  end: { x: number, y: number }
  size: { x: number, y: number }
}

interface IAppRects {
  fromDisplay(): IRect
  
  fromDOM(domRect: DOMRect): IRect
  fromStartEnd(start: IVec2, end: IVec2): IRect
  fromStartSize(start: IVec2, size: IVec2): IRect

  clientToWorld(clientRect: IRect): IRect
  worldToClient(clientRect: IRect): IRect

  displayToWorld(displayRect: IRect): IRect
  worldToDisplay(displayRect: IRect): IRect

  displayToClient(displayRect: IRect): IRect
  clientToDisplay(displayRect: IRect): IRect

  updateSize(rect: IRect): void
  updateEnd(rect: IRect): void
}




export const init = <T>({ $app }: Context) =>
new class implements IAppRects {
  fromDisplay() {
    const node = document.getElementById('display')

    const domClientRect = node!.getBoundingClientRect()

    return $app.rects.fromDOM(domClientRect)
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
      start: $app.pos.clientToWorld(clientRect.start),
      end: $app.pos.clientToWorld(clientRect.end),
      size: $app.sizes.screenToWorld2D(clientRect.size),
    }
  }
  worldToClient(clientRect: IRect): IRect {
    return {
      start: $app.pos.worldToClient(clientRect.start),
      end: $app.pos.worldToClient(clientRect.end),
      size: $app.sizes.worldToScreen2D(clientRect.size),
    }
  }




  displayToWorld(displayRect: IRect): IRect {
    return {
      start: $app.pos.displayToWorld(displayRect.start),
      end: $app.pos.displayToWorld(displayRect.end),
      size: $app.sizes.screenToWorld2D(displayRect.size),
    }
  }
  worldToDisplay(displayRect: IRect): IRect {
    return {
      start: $app.pos.worldToDisplay(displayRect.start),
      end: $app.pos.worldToDisplay(displayRect.end),
      size: $app.sizes.worldToScreen2D(displayRect.size),
    }
  }




  displayToClient(displayRect: IRect): IRect {
    return {
      start: $app.pos.displayToClient(displayRect.start),
      end: $app.pos.displayToClient(displayRect.end),
      size: $static.utils.deepCopy(displayRect.size),
    }
  }
  clientToDisplay(displayRect: IRect): IRect {
    return {
      start: $app.pos.clientToDisplay(displayRect.start),
      end: $app.pos.clientToDisplay(displayRect.end),
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
} as Exact<IAppRects, T>
