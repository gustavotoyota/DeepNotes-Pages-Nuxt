import { Context } from "@nuxt/types"
import { IPageRef } from "./page"




export {
  AppProject,
}




class AppProject {
  ctx: Context

  path!: IPageRef[]
  recent!: IPageRef[]




  constructor(ctx: Context) {
    this.ctx = ctx

    $static.vue.ref(this, 'project.path')
    $static.vue.ref(this, 'project.recent')
  }




  async init() {
    const data = (await this.ctx.$axios.post('/api/project/data', {
      pageId: this.ctx.route.params.page_id,
    })).data

    this.ctx.$app.project.path = data.path
    this.ctx.$app.project.recent = data.recent
  }




  bumpRecentPage(page: IPageRef) {
    const index = this.ctx.$app.project.recent.findIndex(item => item.id == page.id)
    if (index >= 0)
      this.ctx.$app.project.recent.splice(index, 1)

    this.ctx.$app.project.recent.push(page)
  }
}