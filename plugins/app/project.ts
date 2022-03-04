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

  allowLeftSidebarModification: boolean = false
  private _collapsedLeftSidebar!: boolean
  collapsedLeftSidebar!: boolean

  collapsedRightSidebar!: boolean

  parentPageId: Nullable<string> = null




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ssrRef(this, '$app.project.pathPages', () => null)
    $static.vue.ssrRef(this, '$app.project.recentPages', () => null)

    $static.vue.ssrRef(this, '$app.project._collapsedLeftSidebar', () => false)
    $static.vue.computed(this, '$app.project.collapsedLeftSidebar', {
      get: () => { return this._collapsedLeftSidebar },
      set: (value: boolean) => {
        if (!this.allowLeftSidebarModification)
          return

        this._collapsedLeftSidebar = value
        this.allowLeftSidebarModification = false
      },
    })

    $static.vue.ssrRef(this, '$app.project.collapsedRightSidebar', () => true)
  }




  async init() {
    if (this.pathPages != null)
      return




    const data = (await this.ctx.$axios.post('/api/project/data', {
      pageId: this.ctx.route.params.page_id,
    })).data




    this.ctx.$app.project.pathPages = data.pathPages
    this.ctx.$app.project.recentPages = data.recentPages
  }




  bumpRecentPage(page: IPageRef) {
    const index = this.ctx.$app.project.recentPages.findIndex(item => item.id == page.id)
    if (index >= 0)
      this.ctx.$app.project.recentPages.splice(index, 1)

    this.ctx.$app.project.recentPages.push(page)
  }




  toggleLeftSidebar() {
    this.allowLeftSidebarModification = true
    this.collapsedLeftSidebar = !this.collapsedLeftSidebar
  }
}