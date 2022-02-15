import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IElem } from "../elems/elems"




export type {
  IAppActiveElem,
}




interface IAppActiveElem {
  id: string
  exists: boolean
  get: IElem

  reset(): void
  is(elem): boolean
  clear(): void
  set(elem, bringToTop?: boolean): void
}




export const init = <T>({ $app }: Context) =>
new class implements IAppActiveElem {
  id: string
  exists: boolean
  get: IElem




  constructor() {
    $static.vue.ref(this, 'activeElem.id')
  
  
  
  
    $static.vue.computed(this, 'exists',
      () => $app.activeElem.id != null)
    $static.vue.computed(this, 'get',
      () => $app.elems.map[$app.activeElem.id])
  }



  
  reset() {
    $app.activeElem.id = null
  }

  
  
  
  is(elem) {
    return elem.id === $app.activeElem.id
  }




  clear() {
    $app.activeElem.id = null
  }




  set(elem, bringToTop) {
    if ($app.activeElem.is(elem))
      return
      
    if (elem == null) {
      $app.activeElem.clear()
      return
    }

    $app.selection.add(elem)
    
    $app.activeElem.id = elem.id
  
    if (bringToTop !== false)
      $app.notes.bringToTop(elem)
  }
} as Exact<IAppActiveElem, T>