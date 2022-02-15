import * as utils from "./utils"
import * as clipboard from "./clipboard"
import * as vue from "./vue"
import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"




class Static {
  utils: utils.StaticUtils = utils.init()
  clipboard: clipboard.StaticClipboard = clipboard.init()
  vue: vue.StaticVue = vue.init()
}

export type {
  Static,
}

globalThis.$static = new Static()




export default (context: Context, inject: Inject) => {
  inject('static', $static)
}