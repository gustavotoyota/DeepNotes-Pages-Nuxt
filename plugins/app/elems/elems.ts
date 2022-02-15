import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { reactive } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'




export type {
  IAppElems,
  IElem,
}




interface IAppElems {
  map: { [key: string]: IElem }
  ids: string[]
  array: IElem[]
  
  reset(): void;
  create(args: {
    id?: string;
    type: string;
    parentId?: string;
  }): IElem;
}

interface IElem {
  id: string
  type: string
  parentId?: string
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
    
  
  
  
    create({ id, type, parentId }: {
      id?: string;
      type: string;
      parentId?: string;
    }): IElem {
      const elem = reactive({
        id: id ?? uuidv4(),
  
        type: type,
  
        parentId: parentId ?? undefined,
      })
  
      Vue.set($app.elems.map, elem.id, elem)
  
      return elem
    }
  }
}