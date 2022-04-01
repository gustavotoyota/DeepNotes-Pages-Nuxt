import { Context } from '@nuxt/types'
import { ref } from '@nuxtjs/composition-api'
import { v4 as uuidv4 } from 'uuid'
import Vue from 'vue'
import { Nullable } from '~/types/deep-notes'
import { AppPage } from '../page'




export enum ElemType {
  NOTE = 'note',
  ARROW = 'arrow',
}




export class Elem {
  page: AppPage

  id: string
  type: ElemType
  parentId: Nullable<string>
  
  active!: boolean
  selected!: boolean
  
  index!: number



  
  constructor(page: AppPage, options: {
    id?: string,
    type: ElemType,
    parentId?: Nullable<string>,
    addToMap?: boolean,
  }) {
    this.page = page

    this.id = options.id ?? uuidv4()
    this.type = options.type
    this.parentId = options.parentId ?? null



    
    $static.vue.ref(this, 'elem.active', this.page.activeElem.is(this))
    $static.vue.ref(this, 'elem.selected', this.page.selection.has(this))

    $static.vue.ref(this, 'elem.index', -1)


    
    
    if (options.addToMap ?? true) {
      const elems = this.page[`${this.type}s` as `${ElemType}s`]

      Vue.set(elems.map, this.id, this)
    }
  }
}




export class AppElems {
  page: AppPage




  ids!: string[]
  array!: Elem[]




  constructor(page: AppPage) {
    this.page = page
  }
}