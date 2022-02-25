import { Context } from "@nuxt/types"
import { IVec2, Nullable } from "~/types/deep-notes"
import { AppPage } from "../page"




export {
  AppBoxSelection,
}




const MIN_DISTANCE = 5




class AppBoxSelection {
  page: AppPage

  down!: boolean
  active!: boolean

  startPos!: IVec2
  endPos!: IVec2




  constructor(page: AppPage) {
    this.page = page

    $static.vue.ref(this, 'boxSelection.down', () => false)
    $static.vue.ref(this, 'boxSelection.active', () => false)
  
    $static.vue.ref(this, 'boxSelection.startPos', () => null)
    $static.vue.ref(this, 'boxSelection.endPos', () => null)
  }




  start(event: PointerEvent) {
    if (event.button !== 0)
      return

    const displayPos = this.page.pos.getDisplayPos(event)

    this.down = true
    this.active = false

    this.startPos = $static.utils.deepCopy(displayPos)
    this.endPos = $static.utils.deepCopy(displayPos)
  }

  update(event: PointerEvent) {
    if (!this.down)
      return

      


    const displayPos = this.page.pos.getDisplayPos(event)

    if (!this.active) {
      const dist = Math.sqrt(
        Math.pow(displayPos.x - this.startPos!.x, 2) +
        Math.pow(displayPos.y - this.startPos!.y, 2)
      )
  
      this.active = dist >= MIN_DISTANCE
      if (!this.active)
        return
    }



    
    this.endPos = $static.utils.deepCopy(displayPos)
  }

  finish(event: PointerEvent) {
    if (!this.down || event.button !== 0)
      return




    const startPos = this.page.pos.displayToClient(this.startPos!)
    const endPos = this.page.pos.displayToClient(this.endPos!)
  
  

  
    const topLeft = {
      x: Math.min(startPos.x, endPos.x),
      y: Math.min(startPos.y, endPos.y),
    }
    const bottomRight = {
      x: Math.max(startPos.x, endPos.x),
      y: Math.max(startPos.y, endPos.y),
    }
    
  
  

    for (const note of this.page.data.notes) {
      const clientRect = note.getClientRect('frame')
  
      if (clientRect.start.x < topLeft.x || clientRect.start.y < topLeft.y
      || clientRect.end.x > bottomRight.x || clientRect.end.y > bottomRight.y)
        continue
  
      if (this.page.selection.has(note) && !event.shiftKey)
        this.page.selection.remove(note)
      else
        this.page.selection.add(note)
    }
  

    
    
    this.down = false
    this.active = false
  }
}