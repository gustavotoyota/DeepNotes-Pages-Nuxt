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
  }



  
  camera.fitToScreen = () => {
  }
}