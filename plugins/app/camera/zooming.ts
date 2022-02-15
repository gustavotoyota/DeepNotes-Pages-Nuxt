import { Context } from "@nuxt/types"
import { Exact, Nullable } from "~/types/deep-notes"




export type {
  IAppZooming,
}




interface IAppZooming {
  minZoom: number
  maxZoom: number

  perform(event: WheelEvent): void
}




export const init = <T>({ $app }: Context) =>
new class implements IAppZooming {
  minZoom: number = 0 // Math.pow(1 / 1.2, 16)
  maxZoom: number = Infinity // Math.pow(1.2, 12)




  perform(event: WheelEvent) {
    if ($app.camera.lockZoom)
      return
    



    // Skip if handled

    if (event.altKey)
      event.preventDefault()
    else {
      let node = event.target as Nullable<Node>

      while (node != null) {
        if ($static.utils.hasVertScrollbar(node as HTMLElement))
          return

        node = node.parentNode
      }
    }




    const multiplier = event.deltaY > 0 ? (1 / 1.2) : 1.2

    $app.camera.zoom = Math.min(Math.max(
      $app.camera.zoom * multiplier,
      $app.zooming.minZoom), $app.zooming.maxZoom)
  }
} as Exact<IAppZooming, T>