const zooming = {}
export default zooming




zooming.minZoom = 0 // Math.pow(1 / 1.2, 16)
zooming.maxZoom = Infinity // Math.pow(1.2, 12)




zooming.perform = (event) => {
  if ($state.page.camera.lockZoom)
    return
  



  // Skip if handled

  if (event.altKey)
    event.preventDefault()
  else {
    let node = event.target

    while (node != null) {
      if ($utils.hasVertScrollbar(node))
        return

      node = node.parentNode
    }
  }




  const multiplier = event.deltaY > 0 ? (1 / 1.2) : 1.2

  $state.page.camera.zoom = Math.min(Math.max(
    $state.page.camera.zoom * multiplier,
    $app.zooming.minZoom), $app.zooming.maxZoom)
}