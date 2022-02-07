import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { reactive } from '@nuxtjs/composition-api'




export const init = ({ $app }) => {
  const elems = $app.elems = {}




  $app.utils.ref('elems.map', () => ({}))
  



  elems.create = ({ id, type, parentId }) => {
    const elem = reactive({
      id: id ?? uuidv4(),

      type: type,

      parentId: parentId ?? null,
    })

    Vue.set($app.elems.map, elem.id, elem)

    return elem
  }
}