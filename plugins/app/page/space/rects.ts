import { Context } from "@nuxt/types"
import { cloneDeep } from "lodash"
import { IVec2 } from "~/types/deep-notes"
import { AppPage } from "../page"




export interface IRect {
  start: { x: number, y: number }
  end: { x: number, y: number }
  size: { x: number, y: number }
}

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
    return {
      start: { x: domRect.left, y: domRect.top },
      end: { x: domRect.right, y: domRect.bottom },
      size: { x: domRect.width, y: domRect.height },
    }
  }
  fromStartEnd(start: IVec2, end: IVec2) {
    return {
      start: cloneDeep(start),
      end: cloneDeep(end),
      size: { x: end.x - start.x, y: end.y - start.y },
    }
  }
  fromStartSize(start: IVec2, size: IVec2) {
    return {
      start: cloneDeep(start),
      end: { x: start.x + size.x, y: start.y + size.y },
      size: cloneDeep(size),
    }
  }




  clientToWorld(clientRect: IRect): IRect {
    return {
      start: this.page.pos.clientToWorld(clientRect.start),
      end: this.page.pos.clientToWorld(clientRect.end),
      size: this.page.sizes.screenToWorld2D(clientRect.size),
    }
  }
  worldToClient(clientRect: IRect): IRect {
    return {
      start: this.page.pos.worldToClient(clientRect.start),
      end: this.page.pos.worldToClient(clientRect.end),
      size: this.page.sizes.worldToScreen2D(clientRect.size),
    }
  }




  displayToWorld(displayRect: IRect): IRect {
    return {
      start: this.page.pos.displayToWorld(displayRect.start),
      end: this.page.pos.displayToWorld(displayRect.end),
      size: this.page.sizes.screenToWorld2D(displayRect.size),
    }
  }
  worldToDisplay(displayRect: IRect): IRect {
    return {
      start: this.page.pos.worldToDisplay(displayRect.start),
      end: this.page.pos.worldToDisplay(displayRect.end),
      size: this.page.sizes.worldToScreen2D(displayRect.size),
    }
  }




  displayToClient(displayRect: IRect): IRect {
    return {
      start: this.page.pos.displayToClient(displayRect.start),
      end: this.page.pos.displayToClient(displayRect.end),
      size: cloneDeep(displayRect.size),
    }
  }
  clientToDisplay(displayRect: IRect): IRect {
    return {
      start: this.page.pos.clientToDisplay(displayRect.start),
      end: this.page.pos.clientToDisplay(displayRect.end),
      size: cloneDeep(displayRect.size),
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