import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { reactive } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { App } from '../app'
import { Nullable } from '~/types/deep-notes'




export type {
  IAppElems,
  IElem,
}

export {
  Elem,
}




interface IAppElems {
  map: { [key: string]: IElem }
  ids: string[]
  array: IElem[]
  
  reset(): void;
}

interface IElem {
  id: string
  type: string
  parentId: Nullable<string>
}

class Elem implements IElem {
  id: string
  type: string
  parentId: Nullable<string>
  
  constructor(ctx: Context, options: {
    id?: string,
    type: string,
    parentId?: string,
  }) {
    this.id = options.id ?? uuidv4()
    this.type = options.type
    this.parentId = options.parentId ?? null
  
    Vue.set(ctx.$app.elems.map, this.id, this)
  }
}




export const init = ({ $app }: Context) => {
  return new class implements IAppElems {
    map: { [key: string]: IElem } = {};
    ids: string[] = [];
    array: IElem[] = [];




    constructor() {
      $static.vue.ref(this, 'elems.map')
  
  
  
  
      $static.vue.computed(this, 'ids',
        () => Object.keys($app.elems.map))
      $static.vue.computed(this, 'array',
        () => Object.values($app.elems.map))
    }
  
  
  
  
    reset() {
      $app.elems.map = {}
    }
  }
}