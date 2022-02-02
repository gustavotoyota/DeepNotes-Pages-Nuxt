import { defineNuxtPlugin } from '@nuxtjs/composition-api'




export default defineNuxtPlugin((ctx, inject) => {
  const $app = {}




  inject('app', $app)
  inject('state', ctx.store.state)




  require('./page').init(ctx)
  
  require('./elems/elems').init(ctx)

  require('./notes/notes').init(ctx)

  require('./space/pos').init(ctx)
  require('./space/sizes').init(ctx)
  require('./space/rects').init(ctx)

  require('./camera/camera').init(ctx)
  require('./camera/panning').init(ctx)
  require('./camera/zooming').init(ctx)

  require('./selection/selection').init(ctx)
  require('./selection/active-elem').init(ctx)
  require('./selection/box-selection').init(ctx)




  $app.reset = (root) => {
    $app.panning.reset()
    
    $app.boxSelection.reset()
  }
})