import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IPageRef } from "./page"





interface IAppProject {
  path: IPageRef[]
  recent: IPageRef[]

  init(): Promise<void>
  bumpRecentPage(page: IPageRef): void
}

export type {
  IAppProject,
}




export const init = <T>({ $app, $axios, route }: Context) =>
new class implements IAppProject {
  path: IPageRef[] = []
  recent: IPageRef[] = []




  constructor() {
    $static.vue.ref(this, 'project.path')
    $static.vue.ref(this, 'project.recent')
  }




  async init() {
    const data = (await $axios.post('/api/project/data', {
      pageId: route.params.page_id,
    })).data

    $app.project.path = data.path
    $app.project.recent = data.recent
  }




  bumpRecentPage(page: IPageRef) {
    const index = $app.project.recent.findIndex(item => item.id === page.id)
    if (index >= 0)
      $app.project.recent.splice(index, 1)

    $app.project.recent.push(page)
  }
} as Exact<IAppProject, T>