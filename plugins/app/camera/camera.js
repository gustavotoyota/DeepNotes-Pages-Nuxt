export const init = ({ $app }) => {
  const camera = $app.camera = {}




  $app.utils.ref(camera, 'camera.pos', () => ({ x: 0, y: 0 }))
  $app.utils.ref(camera, 'camera.zoom', () => 1)

  $app.utils.ref(camera, 'camera.lockPos', () => false)
  $app.utils.ref(camera, 'camera.lockZoom', () => false)




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