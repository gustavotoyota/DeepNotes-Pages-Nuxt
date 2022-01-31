globalThis.$app = {}
export default (context, inject) => inject('app', $app)




$app.page = require('./page').default

$app.coords = require('./space/coords').default
$app.sizes = require('./space/sizes').default
$app.rects = require('./space/rects').default

$app.camera = require('./camera/camera').default
$app.zooming = require('./camera/zooming').default
$app.panning = require('./camera/panning').default

$app.boxSelection = require('./selection/box-selection').default

$app.notes = require('./notes/notes').default






$app.reset = () => {
  $app.panning.reset()
  
  $app.boxSelection.reset()
}