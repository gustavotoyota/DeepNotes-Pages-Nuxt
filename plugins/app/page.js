import { v4 as uuidv4 } from 'uuid'

import { reactive } from '@nuxtjs/composition-api'




export const init = ({ $app }) => {
  const page = $app.page = {}




  $app.utils.ref(page, 'id', 'page.id', () => null)
  
  page.camera = reactive({
    pos: { x: 0, y: 0 },
    zoom: 1,
  
    lockPos: false,
    lockZoom: false,
  })




  page.reset = ({ id, pageName }) => {
    $app.page.id = id



    
    if (id == null) {
      $app.page.id = uuidv4()

      $static.utils.merge($app.collab.store.page, {
        name: pageName,
      
        noteIds: [],
        arrowIds: [],
      })
    }
  }
}
