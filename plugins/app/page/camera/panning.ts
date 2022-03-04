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
    
    $static.vue.ssrRef(this, '$app.page.panning.currentPos', () => null)
  }
  



  start(event: PointerEvent) {
    if (this.page.camera.lockPos)
      return




    const clientPos = this.page.pos.getClientPos(event)

    this.currentPos = cloneDeep(clientPos)




    $static.utils.listenPointerEvents(event, {
      move: this._update,
    })
  }




  private _update = function (this: AppPanning, event: PointerEvent) {
    if (this.page.pinching.active)
      return


      

    const clientPos = this.page.pos.getClientPos(event)

    this.page.camera.pos.x -= (clientPos.x - this.currentPos.x) / this.page.camera.zoom
    this.page.camera.pos.y -= (clientPos.y - this.currentPos.y) / this.page.camera.zoom

    this.currentPos = cloneDeep(clientPos)
  }.bind(this)




  cancel = function (this: AppPanning) {
    document.removeEventListener('pointermove', this._update)
  }.bind(this)
}