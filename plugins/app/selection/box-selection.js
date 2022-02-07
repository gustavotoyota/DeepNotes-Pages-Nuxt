export const init = ({ $app }) => {
  const boxSelection = $app.boxSelection = {}




  $app.utils.ref('boxSelection.active', () => false)

  $app.utils.ref('boxSelection.startPos', () => null)
  $app.utils.ref('boxSelection.endPos', () => null)




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



    const startPos = $app.pos.displayToClient($app.boxSelection.startPos)
    const endPos = $app.pos.displayToClient($app.boxSelection.endPos)
  
  
  
    const topLeft = {
      x: Math.min(startPos.x, endPos.x),
      y: Math.min(startPos.y, endPos.y),
    }
    const bottomRight = {
      x: Math.max(startPos.x, endPos.x),
      y: Math.max(startPos.y, endPos.y),
    }
    
  
  
    for (const elem of $app.elems.array) {
      const clientRect = $app.notes.getClientRect(elem, 'frame')
  
      if (clientRect.start.x < topLeft.x || clientRect.start.y < topLeft.y
      || clientRect.end.x > bottomRight.x || clientRect.end.y > bottomRight.y)
        continue
  
      if ($app.selection.has(elem) && !event.shiftKey)
        $app.selection.remove(elem)
      else
        $app.selection.add(elem)
    }
  
  
  
    // Activate highest selected element
    
    if ($app.elems.array.length > 0)
      $app.activeElem.set($app.selection.elems.at(-1))
    
    $app.boxSelection.active = false
  }
}