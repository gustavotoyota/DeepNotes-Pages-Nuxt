export const init = ({ $app }) => {
  const zooming = $app.zooming = {}



  
  zooming.minZoom = 0 // Math.pow(1 / 1.2, 16)
  zooming.maxZoom = Infinity // Math.pow(1.2, 12)




  zooming.perform = (event) => {
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
}