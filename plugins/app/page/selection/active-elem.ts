import { Context } from "@nuxt/types"
import { Nullable } from "~/types/deep-notes"
import { AppPage } from "../page"
import { Elem } from "../elems/elems"
import { Note } from "../notes/notes"




export {
  AppActiveElem,
}




class AppActiveElem {
  page: AppPage

  id!: Nullable<string>
  exists!: boolean
  get!: Nullable<Elem>




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ref(this, 'activeElem.id', () => null)
  
  
  
  
    $static.vue.computed(this, 'get', () => {
      const activeElem = this.page.elems.map[this.page.activeElem.id ?? ''] ?? null

      if (!activeElem || activeElem.parentId != this.page.activeRegion.id)
        return null
      
      return activeElem
    })
    $static.vue.computed(this, 'exists', () => this.get != null)
  }

  
  
  
  is(elem: Elem) {
    return　elem.parentId == this.page.activeRegion.id
      && elem.id == this.page.activeElem.id
  }




  clear() {
    this.page.activeElem.id = null
  }




  set(elem: Nullable<Elem>) {
    if (elem == null) {
      this.page.activeElem.clear()
      return
    }

    if (this.page.activeElem.is(elem))
      return
    
    this.page.activeElem.id = elem.id

    this.page.selection.add(elem)
  
    if (elem instanceof Note)
      elem.bringToTop()
  }
}