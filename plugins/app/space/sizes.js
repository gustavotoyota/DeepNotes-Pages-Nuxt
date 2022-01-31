const sizes = module.exports = {}




sizes.screenToWorld1D = (screenSize) => {
  return screenSize / $state.page.camera.zoom
}
sizes.worldToScreen1D = (worldSize) => {
  return worldSize * $state.page.camera.zoom
}




sizes.screenToWorld2D = (screenSize) => {
  return {
    x: $app.sizes.screenToWorld1D(screenSize.x),
    y: $app.sizes.screenToWorld1D(screenSize.y),
  }
}
sizes.worldToScreen2D = (worldSize) => {
  return {
    x: $app.sizes.worldToScreen1D(worldSize.x),
    y: $app.sizes.worldToScreen1D(worldSize.y),
  }
}