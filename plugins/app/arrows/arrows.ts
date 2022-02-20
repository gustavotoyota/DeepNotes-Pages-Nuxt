import { Context } from "@nuxt/types"
import { Elem } from "../elems/elems"




export {
  Arrow,
  IArrowCollab,
}




class Arrow extends Elem {
  constructor(ctx: Context, id?: string) {
    super(ctx, { id, type: 'arrow' })
  }
}

interface IArrowCollab {
}