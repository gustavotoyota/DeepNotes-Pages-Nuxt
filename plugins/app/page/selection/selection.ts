import Vue from 'vue'
import { Vec2 } from '~/plugins/static/vec2'
import { Nullable } from "~/types/deep-notes"
import { Arrow } from '../arrows/arrows'
import { Elem, ElemType } from '../elems/elems'
import { Note } from '../notes/notes'
import { AppPage } from '../page'




export class AppSelection {
  page: AppPage

  noteSet!: { [key: string]: boolean }
  arrowSet!: { [key: string]: boolean }

  noteIds!: string[]
  arrowIds!: string[]
  elemIds!: string[]

  notes!: Note[]
  arrows!: Arrow[]
  elems!: Elem[]

  centerPos!: Vec2




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ssrRef(this, '$app.page.selection.noteSet', () => ({}))
    $static.vue.ssrRef(this, '$app.page.selection.arrowSet', () => ({}))




    $static.vue.computed(this, '$app.page.selection.noteIds', () => Object.keys(this.noteSet))
    $static.vue.computed(this, '$app.page.selection.arrowIds', () => Object.keys(this.arrowSet))
    $static.vue.computed(this, '$app.page.selection.elemIds', () => this.noteIds.concat(this.arrowIds))




    $static.vue.computed(this, '$app.page.selection.notes', () => 
      this.page.notes.fromIds(this.noteIds))
    $static.vue.computed(this, '$app.page.selection.arrows', () => 
      this.page.arrows.fromIds(this.arrowIds))
    $static.vue.computed(this, '$app.page.selection.elems', () => 
      (this.notes as Elem[]).concat(this.arrows))




    $static.vue.computed(this, '$app.page.selection.centerPos', (): Vec2 => {
      if (this.elems.length === 0)
        return this.page.camera.pos

      let centerPos = new Vec2(0, 0)

      for (const note of this.notes)
        centerPos = centerPos.add(note.worldCenter)
      for (const arrow of this.arrows)
        centerPos = centerPos.add(arrow.centerPos)

      centerPos = centerPos.divScalar(this.elems.length)

      return centerPos
    })
  }




  has(elem: Elem) {
    return elem.id in (this[`${elem.type}Set` as `${ElemType}Set`] as object)
  }




  clear(activeRegionId?: Nullable<string>) {
    for (const elem of this.elems)
      this.remove(elem)

    this.noteSet = {}
    this.arrowSet = {}

    this.page.activeElem.clear()

    if (activeRegionId !== undefined)
      this.page.activeRegion.id = activeRegionId
  }




  add(...elems: Elem[]) {
    for (const elem of elems) {
      if (elem.selected)
        continue

      if (elem.parentId != this.page.activeRegion.id)
        this.clear(elem.parentId)

      elem.selected = true
      Vue.set(this[`${elem.type}Set` as `${ElemType}Set`] as object, elem.id, true)
      
      if (!this.page.activeElem.exists)
        this.page.activeElem.set(elem)

      if (elem instanceof Note)
        elem.bringToTop()
    }
  }
  remove(...elems: Elem[]) {
    for (const elem of elems) {
      if (!elem.selected)
        continue

      elem.selected = false
      Vue.delete(this[`${elem.type}Set` as `${ElemType}Set`] as object, elem.id)

      if (elem.active)
        this.page.activeElem.set(this.elems.at(-1) ?? null)
    }
  }




  set(...elems: Elem[]) {
    this.clear()
    this.add(...elems)
  }



  
  selectAll() {
    for (const elem of this.page.activeRegion.elems)
      this.add(elem)
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