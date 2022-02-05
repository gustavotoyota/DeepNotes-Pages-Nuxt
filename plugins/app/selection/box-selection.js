export const init = (context) => {
  const { $app } = context




  const boxSelection = $app.boxSelection = {}




  $app.utils.ref(boxSelection, 'boxSelection.active', () => false)

  $app.utils.ref(boxSelection, 'boxSelection.startPos', () => null)
  $app.utils.ref(boxSelection, 'boxSelection.endPos', () => null)




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
    
    $app.boxSelection.active = false
  }
}