import { watch } from "@nuxtjs/composition-api"
import Vue from "vue"
import { IVec2 } from "~/plugins/static/types"
import { AppPage } from "../page"




export class AppPinching {
  page: AppPage

  pointers!: { [key: string]: IVec2 }

  active!: boolean

  displayCenterPos!: IVec2
  displayDistance!: number




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ssrRef(this, '$app.page.pinching.pointers', () => ({}))




    $static.vue.computed(this, '$app.page.pinching.active', () => 
      Object.keys(this.pointers).length >= 2)
    
    watch(() => this.active, () => {
      if (this.active) {
        const { displayCenterPos, displayDistance } = this._getCenterAndDistance()

        this.displayCenterPos = displayCenterPos
        this.displayDistance = displayDistance




        this.page.panning.cancel()
        this.page.boxSelection.clearTimer()




        document.addEventListener('pointermove', this._update)
      } else {
        document.removeEventListener('pointermove', this._update)
      }
    })
  }




  addPointer(downEvent: PointerEvent) {
    const updateFunc = (event: PointerEvent) => {
      const displayPos = this.page.pos.getDisplayPos(event)
      Vue.set(this.pointers, event.pointerId, displayPos)
    }

    updateFunc(downEvent)

    $static.utils.listenPointerEvents(downEvent, {
      move: updateFunc,
      up: (upEvent) => { Vue.delete(this.pointers, upEvent.pointerId) },
    })
  }




  private _getCenterAndDistance() {
    const pointers = Object.values(this.pointers)

    const displayCenterPos = {
      x: (pointers[0].x + pointers[1].x) / 2,
      y: (pointers[0].y + pointers[1].y) / 2,
    }

    const displayDistance = Math.sqrt(
      Math.pow(pointers[0].x - pointers[1].x, 2) +
      Math.pow(pointers[0].y - pointers[1].y, 2))

    return { displayCenterPos, displayDistance }
  }




  private _update = function (this: AppPinching, event: PointerEvent) {
    if (!(event.pointerId in this.pointers))
      return




    // Update pointer position

    const displayPos = this.page.pos.getDisplayPos(event)

    Vue.set(this.pointers, event.pointerId, displayPos)




    // Compute center and distance

    const { displayCenterPos, displayDistance } = this._getCenterAndDistance()



      
    // Compute ratio

    let ratio
    if (this.page.camera.lockZoom)
      ratio = 1
    else
      ratio = displayDistance / this.displayDistance




    // Camera position update

    const centerOffset = this.page.sizes.screenToWorld2D({
      x: displayCenterPos.x - this.displayCenterPos.x,
      y: displayCenterPos.y - this.displayCenterPos.y,
    })

    const worldCenterPos = this.page.pos.displayToWorld(displayCenterPos)

    this.page.camera.pos.x = worldCenterPos.x - centerOffset.x +
      (this.page.camera.pos.x - worldCenterPos.x) / ratio
    this.page.camera.pos.y = worldCenterPos.y - centerOffset.y +
      (this.page.camera.pos.y - worldCenterPos.y) / ratio



    
    // Camera zoom update
    
    this.page.camera.zoom = this.page.camera.zoom * ratio



    
    this.displayCenterPos = displayCenterPos
    this.displayDistance = displayDistance
  }.bind(this)
}