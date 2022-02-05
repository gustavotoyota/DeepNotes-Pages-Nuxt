import { getYjsValue } from '@syncedstore/core'
import { v4 as uuidv4 } from 'uuid'




export const init = ({ $app }) => {
  const page = $app.page = {}



  
  $app.utils.ref(page, 'id', 'page.id', () => null)
  $app.utils.ref(page, 'camera', 'page.camera', () => null)




  page.reset = ({ id, pageName }) => {
    $app.page.id = id ?? uuidv4()
  
    $app.page.camera = {
      pos: { x: 0, y: 0 },
      zoom: 1,
    
      lockPos: false,
      lockZoom: false,
    }
    


    
    if (id == null)
      $app.page.resetCollab(pageName)
  }




  page.resetCollab = (pageName) => {
    $static.utils.merge($app.collab.store.page, {
      name: pageName,
    
      noteIds: {},
      arrowIds: {},
    })
  }
}
