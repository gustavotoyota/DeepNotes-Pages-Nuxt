globalThis.$static = {}

export default (ctx, inject) => {
  inject('static', $static)
}

require('./utils').init()
require('./clipboard').init()
require('./nuxt').init()