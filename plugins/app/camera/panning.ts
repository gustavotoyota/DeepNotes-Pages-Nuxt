import { Context } from "@nuxt/types"
import { Exact, IVec2, Nullable } from "~/types/deep-notes"




export type {
  IAppPanning,
}




interface IAppPanning {
  active: boolean
  currentPos: IVec2


  reset(): void
  start(event: MouseEvent): void
  update(event: MouseEvent): void
  finish(event: MouseEvent): void
}




export const init = <T>({ $app }: Context) =>
new class implements IAppPanning {
  active: boolean = false
  currentPos: IVec2 = { x: 0, y: 0}




  constructor() {
    $static.vue.ref(this, 'panning.active')
    $static.vue.ref(this, 'panning.currentPos')
  }




  reset() {
    $app.panning.active = false
  }
  



  start(event: MouseEvent) {
    if (event.button !== 1)
      return

    if ($app.camera.lockPos)
      return

    const clientPos = $app.pos.getClientPos(event)

    $app.panning.active = true
    $app.panning.currentPos = $static.utils.deepCopy(clientPos)
  }

  update(event: MouseEvent) {
    if (!$app.panning.active)
      return

    const clientPos = $app.pos.getClientPos(event)

    $app.camera.pos.x -= (clientPos.x - $app.panning.currentPos.x) / $app.camera.zoom
    $app.camera.pos.y -= (clientPos.y - $app.panning.currentPos.y) / $app.camera.zoom

    $app.panning.currentPos = $static.utils.deepCopy(clientPos)
  }

  finish(event: MouseEvent) {
    if (!$app.panning.active || event.button !== 1)
      return

    $app.panning.active = false
  }
} as Exact<IAppPanning, T>