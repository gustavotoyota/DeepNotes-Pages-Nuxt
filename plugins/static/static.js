globalThis.$static = {}

export default (context, inject) => {
  inject('static', $static)
}

require('./utils').init()
require('./clipboard').init()
require('./nuxt').init()