export const init = ({ $app }) => {
  const panning = $app.panning = {}




  $app.utils.ref(panning, 'active', 'panning.active', () => false)
  $app.utils.ref(panning, 'currentPos', 'panning.currentPos', () => null)



  
  panning.reset = () => {
    $app.panning.active = false
    $app.panning.currentPos = null
  }

  panning.start = (event) => {
    if (event.button !== 1)
      return

    if ($app.page.camera.lockPos)
      return

    const clientPos = $app.pos.getClientPos(event)

    $app.panning.active = true
    $app.currentPos = $static.utils.shallowCopy(clientPos)
  }

  panning.update = (event) => {
    if (!$app.panning.active)
      return

    const clientPos = $app.pos.getClientPos(event)

    $app.page.camera.pos.x -= (clientPos.x - $app.panning.currentPos.x) / $app.page.camera.zoom
    $app.page.camera.pos.y -= (clientPos.y - $app.panning.currentPos.y) / $app.page.camera.zoom

    $app.panning.currentPos = $static.utils.shallowCopy(clientPos)
  }

  panning.finish = (event) => {
    if (!$app.panning.active || event.button !== 1)
      return

    $app.panning.reset()
  }
}