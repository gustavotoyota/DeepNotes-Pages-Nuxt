import { Context } from "@nuxt/types"
import { Exact, Nullable } from "~/types/deep-notes"
import { Elem } from "../elems/elems"
import { INote } from "../notes/notes"




export {
  AppActiveElem,
}




class AppActiveElem {
  ctx: Context

  id: Nullable<string> = null
  exists: boolean = false
  get: Nullable<Elem> = null




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ref(this, 'activeElem.id')
  
  
  
  
    $static.vue.computed(this, 'exists',
      () => this.ctx.$app.activeElem.id != null)
    $static.vue.computed(this, 'get',
      () => this.ctx.$app.elems.map[this.ctx.$app.activeElem.id ?? ''])
  }



  
  reset() {
    this.ctx.$app.activeElem.id = null
  }

  
  
  
  is(elem: Elem) {
    return elem.id === this.ctx.$app.activeElem.id
  }




  clear() {
    this.ctx.$app.activeElem.id = null
  }




  set(elem: Nullable<Elem>, bringToTop?: boolean) {
    if (elem == null) {
      this.ctx.$app.activeElem.clear()
      return
    }

    if (this.ctx.$app.activeElem.is(elem))
      return

    this.ctx.$app.selection.add(elem)
    
    this.ctx.$app.activeElem.id = elem.id
  
    if (bringToTop !== false)
      (elem as INote).bringToTop()
  }
}