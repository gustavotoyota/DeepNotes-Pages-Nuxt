export const init = (context) => {
  const { $app } = context




  const boxSelection = $app.boxSelection = {}




  $app.utils.ref(boxSelection, 'active', 'boxSelection.active', () => false)

  $app.utils.ref(boxSelection, 'startPos', 'boxSelection.startPos', () => null)
  $app.utils.ref(boxSelection, 'endPos', 'boxSelection.endPos', () => null)



  
  boxSelection.reset = () => {
    $app.boxSelection.active = false
  }

  boxSelection.start = (event) => {
    if (event.button !== 0)
      return

    const displayPos = $app.pos.getDisplayPos(event)

    $app.boxSelection.active = true

    $app.boxSelection.startPos = $static.utils.shallowCopy(displayPos)
    $app.boxSelection.endPos = $static.utils.shallowCopy(displayPos)
  }

  boxSelection.update = (event) => {
    if (!$app.boxSelection.active)
      return

    const displayPos = $app.pos.getDisplayPos(event)

    $app.boxSelection.endPos = $static.utils.shallowCopy(displayPos)
  }

  boxSelection.finish = (event) => {
    if (!$app.boxSelection.active || event.button !== 0)
      return
    
    $app.boxSelection.reset()
  }
}