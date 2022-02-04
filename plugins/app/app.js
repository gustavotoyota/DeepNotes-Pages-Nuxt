import { defineNuxtPlugin } from '@nuxtjs/composition-api'




export default defineNuxtPlugin((context, inject) => {
  const $app = {}




  inject('app', $app)
  inject('state', context.store.state)




  require('./utils').init(context)

  require('./collab').init(context)

  require('./project').init(context)
  require('./page').init(context)
  
  require('./elems/elems').init(context)
  require('./elems/region').init(context)
  require('./elems/clipboard').init(context)
  require('./elems/deleting').init(context)

  require('./notes/notes').init(context)
  require('./notes/dragging').init(context)
  require('./notes/cloning').init(context)
  require('./notes/editing').init(context)
  require('./notes/resizing').init(context)
  require('./notes/dropping').init(context)

  require('./space/pos').init(context)
  require('./space/sizes').init(context)
  require('./space/rects').init(context)

  require('./camera/camera').init(context)
  require('./camera/panning').init(context)
  require('./camera/zooming').init(context)

  require('./selection/selection').init(context)
  require('./selection/active-elem').init(context)
  require('./selection/box-selection').init(context)




  $app.reset = () => {
    $app.collab.reset()

    $app.project.reset()

    $app.page.reset()

    $app.panning.reset()
    $app.boxSelection.reset()
    $app.dragging.reset()
    $app.resizing.reset()
  }
})