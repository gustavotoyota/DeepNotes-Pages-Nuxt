import { Context } from '@nuxt/types'
import Vue from 'vue'
import { Exact, IArrow } from "~/types/deep-notes"
import { IElem } from '../elems/elems'
import { INote } from '../notes/notes'




interface IAppSelection {
  noteIds: object
  arrowIds: object
  elemIds: string[]

  notes: INote[]
  arrows: IArrow[]
  elems: IElem[]

  reset(): void
  clear(activeRegionId?: string): void
  has(elem): boolean
  add(elem): void
  remove(elem): void
  set(elem): void
}

export type {
  IAppSelection,
}




export const init = <T>({ $app }: Context) =>
new class implements IAppSelection {
  noteIds: object
  arrowIds: object
  elemIds: string[]

  notes: INote[]
  arrows: IArrow[]
  elems: IElem[]




  constructor() {
    $static.vue.ref(this, 'selection.noteIds')
    $static.vue.ref(this, 'selection.arrowIds')
  
  
  
  
    $static.vue.computed(this, 'elemIds', () =>
      Object.keys($app.selection.noteIds).concat(
        Object.keys($app.selection.arrowIds)))
    $static.vue.computed(this, 'notes', () => 
      $app.activeRegion.notes.filter(note => $app.selection.has(note)))
    $static.vue.computed(this, 'arrows', () => 
      $app.page.arrows.filter(arrow => $app.selection.has(arrow)))
    $static.vue.computed(this, 'elems', () => 
      $app.selection.arrows.concat($app.selection.notes))
  }




  reset() {
    $app.selection.noteIds = {}
    $app.selection.arrowIds = {}
  }




  clear(activeRegionId?: string) {
    $app.selection.noteIds = {}
    $app.selection.arrowIds = {}

    $app.activeElem.clear()

    if (activeRegionId !== undefined)
      $app.activeRegion.id = activeRegionId
  }




  has(elem) {
    return elem.id in $app.selection[`${elem.type}Ids`]
  }




  add(elem) {
    if ($app.selection.has(elem))
      return

    if (elem.parentId != $app.activeRegion.id)
      $app.selection.clear(elem.parentId)

    Vue.set($app.selection[`${elem.type}Ids`], elem.id, true)
    
    if (!$app.activeElem.exists)
      $app.activeElem.set(elem)
  }
  remove(elem) {
    if (!$app.selection.has(elem))
      return

    Vue.delete($app.selection[`${elem.type}Ids`], elem.id)

    if ($app.activeElem.is(elem))
      $app.activeElem.set($app.selection.elems.at(-1))
  }




  set(elem) {
    $app.selection.clear()
    $app.selection.add(elem)
  }
} as Exact<IAppSelection, T>