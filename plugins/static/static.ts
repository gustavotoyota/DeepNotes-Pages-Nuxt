import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"
import { defineNuxtPlugin } from "@nuxtjs/composition-api"
import { StaticClipboard } from "./clipboard"
import { StaticSyncedStore } from "./synced-store"
import { StaticUtils } from "./utils"
import { StaticVue } from "./vue"





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