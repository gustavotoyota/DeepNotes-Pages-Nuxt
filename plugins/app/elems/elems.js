import { v4 as uuidv4 } from 'uuid'

import { reactive } from '@nuxtjs/composition-api'




export const init = ({ $app }) => {
  const elems = $app.elems = {}
  



  elems.create = (values) => {
    return reactive({
      id: values.id ?? uuidv4(),

      type: values.type,
    })
  }
}