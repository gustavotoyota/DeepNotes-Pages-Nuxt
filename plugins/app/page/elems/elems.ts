import { Context } from '@nuxt/types'
import { v4 as uuidv4 } from 'uuid'
import Vue from 'vue'
import { Nullable } from '~/types/deep-notes'
import { AppPage } from '../page'




export {
  AppElems,
  Elem,
}




class AppElems {
  page: AppPage

  map!: { [key: string]: Elem }
  ids!: string[]
  array!: Elem[]




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ref(this, 'elems.map', () => ({}))




    $static.vue.computed(this, 'ids',
      () => Object.keys(this.page.elems.map))
    $static.vue.computed(this, 'array',
      () => Object.values(this.page.elems.map))
  }




  fromIds(elemIds: string[]): Elem[] {
    return elemIds
      .map(elemId => this.page.elems.map[elemId])
      .filter(elem => elem != null)
  }
  toIds(elems: Elem[]): string[] {
    return elems.map(elem => elem.id)
  }
}

class Elem {
  page: AppPage

  id: string
  type: string
  parentId: Nullable<string>
  
  constructor(page: AppPage, options: {
    id?: string,
    type: string,
    parentId?: Nullable<string>,
  }) {
    this.page = page

    this.id = options.id ?? uuidv4()
    this.type = options.type
    this.parentId = options.parentId ?? null
    
    Vue.set(this.page.elems.map, this.id, this)
  }
}