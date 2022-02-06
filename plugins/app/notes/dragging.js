import app from "../app"

export const init = ({ $app  }) => {
  const dragging = $app.dragging = {}




  dragging.minDistance = 5




  $app.utils.ref('dragging.down', () => false)
  $app.utils.ref('dragging.active', () => false)

  $app.utils.ref('dragging.startPos', () => null)
  $app.utils.ref('dragging.currentPos', () => null)
  
  


  dragging.start = (event) => {
    if (event.button !== 0)
      return
    
    $app.dragging.down = true
    $app.dragging.active = false

    $app.dragging.startPos = $app.pos.getClientPos(event)
    $app.dragging.currentPos = $app.pos.getClientPos(event)
  }
  dragging.update = (event) => {
    if (!$app.dragging.down)
      return




    const clientMousePos = $app.pos.getClientPos(event)

    if (!$app.dragging.active) {
      const dist = Math.sqrt(
        Math.pow(clientMousePos.x - $app.dragging.startPos.x, 2) +
        Math.pow(clientMousePos.y - $app.dragging.startPos.y, 2)
      )
  
      $app.dragging.active = dist >= $app.dragging.minDistance
      if (!$app.dragging.active)
        return
    }




    for (const note of Object.values($app.collab.store.notes)) {
      if (!note.movable)
        continue

      if (note.pos) {
        note.pos.x += (clientMousePos.x - $app.dragging.currentPos.x) / $app.camera.zoom
        note.pos.y += (clientMousePos.y - $app.dragging.currentPos.y) / $app.camera.zoom
      }
    }




    $app.dragging.currentPos = clientMousePos
  }
  dragging.finish = (event) => {
    if (!$app.dragging.down || event.button !== 0)
      return
  
    $app.dragging.down = false
    $app.dragging.active = false
  }
}