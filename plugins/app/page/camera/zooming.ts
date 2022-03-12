import { Context } from "@nuxt/types"
import { Exact, Nullable } from "~/types/deep-notes"
import { AppPage } from "../page"




export class AppZooming {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  perform(event: WheelEvent) {
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

    this.page.camera.zoom = this.page.camera.zoom * multiplier
  }
}