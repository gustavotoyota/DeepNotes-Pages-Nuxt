import { Context } from '@nuxt/types'
import Vue from 'vue'
import { Exact, IArrow } from "~/types/deep-notes"
import { IElem } from '../elems/elems'
import { INote } from '../notes/notes'




export type {
  IAppSelection,
}




interface IAppSelection {
  [key: string]: any

  noteIds: { [key: string]: boolean }
  arrowIds: { [key: string]: boolean }
  elemIds: string[]

  notes: INote[]
  arrows: IArrow[]
  elems: IElem[]

  reset(): void
  clear(activeRegionId?: string): void
  has(elem: IElem): boolean
  add(elem: IElem): void
  remove(elem: IElem): void
  set(elem: IElem): void
}




export const init = <T>({ $app }: Context) =>
new class implements IAppSelection {
  noteIds: { [key: string]: boolean } = {}
  arrowIds: { [key: string]: boolean } = {}
  elemIds: string[] = []

  notes: INote[] = []
  arrows: IArrow[] = []
  elems: IElem[] = []




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




  has(elem: IElem) {
    return elem.id in $app.selection[`${elem.type}Ids`]
  }




  add(elem: IElem) {
    if ($app.selection.has(elem))
      return

    if (elem.parentId != $app.activeRegion.id)
      $app.selection.clear(elem.parentId)

    Vue.set($app.selection[`${elem.type}Ids`], elem.id, true)
    
    if (!$app.activeElem.exists)
      $app.activeElem.set(elem)
  }
  remove(elem: IElem) {
    if (!$app.selection.has(elem))
      return

    Vue.delete($app.selection[`${elem.type}Ids`], elem.id)

    if ($app.activeElem.is(elem))
      $app.activeElem.set($app.selection.elems.at(-1))
  }




  set(elem: IElem) {
    $app.selection.clear()
    $app.selection.add(elem)
  }
} as Exact<IAppSelection, T>