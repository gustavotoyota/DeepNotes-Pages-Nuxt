import { Context } from "@nuxt/types"
import { Elem } from "../elems/elems"




export {
  AppArrows,
  Arrow,
  IArrowCollab,
}




class AppArrows {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  fromIds(arrowIds: string[]): Arrow[] {
    return arrowIds.map(arrowId => this.ctx.$app.elems.map[arrowId] as Arrow)
  }
  toIds(arrows: Arrow[]): string[] {
    return arrows.map(arrow => arrow.id)
  }
}




class Arrow extends Elem {
  constructor(ctx: Context, id?: string) {
    super(ctx, { id, type: 'arrow' })
  }
}

interface IArrowCollab {
}