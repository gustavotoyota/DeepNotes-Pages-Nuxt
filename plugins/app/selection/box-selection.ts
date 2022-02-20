import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"




export {
  AppBoxSelection,
}




class AppBoxSelection {
  ctx: Context

  active!: boolean
  startPos!: IVec2
  endPos!: IVec2




  constructor(ctx: Context) {
    this.ctx = ctx

    $static.vue.ref(this, 'boxSelection.active')
  
    $static.vue.ref(this, 'boxSelection.startPos')
    $static.vue.ref(this, 'boxSelection.endPos')
  }




  reset() {
    this.ctx.$app.boxSelection.active = false
  }




  start(event: PointerEvent) {
    if (event.button !== 0)
      return

    const displayPos = this.ctx.$app.pos.getDisplayPos(event)

    this.ctx.$app.boxSelection.active = true

    this.ctx.$app.boxSelection.startPos = $static.utils.deepCopy(displayPos)
    this.ctx.$app.boxSelection.endPos = $static.utils.deepCopy(displayPos)
  }

  update(event: PointerEvent) {
    if (!this.ctx.$app.boxSelection.active)
      return

    const displayPos = this.ctx.$app.pos.getDisplayPos(event)

    this.ctx.$app.boxSelection.endPos = $static.utils.deepCopy(displayPos)
  }

  finish(event: PointerEvent) {
    if (!this.ctx.$app.boxSelection.active || event.button !== 0)
      return



    const startPos = this.ctx.$app.pos.displayToClient(this.ctx.$app.boxSelection.startPos)
    const endPos = this.ctx.$app.pos.displayToClient(this.ctx.$app.boxSelection.endPos)
  
  
  
    const topLeft = {
      x: Math.min(startPos.x, endPos.x),
      y: Math.min(startPos.y, endPos.y),
    }
    const bottomRight = {
      x: Math.max(startPos.x, endPos.x),
      y: Math.max(startPos.y, endPos.y),
    }
    
  
  
    for (const note of this.ctx.$app.page.notes) {
      const clientRect = note.getClientRect('frame')
  
      if (clientRect.start.x < topLeft.x || clientRect.start.y < topLeft.y
      || clientRect.end.x > bottomRight.x || clientRect.end.y > bottomRight.y)
        continue
  
      if (this.ctx.$app.selection.has(note) && !event.shiftKey)
        this.ctx.$app.selection.remove(note)
      else
        this.ctx.$app.selection.add(note)
    }
  
    
    
    this.ctx.$app.boxSelection.active = false
  }
}