import { Context } from '@nuxt/types'
import { ref } from '@nuxtjs/composition-api'
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




  ids!: string[]
  array!: Elem[]




  constructor(page: AppPage) {
    this.page = page
  }
}

class Elem {
  page: AppPage

  id: string
  type: string
  parentId: Nullable<string>
  
  active!: boolean
  selected!: boolean
  
  index!: number



  
  constructor(page: AppPage, options: {
    id?: string,
    type: string,
    parentId?: Nullable<string>,
  }) {
    this.page = page

    this.id = options.id ?? uuidv4()
    this.type = options.type
    this.parentId = options.parentId ?? null



    
    $static.vue.ref(this, 'active', this.page.activeElem.is(this))
    $static.vue.ref(this, 'selected', this.page.selection.has(this))

    $static.vue.ref(this, 'index', 0)


    
    
    const elems = this.page[`${this.type}s`] as
      { map: { [key: string]: Elem } }
    Vue.set(elems.map, this.id, this)
  }
}