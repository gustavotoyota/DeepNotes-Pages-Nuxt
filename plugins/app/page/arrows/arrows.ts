import { Context } from "@nuxt/types"
import { AppPage } from "../page"
import { Elem } from "../elems/elems"




export {
  AppArrows,
  Arrow,
  IArrowCollab,
}




class AppArrows {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  fromIds(arrowIds: string[]): Arrow[] {
    return arrowIds
      .map(arrowId => this.page.elems.map[arrowId] as Arrow)
      .filter(arrow => arrow != null)
  }
  toIds(arrows: Arrow[]): string[] {
    return arrows.map(arrow => arrow.id)
  }
}




class Arrow extends Elem {
  constructor(page: AppPage, id?: string) {
    super(page, { id, type: 'arrow' })
  }
}

interface IArrowCollab {
}