import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"




export {
  AppBoxSelection,
}




const MIN_DISTANCE = 5




class AppBoxSelection {
  ctx: Context

  down!: boolean
  active!: boolean

  startPos!: IVec2
  endPos!: IVec2




  constructor(ctx: Context) {
    this.ctx = ctx

    $static.vue.ref(this, 'boxSelection.down')
    $static.vue.ref(this, 'boxSelection.active')
  
    $static.vue.ref(this, 'boxSelection.startPos')
    $static.vue.ref(this, 'boxSelection.endPos')
  }




  reset() {
    this.ctx.$app.boxSelection.down = false
    this.ctx.$app.boxSelection.active = false
  }




  start(event: PointerEvent) {
    if (event.button !== 0)
      return

    const displayPos = this.ctx.$app.pos.getDisplayPos(event)

    this.ctx.$app.boxSelection.down = true
    this.ctx.$app.boxSelection.active = false

    this.ctx.$app.boxSelection.startPos = $static.utils.deepCopy(displayPos)
    this.ctx.$app.boxSelection.endPos = $static.utils.deepCopy(displayPos)
  }

  update(event: PointerEvent) {
    if (!this.ctx.$app.boxSelection.down)
      return

      


    const displayPos = this.ctx.$app.pos.getDisplayPos(event)

    if (!this.ctx.$app.boxSelection.active) {
      const dist = Math.sqrt(
        Math.pow(displayPos.x - this.ctx.$app.boxSelection.startPos.x, 2) +
        Math.pow(displayPos.y - this.ctx.$app.boxSelection.startPos.y, 2)
      )
  
      this.ctx.$app.boxSelection.active = dist >= MIN_DISTANCE
      if (!this.ctx.$app.boxSelection.active)
        return
    }



    
    this.ctx.$app.boxSelection.endPos = $static.utils.deepCopy(displayPos)
  }

  finish(event: PointerEvent) {
    if (!this.ctx.$app.boxSelection.down || event.button !== 0)
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
  
    
    
    this.ctx.$app.boxSelection.down = false
    this.ctx.$app.boxSelection.active = false
  }
}