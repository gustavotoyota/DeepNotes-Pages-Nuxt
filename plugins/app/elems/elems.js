import { v4 as uuidv4 } from 'uuid'

import { reactive } from '@nuxtjs/composition-api'




const elems = {}
export default elems




elems.create = (values) => {
  return reactive({
    id: values.id ?? uuidv4(),

    type: values.type,
  })
}