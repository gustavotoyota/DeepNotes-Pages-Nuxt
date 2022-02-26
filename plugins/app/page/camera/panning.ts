import { Context } from "@nuxt/types"
import { IVec2 } from "~/types/deep-notes"
import { AppPage } from "../page"
import { cloneDeep } from 'lodash'




export {
  AppPanning,
}




class AppPanning {
  page: AppPage

  currentPos!: IVec2




  constructor(page: AppPage) {
    this.page = page
    
    $static.vue.ref(this, 'panning.currentPos', () => null)
  }
  



  start(event: PointerEvent) {
    if (this.page.camera.lockPos)
      return




    const clientPos = this.page.pos.getClientPos(event)

    this.currentPos = cloneDeep(clientPos)




    document.addEventListener('pointermove', this._update)
    document.addEventListener('pointerup', this._finish)
  }




  private _update = function (this: AppPanning, event: PointerEvent) {
    const clientPos = this.page.pos.getClientPos(event)

    this.page.camera.pos.x -= (clientPos.x - this.currentPos.x) / this.page.camera.zoom
    this.page.camera.pos.y -= (clientPos.y - this.currentPos.y) / this.page.camera.zoom

    this.currentPos = cloneDeep(clientPos)
  }.bind(this)




  private _finish = function (this: AppPanning, event: PointerEvent) {
    if (event.pointerType === 'mouse' && event.button !== 1)
      return




    document.removeEventListener('pointermove', this._update)
    document.removeEventListener('pointerup', this._finish)
  }.bind(this)
}