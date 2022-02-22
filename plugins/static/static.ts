import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"
import { defineNuxtPlugin } from "@nuxtjs/composition-api"

import { StaticUtils } from "./utils"
import { StaticClipboard } from "./clipboard"
import { StaticVue } from "./vue"
import { StaticSyncedStore } from "./synced-store"




export type {
  Static,
}




class Static {
  utils: StaticUtils = new StaticUtils()
  clipboard: StaticClipboard = new StaticClipboard()
  vue: StaticVue = new StaticVue()
  syncedStore: StaticSyncedStore = new StaticSyncedStore()
}

globalThis.$static = new Static()




export default defineNuxtPlugin((ctx: Context, inject: Inject) => {
  inject('static', $static)
})