const coords = module.exports = {}




coords.getClientPos = (event) => {
  return {
    x: event.clientX,
    y: event.clientY,
  }
}
coords.getDisplayPos = (event) => {
  return $app.coords.clientToDisplay($app.coords.getClientPos(event))
}
coords.getWorldPos = (event) => {
  return $app.coords.clientToWorld($app.coords.getClientPos(event))
}




coords.clientToDisplay = (clientPos) => {
  const displayRect = $app.rects.fromDisplay()

  return {
    x: clientPos.x - displayRect.start.x,
    y: clientPos.y - displayRect.start.y,
  }
}
coords.displayToClient = (displayPos) => {
  const displayRect = $app.rects.fromDisplay()

  return {
    x: displayPos.x + displayRect.start.x,
    y: displayPos.y + displayRect.start.y,
  }
}




coords.displayToWorld = (displayPos) => {
  const displayRect = $app.rects.fromDisplay()

  return {
    x: $state.page.camera.pos.x + (displayPos.x - displayRect.size.x / 2) / $state.page.camera.zoom,
    y: $state.page.camera.pos.y + (displayPos.y - displayRect.size.y / 2) / $state.page.camera.zoom,
  }
}
coords.worldToDisplay = (worldPos) => {
  const displayRect = $app.rects.fromDisplay()

  return {
    x: displayRect.size.x / 2 + (worldPos.x - $state.page.camera.pos.x) * $state.page.camera.zoom,
    y: displayRect.size.y / 2 + (worldPos.y - $state.page.camera.pos.y) * $state.page.camera.zoom,
  }
}




coords.clientToWorld = (clientPos) => {
  return $app.coords.displayToWorld($app.coords.clientToDisplay(clientPos))
}
coords.worldToClient = (worldPos) => {
  return $app.coords.displayToClient($app.coords.worldToDisplay(worldPos))
}