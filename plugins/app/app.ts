import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'




import { AppProject } from './project'
import { AppPage } from './page/page'

import { Nullable } from '~/types/deep-notes'




export type {
  App,
}




class App {
  project: AppProject




  private _key: number = 0
  
  private _page!: AppPage
  page!: AppPage




  constructor(ctx: Context, inject: Inject) {
    inject('app', this)


  

    this.project = new AppProject(ctx)




    $static.vue.ref(this, '_key', () => 0)

    $static.vue.computed(this, 'page', {
      get: () => {
        this._key
        return this._page
      },
      set: (value: AppPage) => {
        this._key++
        this._page = value
      },
    })

    this.page = new AppPage(ctx.$app.project, ctx.route.params.page_id)
  }
}




export default defineNuxtPlugin((ctx, inject) => {
  new App(ctx, inject)
})