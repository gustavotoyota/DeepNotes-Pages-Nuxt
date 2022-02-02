export const init = (ctx) => {
  const { $app, $state } = ctx




  const boxSelection = $app.boxSelection = {}



  
  boxSelection.reset = () => {
    ctx.$set($state, 'boxSelection', {
      active: false,
    })
  }

  boxSelection.start = (event) => {
    if (event.button !== 0)
      return

    const displayPos = $app.pos.getDisplayPos(event)

    $state.boxSelection = {
      active: true,

      startPos: $static.utils.shallowCopy(displayPos),
      endPos: $static.utils.shallowCopy(displayPos),
    }
  }

  boxSelection.update = (event) => {
    if (!$state.boxSelection.active)
      return

    const displayPos = $app.pos.getDisplayPos(event)

    $state.boxSelection.endPos = $static.utils.shallowCopy(displayPos)
  }

  boxSelection.finish = (event) => {
    if (!$state.boxSelection.active || event.button !== 0)
      return



    const startPos = $app.pos.displayToClient($state.boxSelection.startPos)
    const endPos = $app.pos.displayToClient($state.boxSelection.endPos)



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
}