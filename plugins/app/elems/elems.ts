import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { reactive } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { App } from '../app'
import { Nullable } from '~/types/deep-notes'




export {
  AppElems,
  Elem,
}




class AppElems {
  ctx: Context

  map: { [key: string]: Elem } = {};
  ids: string[] = [];
  array: Elem[] = [];




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ref(this, 'elems.map')




    $static.vue.computed(this, 'ids',
      () => Object.keys(this.ctx.$app.elems.map))
    $static.vue.computed(this, 'array',
      () => Object.values(this.ctx.$app.elems.map))
  }




  reset() {
    this.ctx.$app.elems.map = {}
  }
}

class Elem {
  ctx: Context

  id: string
  type: string
  parentId: Nullable<string>
  
  constructor(ctx: Context, options: {
    id?: string,
    type: string,
    parentId?: Nullable<string>,
  }) {
    this.ctx = ctx

    this.id = options.id ?? uuidv4()
    this.type = options.type
    this.parentId = options.parentId ?? null
    
    Vue.set(ctx.$app.elems.map, this.id, this)
  }
}