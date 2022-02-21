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

  notes: Note[] = []
  arrows: Arrow[] = []
  elems: Elem[] = []




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ref(this, 'selection.noteSet')
    $static.vue.ref(this, 'selection.arrowSet')




    $static.vue.computed(this, 'notes', () => 
      this.ctx.$app.activeRegion.notes.filter(note => this.ctx.$app.selection.has(note)))
    $static.vue.computed(this, 'arrows', () => 
      this.ctx.$app.page.arrows.filter(arrow => this.ctx.$app.selection.has(arrow)))
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
    return this.ctx.$app.activeRegion.id === elem.parentId
      && (elem.id in (this.ctx.$app.selection[`${elem.type}Set`] as object))
  }




  add(elem: Elem) {
    if (this.ctx.$app.selection.has(elem))
      return

    if (elem.parentId != this.ctx.$app.activeRegion.id)
      this.ctx.$app.selection.clear(elem.parentId)

    Vue.set(this.ctx.$app.selection[`${elem.type}Set`] as object, elem.id, true)
    
    if (!this.ctx.$app.activeElem.exists)
      this.ctx.$app.activeElem.set(elem)
  }
  remove(elem: Elem) {
    if (!this.ctx.$app.selection.has(elem))
      return

    Vue.delete(this.ctx.$app.selection[`${elem.type}Set`] as object, elem.id)

    if (this.ctx.$app.activeElem.is(elem))
      this.ctx.$app.activeElem.set(this.ctx.$app.selection.elems.at(-1) ?? null)
  }




  set(elem: Elem) {
    this.ctx.$app.selection.clear()
    this.ctx.$app.selection.add(elem)
  }



  



  selectAll() {
    for (const note of this.ctx.$app.activeRegion.notes)
      this.ctx.$app.selection.add(note)
  }
}