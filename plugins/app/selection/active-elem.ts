import { Context } from "@nuxt/types"
import { Exact, Nullable } from "~/types/deep-notes"
import { IElem } from "../elems/elems"
import { INote } from "../notes/notes"




export type {
  IAppActiveElem,
}




interface IAppActiveElem {
  id: Nullable<string>
  exists: boolean
  get: Nullable<IElem>

  reset(): void
  is(elem: IElem): boolean
  clear(): void
  set(elem: Nullable<IElem>, bringToTop?: boolean): void
}




export const init = <T>({ $app }: Context) =>
new class implements IAppActiveElem {
  id: Nullable<string> = null
  exists: boolean = false
  get: Nullable<IElem> = null




  constructor() {
    $static.vue.ref(this, 'activeElem.id')
  
  
  
  
    $static.vue.computed(this, 'exists',
      () => $app.activeElem.id != null)
    $static.vue.computed(this, 'get',
      () => $app.elems.map[$app.activeElem.id ?? ''])
  }



  
  reset() {
    $app.activeElem.id = null
  }

  
  
  
  is(elem: IElem) {
    return elem.id === $app.activeElem.id
  }




  clear() {
    $app.activeElem.id = null
  }




  set(elem: Nullable<IElem>, bringToTop?: boolean) {
    if (elem == null) {
      $app.activeElem.clear()
      return
    }

    if ($app.activeElem.is(elem))
      return

    $app.selection.add(elem)
    
    $app.activeElem.id = elem.id
  
    if (bringToTop !== false)
      $app.notes.bringToTop(elem as INote)
  }
} as Exact<IAppActiveElem, T>