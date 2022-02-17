import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IVec2 } from "~/types/deep-notes"




export type {
  IAppBoxSelection,
}




interface IAppBoxSelection {
  active: boolean
  startPos: IVec2
  endPos: IVec2

  reset(): void
  start(event: PointerEvent): void
  update(event: PointerEvent): void
  finish(event: PointerEvent): void
}




export const init = <T>({ $app }: Context) =>
new class implements IAppBoxSelection {
  active: boolean = false;
  startPos: IVec2 = { x: 0, y: 0 };
  endPos: IVec2 = { x: 0, y: 0 };




  constructor() {
    $static.vue.ref(this, 'boxSelection.active')
  
    $static.vue.ref(this, 'boxSelection.startPos')
    $static.vue.ref(this, 'boxSelection.endPos')
  }




  reset() {
    $app.boxSelection.active = false
  }




  start(event: PointerEvent) {
    if (event.button !== 0)
      return

    const displayPos = $app.pos.getDisplayPos(event)

    $app.boxSelection.active = true

    $app.boxSelection.startPos = $static.utils.deepCopy(displayPos)
    $app.boxSelection.endPos = $static.utils.deepCopy(displayPos)
  }

  update(event: PointerEvent) {
    if (!$app.boxSelection.active)
      return

    const displayPos = $app.pos.getDisplayPos(event)

    $app.boxSelection.endPos = $static.utils.deepCopy(displayPos)
  }

  finish(event: PointerEvent) {
    if (!$app.boxSelection.active || event.button !== 0)
      return



    const startPos = $app.pos.displayToClient($app.boxSelection.startPos)
    const endPos = $app.pos.displayToClient($app.boxSelection.endPos)
  
  
  
    const topLeft = {
      x: Math.min(startPos.x, endPos.x),
      y: Math.min(startPos.y, endPos.y),
    }
    const bottomRight = {
      x: Math.max(startPos.x, endPos.x),
      y: Math.max(startPos.y, endPos.y),
    }
    
  
  
    for (const note of $app.page.notes) {
      const clientRect = note.getClientRect('frame')
  
      if (clientRect.start.x < topLeft.x || clientRect.start.y < topLeft.y
      || clientRect.end.x > bottomRight.x || clientRect.end.y > bottomRight.y)
        continue
  
      if ($app.selection.has(note) && !event.shiftKey)
        $app.selection.remove(note)
      else
        $app.selection.add(note)
    }
  
    
    
    $app.boxSelection.active = false
  }
} as Exact<IAppBoxSelection, T>