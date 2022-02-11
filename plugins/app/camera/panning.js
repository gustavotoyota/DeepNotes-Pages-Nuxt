export const init = ({ $app }) => {
  const panning = $app.panning = {}




  $static.vue.ref(panning, 'panning.active')
  $static.vue.ref(panning, 'panning.currentPos')




  panning.reset = () => {
    $app.panning.active = false
  }
  



  panning.start = (event) => {
    if (event.button !== 1)
      return

    if ($app.camera.lockPos)
      return

    const clientPos = $app.pos.getClientPos(event)

    $app.panning.active = true
    $app.panning.currentPos = $static.utils.shallowCopy(clientPos)
  }

  panning.update = (event) => {
    if (!$app.panning.active)
      return

    const clientPos = $app.pos.getClientPos(event)

    $app.camera.pos.x -= (clientPos.x - $app.panning.currentPos.x) / $app.camera.zoom
    $app.camera.pos.y -= (clientPos.y - $app.panning.currentPos.y) / $app.camera.zoom

    $app.panning.currentPos = $static.utils.shallowCopy(clientPos)
  }

  panning.finish = (event) => {
    if (!$app.panning.active || event.button !== 1)
      return

    $app.panning.active = false
  }
}