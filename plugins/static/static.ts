import * as utils from "./utils"
import * as clipboard from "./clipboard"
import * as vue from "./vue"




class Static {
  utils: utils.StaticUtils = utils.init()
  clipboard: clipboard.StaticClipboard = clipboard.init()
  vue: vue.StaticVue = vue.init()
}

export type {
  Static,
}

globalThis.$static = new Static()




export default (context, inject) => {
  inject('static', $static)
}