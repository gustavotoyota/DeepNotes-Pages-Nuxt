import { Context } from "@nuxt/types"
import { Exact, IVec2 } from "~/types/deep-notes"




export type {
  IAppPanning,
}




interface IAppPanning {
  active: boolean
  currentPos: IVec2


  reset(): void
  start(event): void
  update(event): void
  finish(event): void
}




export const init = <T>({ $app }: Context) =>
new class implements IAppPanning {
  active: boolean;
  currentPos: IVec2;




  constructor() {
    $static.vue.ref(this, 'panning.active')
    $static.vue.ref(this, 'panning.currentPos')
  }




  reset() {
    $app.panning.active = false
  }
  



  start(event) {
    if (event.button !== 1)
      return

    if ($app.camera.lockPos)
      return

    const clientPos = $app.pos.getClientPos(event)

    $app.panning.active = true
    $app.panning.currentPos = $static.utils.shallowCopy(clientPos)
  }

  update(event) {
    if (!$app.panning.active)
      return

    const clientPos = $app.pos.getClientPos(event)

    $app.camera.pos.x -= (clientPos.x - $app.panning.currentPos.x) / $app.camera.zoom
    $app.camera.pos.y -= (clientPos.y - $app.panning.currentPos.y) / $app.camera.zoom

    $app.panning.currentPos = $static.utils.shallowCopy(clientPos)
  }

  finish(event) {
    if (!$app.panning.active || event.button !== 1)
      return

    $app.panning.active = false
  }
} as Exact<IAppPanning, T>