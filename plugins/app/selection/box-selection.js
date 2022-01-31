const boxSelection = {}
export default boxSelection




boxSelection.reset = () => {
  $set($state, 'boxSelection', {
    active: false,
  })
}

boxSelection.start = (event) => {
  if (event.button !== 0)
    return

  const displayPos = $app.coords.getDisplayPos(event)

  $state.boxSelection = {
    active: true,

    startPos: $utils.shallowCopy(displayPos),
    endPos: $utils.shallowCopy(displayPos),
  }
}

boxSelection.update = (event) => {
  if (!$state.boxSelection.active)
    return

  const displayPos = $app.coords.getDisplayPos(event)

  $state.boxSelection.endPos = $utils.shallowCopy(displayPos)
}

boxSelection.finish = (event) => {
  if (!$state.boxSelection.active || event.button !== 0)
    return



  const startPos = $app.coords.displayToClient($state.boxSelection.startPos)
  const endPos = $app.coords.displayToClient($state.boxSelection.endPos)



  const topLeft = {
    x: Math.min(startPos.x, endPos.x),
    y: Math.min(startPos.y, endPos.y),
  }
  const bottomRight = {
    x: Math.max(startPos.x, endPos.x),
    y: Math.max(startPos.y, endPos.y),
  }



  $app.boxSelection.reset()
}