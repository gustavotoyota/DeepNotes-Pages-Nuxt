import { Context } from "@nuxt/types"
import { IVec2, Nullable } from "~/types/deep-notes"
import { AppPage } from "../page"
import { cloneDeep } from 'lodash'
import { watch } from "@nuxtjs/composition-api"
import Vue from "vue"




export {
  AppPinching,
}




class AppPinching {
  page: AppPage

  pointers!: { [key: string]: IVec2 }

  active!: boolean

  displayCenterPos!: IVec2
  displayDistance!: number




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ref(this, 'pinching.pointers', () => ({}))




    $static.vue.computed(this, 'active', () => 
      Object.keys(this.pointers).length >= 2)
    
    watch(() => this.active, () => {
      if (this.active) {
        const { displayCenterPos, displayDistance } = this._getCenterAndDistance()

        this.displayCenterPos = displayCenterPos
        this.displayDistance = displayDistance




        document.addEventListener('pointermove', this._update)
      } else {
        document.removeEventListener('pointermove', this._update)
      }
    })
  }




  addPointer(downEvent: PointerEvent) {
    const displayPos = this.page.pos.getDisplayPos(downEvent)

    Vue.set(this.pointers, downEvent.pointerId, displayPos)




    const func = (upEvent: PointerEvent) => {
      if (upEvent.pointerId !== downEvent.pointerId)
        return

      Vue.delete(this.pointers, upEvent.pointerId)

      document.removeEventListener('pointerup', func)
    }

    document.addEventListener('pointerup', func)
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

    const ratio = displayDistance / this.displayDistance




    // Camera position update

    const centerOffset = this.page.sizes.screenToWorld2D({
      x: displayCenterPos.x - this.displayCenterPos.x,
      y: displayCenterPos.y - this.displayCenterPos.y,
    })

    const worldCenterPos = this.page.pos.displayToWorld(displayCenterPos)

    this.page.camera.pos.x = -centerOffset.x + worldCenterPos.x +
      (this.page.camera.pos.x - worldCenterPos.x) / ratio
    this.page.camera.pos.y = -centerOffset.y + worldCenterPos.y +
      (this.page.camera.pos.y - worldCenterPos.y) / ratio



    
    // Camera zoom update
    
    this.page.camera.zoom = Math.min(Math.max(this.page.camera.zoom * ratio,
      this.page.zooming.minZoom), this.page.zooming.maxZoom)



    
    this.displayCenterPos = displayCenterPos
    this.displayDistance = displayDistance
  }.bind(this)
}