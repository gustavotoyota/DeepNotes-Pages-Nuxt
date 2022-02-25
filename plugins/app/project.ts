import { Context } from "@nuxt/types"
import { Nullable } from "~/types/deep-notes"
import { IPageRef } from "./page/page"




export {
  AppProject,
}




class AppProject {
  ctx: Context

  pathPages!: IPageRef[]
  recentPages!: IPageRef[]

  collapsedLeftSidebar!: boolean
  collapsedRightSidebar!: boolean

  parentPageId: Nullable<string> = null




  constructor(ctx: Context) {
    this.ctx = ctx

    $static.vue.ref(this, 'project.pathPages', () => [])
    $static.vue.ref(this, 'project.recentPages', () => [])

    $static.vue.ref(this, 'project.collapsedLeftSidebar', () => true)
    $static.vue.ref(this, 'project.collapsedRightSidebar', () => true)
  }




  async init() {
    const data = (await this.ctx.$axios.post('/api/project/data', {
      pageId: this.ctx.route.params.page_id,
    })).data

    this.ctx.$app.project.pathPages = data.path
    this.ctx.$app.project.recentPages = data.recent
  }




  bumpRecentPage(page: IPageRef) {
    const index = this.ctx.$app.project.recentPages.findIndex(item => item.id == page.id)
    if (index >= 0)
      this.ctx.$app.project.recentPages.splice(index, 1)

    this.ctx.$app.project.recentPages.push(page)
  }
}