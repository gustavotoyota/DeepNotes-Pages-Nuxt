export const init = ({ $app, $state }) => {
  const pos = $app.pos = {}




  pos.getClientPos = (event) => {
    return {
      x: event.clientX,
      y: event.clientY,
    }
  }
  pos.getDisplayPos = (event) => {
    return $app.pos.clientToDisplay($app.pos.getClientPos(event))
  }
  pos.getWorldPos = (event) => {
    return $app.pos.clientToWorld($app.pos.getClientPos(event))
  }




  pos.clientToDisplay = (clientPos) => {
    const displayRect = $app.rects.fromDisplay()

    return {
      x: clientPos.x - displayRect.start.x,
      y: clientPos.y - displayRect.start.y,
    }
  }
  pos.displayToClient = (displayPos) => {
    const displayRect = $app.rects.fromDisplay()

    return {
      x: displayPos.x + displayRect.start.x,
      y: displayPos.y + displayRect.start.y,
    }
  }




  pos.displayToWorld = (displayPos) => {
    const displayRect = $app.rects.fromDisplay()

    return {
      x: $state.page.camera.pos.x + (displayPos.x - displayRect.size.x / 2) / $state.page.camera.zoom,
      y: $state.page.camera.pos.y + (displayPos.y - displayRect.size.y / 2) / $state.page.camera.zoom,
    }
  }
  pos.worldToDisplay = (worldPos) => {
    const displayRect = $app.rects.fromDisplay()

    return {
      x: displayRect.size.x / 2 + (worldPos.x - $state.page.camera.pos.x) * $state.page.camera.zoom,
      y: displayRect.size.y / 2 + (worldPos.y - $state.page.camera.pos.y) * $state.page.camera.zoom,
    }
  }




  pos.clientToWorld = (clientPos) => {
    return $app.pos.displayToWorld($app.pos.clientToDisplay(clientPos))
  }
  pos.worldToClient = (worldPos) => {
    return $app.pos.displayToClient($app.pos.worldToDisplay(worldPos))
  }
}