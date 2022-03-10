import { Context } from "@nuxt/types"
import { AppPage } from "../page"
import { Elem } from "../elems/elems"




export class AppArrows {
  page: AppPage




  map!: { [key: string]: Arrow }




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ssrRef(this, '$app.page.arrows.map', () => ({}))




    $static.vue.computed(this, '$app.page.arrows.ids', () => Object.keys(this.map))
    $static.vue.computed(this, '$app.page.arrows.array', () => Object.values(this.map))
  }




  fromIds(arrowIds: string[]): Arrow[] {
    return arrowIds
      .map(arrowId => this.map[arrowId] as Arrow)
      .filter(arrow => arrow != null)
  }
  toIds(arrows: Arrow[]): string[] {
    return arrows.map(arrow => arrow.id)
  }
}




export class Arrow extends Elem {
  constructor(page: AppPage, id?: string) {
    super(page, { id, type: 'arrow' })
  }
}

export interface IArrowCollab {
}