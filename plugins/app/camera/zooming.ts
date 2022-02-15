import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"




interface IAppZooming {
  minZoom: number
  maxZoom: number

  perform(event: MouseEvent): void
}

export type {
  IAppZooming,
}




export const init = <T>({ $app }: Context) =>
new class implements IAppZooming {
  minZoom = 0 // Math.pow(1 / 1.2, 16)
  maxZoom = Infinity // Math.pow(1.2, 12)




  perform(event) {
    if ($app.camera.lockZoom)
      return
    



    // Skip if handled

    if (event.altKey)
      event.preventDefault()
    else {
      let node = event.target

      while (node != null) {
        if ($static.utils.hasVertScrollbar(node))
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