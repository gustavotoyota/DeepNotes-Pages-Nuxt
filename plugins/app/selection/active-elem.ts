import { Context } from "@nuxt/types"
import { Exact, Nullable } from "~/types/deep-notes"
import { Elem } from "../elems/elems"
import { Note } from "../notes/notes"




export {
  AppActiveElem,
}




class AppActiveElem {
  ctx: Context

  id!: Nullable<string>
  exists!: boolean
  get!: Nullable<Elem>




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ref(this, 'activeElem.id')
  
  
  
  
    $static.vue.computed(this, 'get', () => {
      const activeElem = this.ctx.$app.elems.map[this.ctx.$app.activeElem.id ?? ''] ?? null

      if (!activeElem || activeElem.parentId != this.ctx.$app.activeRegion.id)
        return null
      
      return activeElem
    })
    $static.vue.computed(this, 'exists', () => this.get != null)
  }



  
  reset() {
    this.ctx.$app.activeElem.id = null
  }

  
  
  
  is(elem: Elem) {
    return　elem.parentId == this.ctx.$app.activeRegion.id
      && elem.id == this.ctx.$app.activeElem.id
  }




  clear() {
    this.ctx.$app.activeElem.id = null
  }




  set(elem: Nullable<Elem>) {
    if (elem == null) {
      this.ctx.$app.activeElem.clear()
      return
    }

    if (this.ctx.$app.activeElem.is(elem))
      return
    
    this.ctx.$app.activeElem.id = elem.id

    this.ctx.$app.selection.add(elem)
  
    if (elem instanceof Note)
      elem.bringToTop()
  }
}