import { getYjsValue } from '@syncedstore/core'
import { v4 as uuidv4 } from 'uuid'




export const init = ({ $app }) => {
  const page = $app.page = {}



  
  $app.utils.ref('page.id', () => null)




  $app.utils.computed(page, 'collab', () => $app.collab.store.page)




  page.reset = ({ id, pageName }) => {
    $app.page.id = id ?? uuidv4()
    


    
    if (id == null)
      $app.page.resetCollab(pageName)
  }




  page.resetCollab = (pageName) => {
    $static.utils.merge($app.page.collab, {
      name: pageName,
    
      noteIds: [],
      arrowIds: [],
    })
  }




  $app.utils.computed(page, 'arrows', () =>
    $app.page.collab.arrowIds.map(arrowId => $app.elems.map[arrowId]))
}
