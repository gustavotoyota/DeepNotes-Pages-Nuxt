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
  page: AppPage




  constructor(ctx: Context, inject: Inject) {
    inject('app', this)


  

    this.project = new AppProject(ctx)
    this.page = new AppPage(ctx.$app.project, ctx.route.params.page_id)
  }
}




export default defineNuxtPlugin((ctx, inject) => {
  new App(ctx, inject)
})