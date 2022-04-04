import { cloneDeep } from "lodash"
import { Vec2 } from "~/plugins/static/vec2"
import { Nullable } from "~/types/deep-notes"
import { AppPage } from "../page"




const MIN_DISTANCE = 5




export class AppBoxSelection {
  page: AppPage

  active!: boolean

  startPos!: Vec2
  endPos!: Vec2

  downEvent!: PointerEvent
  touchTimer: Nullable<NodeJS.Timeout> = null




  constructor(page: AppPage) {
    this.page = page



    
    $static.vue.ssrRef(this, '$app.page.boxSelection.active', () => false)
  
    $static.vue.ssrRef(this, '$app.page.boxSelection.startPos', () => null)
    $static.vue.ssrRef(this, '$app.page.boxSelection.endPos', () => null)
  }




  start(event: PointerEvent) {
    const displayPos = this.page.pos.getDisplayPos(event)

    this.active = false

    this.startPos = cloneDeep(displayPos)
    this.endPos = cloneDeep(displayPos)

    this.downEvent = event




    if (event.pointerType === 'mouse') {
      $static.utils.listenPointerEvents(event, {
        move: this._pointerMove,
        up: this._pointerUp,
      })
    } else {
      if (this.touchTimer != null)
        this.clearTimer()

      this.touchTimer = setTimeout(() => {
        this.active = true
        this.touchTimer = null
        
        $static.utils.listenPointerEvents(event, {
          move: this._pointerMove,
          up: this._pointerUp,
        })
      }, 300)




      $static.utils.listenPointerEvents(event, {
        move: this._timerPointerMove,
        up: this.clearTimer,
      })
    }
  }



  
  private _pointerMove = function (this: AppBoxSelection, event: PointerEvent) {
    const displayPos = this.page.pos.getDisplayPos(event)

    if (!this.active) {
      const dist = displayPos.sub(this.startPos).length()
  
      this.active = dist >= MIN_DISTANCE

      if (!this.active)
        return
    }



    
    this.endPos = cloneDeep(displayPos)
  }.bind(this)




  private _pointerUp = function (this: AppBoxSelection, event: PointerEvent) {
    const startPos = this.page.pos.displayToClient(this.startPos)
    const endPos = this.page.pos.displayToClient(this.endPos)
  
  

  
    const topLeft = new Vec2(
      Math.min(startPos.x, endPos.x),
      Math.min(startPos.y, endPos.y),
    )
    const bottomRight = new Vec2(
      Math.max(startPos.x, endPos.x),
      Math.max(startPos.y, endPos.y),
    )
    
  
  

    for (const note of this.page.data.notes) {
      if (note.clientRect.topLeft.x < topLeft.x || note.clientRect.topLeft.y < topLeft.y
      || note.clientRect.bottomRight.x > bottomRight.x || note.clientRect.bottomRight.y > bottomRight.y)
        continue
  
      if (note.selected && !event.shiftKey)
        this.page.selection.remove(note)
      else
        this.page.selection.add(note)
    }
    
  
  

    for (const arrow of this.page.data.arrows) {
      const clientRect = arrow.getClientRect()
  
      if (clientRect.topLeft.x < topLeft.x || clientRect.topLeft.y < topLeft.y
      || clientRect.bottomRight.x > bottomRight.x || clientRect.bottomRight.y > bottomRight.y)
        continue
  
      if (arrow.selected && !event.shiftKey)
        this.page.selection.remove(arrow)
      else
        this.page.selection.add(arrow)
    }
  

    
    
    this.active = false
  }.bind(this)




  private _timerPointerMove = function (this: AppBoxSelection, event: PointerEvent) {
    if (this.touchTimer == null)
      return
      
    const displayPos = this.page.pos.getDisplayPos(event)

    if (this.active)
      return

    const dist = displayPos.sub(this.startPos).length()

    if (dist >= MIN_DISTANCE) {
      this.page.panning.start(this.downEvent)
      this.clearTimer()
    }
  }.bind(this)
  clearTimer = function (this: AppBoxSelection) {
    if (this.touchTimer == null)
      return

    clearTimeout(this.touchTimer)
    this.touchTimer = null
  }.bind(this)
}