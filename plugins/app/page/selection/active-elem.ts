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
  type!: string

  exists!: boolean
  get!: Nullable<Elem>




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ref(this, 'activeElem.id', () => null)
    $static.vue.ref(this, 'activeElem.type', () => 'page')
  
  
  
  
    $static.vue.computed(this, 'get', () => {
      if (this.id == null)
        return null

      const elems = this.page[`${this.type}s`] as
        { map: { [key: string]: Elem } }
      const activeElem = elems.map[this.id] ?? null

      if (activeElem == null
      || activeElem.parentId != this.page.activeRegion.id)
        return null
      
      return activeElem
    })
    $static.vue.computed(this, 'exists', () => this.get != null)
  }

  
  
  
  is(elem: Elem) {
    return　elem.parentId == this.page.activeRegion.id
      && elem.id == this.id
  }




  clear() {
    this.id = null
    this.type = 'page'
  }




  set(elem: Nullable<Elem>) {
    if (elem == null) {
      this.clear()
      return
    }

    if (this.is(elem))
      return
    
    this.id = elem.id
    this.type = elem.type

    this.page.selection.add(elem)
  
    if (elem instanceof Note)
      elem.bringToTop()
  }
}