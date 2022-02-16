import * as utils from "./utils"
import * as clipboard from "./clipboard"
import * as vue from "./vue"
import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"




export type {
  Static,
}




class Static {
  utils: utils.StaticUtils = utils.init()
  clipboard: clipboard.StaticClipboard = clipboard.init()
  vue: vue.StaticVue = vue.init()
}

globalThis.$static = new Static()




export default (ctx: Context, inject: Inject) => {
  inject('static', $static)
}