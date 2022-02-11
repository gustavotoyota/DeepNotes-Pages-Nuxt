export const init = ({ $app }) => {
  const camera = $app.camera = {}




  $app.utils.ref('camera.pos')
  $app.utils.ref('camera.zoom')

  $app.utils.ref('camera.lockPos')
  $app.utils.ref('camera.lockZoom')




  camera.reset = () => {
    $app.camera.pos = { x: 0, y: 0 }
    $app.camera.zoom = 1
  
    $app.camera.lockPos = false
    $app.camera.lockZoom = false
  }



  
  camera.resetZoom = () => {
    if ($app.camera.lockZoom)
      return
      
    $app.camera.zoom = 1
  }



  
  camera.fitToScreen = () => {
    let notes
    if ($app.selection.notes.length > 0)
      notes = $app.selection.notes
    else
      notes = $app.elems.array
      
  
  
  
    if (notes.length === 0) {
      $app.camera.pos = { x: 0, y: 0 }
      $app.camera.resetZoom()
      return
    }
    
  
  
  
    const clientTopLeft = { x: Infinity, y: Infinity }
    const clientBottomRight = { x: -Infinity, y: -Infinity }
  
    for (const note of notes) {
      const clientRect = $app.notes.getClientRect(note, 'frame')
  
      clientTopLeft.x = Math.min(clientTopLeft.x, clientRect.start.x)
      clientTopLeft.y = Math.min(clientTopLeft.y, clientRect.start.y)
  
      clientBottomRight.x = Math.max(clientBottomRight.x, clientRect.end.x)
      clientBottomRight.y = Math.max(clientBottomRight.y, clientRect.end.y)
    }
  
  
  
  
    const worldTopLeft = $app.pos.clientToWorld(clientTopLeft)
    const worldBottomRight = $app.pos.clientToWorld(clientBottomRight)
  
  
  
  
    if (!$app.camera.lockPos) {
      $app.camera.pos.x = (worldTopLeft.x + worldBottomRight.x) / 2
      $app.camera.pos.y = (worldTopLeft.y + worldBottomRight.y) / 2
    }
  
  
    
  
    if (!$app.camera.lockZoom) {
      const displayRect = $app.rects.fromDisplay()
  
      $app.camera.zoom = Math.min(
        (Math.min(70, displayRect.size.x / 4) - displayRect.size.x / 2) /
        (worldTopLeft.x - $app.camera.pos.x),
        (Math.min(35, displayRect.size.y / 4) - displayRect.size.y / 2) /
        (worldTopLeft.y - $app.camera.pos.y))
  
      $app.camera.zoom = Math.min(Math.max($app.camera.zoom, $app.zooming.minZoom), 1)
    }
  }
}