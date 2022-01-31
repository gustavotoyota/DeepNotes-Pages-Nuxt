globalThis.$app = {}
export default (context, inject) => inject('app', $app)




$app.page = require('./page').default

$app.coords = require('./space/coords')
$app.sizes = require('./space/sizes')
$app.rects = require('./space/rects')



$app.camera = require('./camera/camera')
$app.zooming = require('./camera/zooming')
$app.panning = require('./camera/panning')




$app.boxSelection = require('./selection/box-selection')




$app.reset = () => {
  $app.page.reset()

  $app.panning.reset()
  
  $app.boxSelection.reset()
}