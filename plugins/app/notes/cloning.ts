import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { Elem } from "../elems/elems"




export {
  AppCloning,
}




class AppCloning {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  perform(elem: Elem, event: KeyboardEvent) {
  }
}