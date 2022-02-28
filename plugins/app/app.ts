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




  private _key!: number
  
  page!: AppPage




  constructor(ctx: Context, inject: Inject) {
    inject('app', this)


  

    this.project = new AppProject(ctx)




    let page: AppPage = new AppPage(ctx.$app.project, ctx.route.params.page_id)
    
    $static.vue.ref(this, '_key', () => 0)

    $static.vue.computed(this, 'page', {
      get: () => {
        this._key
        return page
      },
      set: (value: AppPage) => {
        this._key++
        page = value
      },
    })
  }
}




export default defineNuxtPlugin((ctx, inject) => {
  new App(ctx, inject)
})