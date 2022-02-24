import { Context } from '@nuxt/types'
import Vue from 'vue'
import { Nullable } from "~/types/deep-notes"
import { AppPage } from '../page'
import { Arrow } from '../arrows/arrows'
import { Elem } from '../elems/elems'
import { Note } from '../notes/notes'




export {
  AppSelection,
}




class AppSelection {
  [key: string]: unknown
  
  page: AppPage

  noteSet!: { [key: string]: boolean }
  arrowSet!: { [key: string]: boolean }

  noteIds!: string[]
  arrowIds!: string[]
  elemIds!: string[]

  notes!: Note[]
  arrows!: Arrow[]
  elems!: Elem[]




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ref(this, 'selection.noteSet', () => ({}))
    $static.vue.ref(this, 'selection.arrowSet', () => ({}))




    $static.vue.computed(this, 'noteIds', () => Object.keys(this.noteSet))
    $static.vue.computed(this, 'arrowIds', () => Object.keys(this.arrowSet))
    $static.vue.computed(this, 'elemIds', () => this.noteIds.concat(this.arrowIds))




    $static.vue.computed(this, 'notes', () => 
      this.page.notes.fromIds(this.noteIds))
    $static.vue.computed(this, 'arrows', () => 
      this.page.arrows.fromIds(this.arrowIds))
    $static.vue.computed(this, 'elems', () => 
      this.arrows.concat(this.notes))
  }




  clear(activeRegionId?: Nullable<string>) {
    this.noteSet = {}
    this.arrowSet = {}

    this.page.activeElem.clear()

    if (activeRegionId !== undefined)
      this.page.activeRegion.id = activeRegionId
  }




  has(elem: Elem) {
    return this.page.activeRegion.id == elem.parentId
      && (elem.id in (this[`${elem.type}Set`] as object))
  }




  add(...elems: Elem[]) {
    for (const elem of elems) {
      if (this.has(elem))
        continue

      if (elem.parentId != this.page.activeRegion.id)
        this.clear(elem.parentId)

      Vue.set(this[`${elem.type}Set`] as object, elem.id, true)
      
      if (!this.page.activeElem.exists)
        this.page.activeElem.set(elem)

      if (elem instanceof Note)
        elem.bringToTop()
    }
  }
  remove(...elems: Elem[]) {
    for (const elem of elems) {
      if (!this.has(elem))
        continue

      Vue.delete(this[`${elem.type}Set`] as object, elem.id)

      if (this.page.activeElem.is(elem))
        this.page.activeElem.set(this.elems.at(-1) ?? null)
    }
  }




  set(...elems: Elem[]) {
    this.clear()
    this.add(...elems)
  }



  
  selectAll() {
    for (const note of this.page.activeRegion.notes)
      this.add(note)
  }



  
  shift(shiftX: number, shiftY: number) {
    this.page.collab.doc.transact(() => {
      for (const note of this.notes) {
        note.collab.pos.x += shiftX
        note.collab.pos.y += shiftY
      }
    })
  }
}