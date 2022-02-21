import { Context } from '@nuxt/types'
import Vue from 'vue'
import { Exact, Nullable } from "~/types/deep-notes"
import { Arrow } from '../arrows/arrows'
import { Elem } from '../elems/elems'
import { Note } from '../notes/notes'




export {
  AppSelection,
}




class AppSelection {
  [key: string]: unknown
  
  ctx: Context

  noteSet: { [key: string]: boolean } = {}
  arrowSet: { [key: string]: boolean } = {}

  noteIds!: string[]
  arrowIds!: string[]
  elemIds!: string[]

  notes!: Note[]
  arrows!: Arrow[]
  elems!: Elem[]




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ref(this, 'selection.noteSet')
    $static.vue.ref(this, 'selection.arrowSet')




    $static.vue.computed(this, 'noteIds', () => Object.keys(this.noteSet))
    $static.vue.computed(this, 'arrowIds', () => Object.keys(this.arrowSet))
    $static.vue.computed(this, 'elemIds', () => this.noteIds.concat(this.arrowIds))




    $static.vue.computed(this, 'notes', () => 
      this.ctx.$app.notes.fromIds(this.noteIds))
    $static.vue.computed(this, 'arrows', () => 
      this.ctx.$app.arrows.fromIds(this.arrowIds))
    $static.vue.computed(this, 'elems', () => 
      this.ctx.$app.selection.arrows.concat(this.ctx.$app.selection.notes))
  }




  reset() {
    this.ctx.$app.selection.noteSet = {}
    this.ctx.$app.selection.arrowSet = {}
  }




  clear(activeRegionId?: Nullable<string>) {
    this.ctx.$app.selection.noteSet = {}
    this.ctx.$app.selection.arrowSet = {}

    this.ctx.$app.activeElem.clear()

    if (activeRegionId !== undefined)
      this.ctx.$app.activeRegion.id = activeRegionId
  }




  has(elem: Elem) {
    return this.ctx.$app.activeRegion.id == elem.parentId
      && (elem.id in (this.ctx.$app.selection[`${elem.type}Set`] as object))
  }




  add(...elems: Elem[]) {
    for (const elem of elems) {
      if (this.ctx.$app.selection.has(elem))
        continue

      if (elem.parentId != this.ctx.$app.activeRegion.id)
        this.ctx.$app.selection.clear(elem.parentId)

      Vue.set(this.ctx.$app.selection[`${elem.type}Set`] as object, elem.id, true)
      
      if (!this.ctx.$app.activeElem.exists)
        this.ctx.$app.activeElem.set(elem)

      if (elem instanceof Note)
        elem.bringToTop()
    }
  }
  remove(...elems: Elem[]) {
    for (const elem of elems) {
      if (!this.ctx.$app.selection.has(elem))
        continue

      Vue.delete(this.ctx.$app.selection[`${elem.type}Set`] as object, elem.id)

      if (this.ctx.$app.activeElem.is(elem))
        this.ctx.$app.activeElem.set(this.ctx.$app.selection.elems.at(-1) ?? null)
    }
  }




  set(...elems: Elem[]) {
    this.ctx.$app.selection.clear()
    this.ctx.$app.selection.add(...elems)
  }



  



  selectAll() {
    for (const note of this.ctx.$app.activeRegion.notes)
      this.ctx.$app.selection.add(note)
  }
}