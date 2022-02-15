import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IVec2 } from "~/types/deep-notes"




interface IAppBoxSelection {
  active: boolean
  startPos: IVec2
  endPos: IVec2

  reset(): void
  start(event: MouseEvent): void
  update(event: MouseEvent): void
  finish(event: MouseEvent): void
}

export type {
  IAppBoxSelection,
}




export const init = <T>({ $app }: Context) =>
new class implements IAppBoxSelection {
  active: boolean;
  startPos: IVec2;
  endPos: IVec2;




  constructor() {
    $static.vue.ref(this, 'boxSelection.active')
  
    $static.vue.ref(this, 'boxSelection.startPos')
    $static.vue.ref(this, 'boxSelection.endPos')
  }




  reset() {
    $app.boxSelection.active = false
  }




  start(event) {
    if (event.button !== 0)
      return

    const displayPos = $app.pos.getDisplayPos(event)

    $app.boxSelection.active = true

    $app.boxSelection.startPos = $static.utils.shallowCopy(displayPos)
    $app.boxSelection.endPos = $static.utils.shallowCopy(displayPos)
  }

  update(event) {
    if (!$app.boxSelection.active)
      return

    const displayPos = $app.pos.getDisplayPos(event)

    $app.boxSelection.endPos = $static.utils.shallowCopy(displayPos)
  }

  finish(event) {
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
      const clientRect = $app.notes.getClientRect(note, 'frame')
  
      if (clientRect.start.x < topLeft.x || clientRect.start.y < topLeft.y
      || clientRect.end.x > bottomRight.x || clientRect.end.y > bottomRight.y)
        continue
  
      if ($app.selection.has(note) && !event.shiftKey)
        $app.selection.remove(note)
      else
        $app.selection.add(note)
    }
  
  
  
    // Activate highest selected element
    
    if ($app.selection.elems.length > 0)
      $app.activeElem.set($app.selection.elems.at(-1))
    
    $app.boxSelection.active = false
  }
} as Exact<IAppBoxSelection, T>