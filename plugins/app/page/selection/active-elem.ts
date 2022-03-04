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




    $static.vue.ssrRef(this, 'activeElem.id', () => null)
    $static.vue.ssrRef(this, 'activeElem.type', () => 'page')
  
  
  
  
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
    return elem.id == this.id
  }




  clear() {
    this.set(null)
  }




  set(elem: Nullable<Elem>) {
    if (elem?.id == this.id)
      return

    if (this.get != null)
      this.get.active = false
    
    this.id = elem?.id ?? null
    this.type = elem?.type ?? 'page'

    if (elem == null)
      return
    
    elem.active = true

    this.page.selection.add(elem)
  
    if (elem instanceof Note)
      elem.bringToTop()
  }
}