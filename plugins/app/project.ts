import { Context } from "@nuxt/types"
import { Nullable } from "~/types/deep-notes"
import { IPageRef } from "./page/page"




export class AppProject {
  ctx: Context

  pathPages!: IPageRef[]
  recentPages!: IPageRef[]

  allowLeftSidebarModification: boolean = false
  private _collapsedLeftSidebar!: boolean
  collapsedLeftSidebar!: boolean

  allowRightSidebarModification: boolean = false
  private _collapsedRightSidebar!: boolean
  collapsedRightSidebar!: boolean

  parentPageId: Nullable<string> = null
  
  pageIndex!: number




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ssrRef(this, '$app.project.pathPages', () => null)
    $static.vue.ssrRef(this, '$app.project.recentPages', () => null)




    $static.vue.ssrRef(this, '$app.project._collapsedLeftSidebar', () => true)
    $static.vue.computed(this, '$app.project.collapsedLeftSidebar', {
      get: () => { return this._collapsedLeftSidebar },
      set: (value: boolean) => {
        if (!this.allowLeftSidebarModification)
          return

        this._collapsedLeftSidebar = value
        this.allowLeftSidebarModification = false
      },
    })




    $static.vue.ssrRef(this, '$app.project._collapsedRightSidebar', () => true)
    $static.vue.computed(this, '$app.project.collapsedRightSidebar', {
      get: () => { return this._collapsedRightSidebar },
      set: (value: boolean) => {
        if (!this.allowRightSidebarModification)
          return

        this._collapsedRightSidebar = value
        this.allowRightSidebarModification = false
      },
    })




    $static.vue.computed(this, '$app.project.pageIndex', () => 
      this.pathPages.findIndex(pageRef => pageRef.id === this.ctx.$app.page.id))
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




  navigateTo(id: string, fromParent?: boolean) {
    this.parentPageId = fromParent ? this.ctx.$app.page.id : null

    $nuxt.$router.push({ path: `/${id}` })
  }
  navigatePath(offset: number) {
    this.navigateTo(this.pathPages[this.pageIndex + offset].id)
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
  toggleRightSidebar() {
    this.allowRightSidebarModification = true
    this.collapsedRightSidebar = !this.collapsedRightSidebar
  }
}