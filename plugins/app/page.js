import { v4 as uuidv4 } from 'uuid'




export const init = ({ $app }) => {
  const page = $app.page = {}



  
  $app.utils.ref(page, 'id', 'page.id', () => null)
  $app.utils.ref(page, 'camera', 'page.camera', () => null)




  $app.utils.computed(page, 'name', () => {
    const pathPage = $app.project.path.find(item => item.id == $app.page.id)

    return pathPage?.name ?? ''
  })




  page.reset = ({ id, pageName }) => {
    $app.page.id = id
  
    $app.page.camera = {
      pos: { x: 0, y: 0 },
      zoom: 1,
    
      lockPos: false,
      lockZoom: false,
    }
    


    
    if (id == null) {
      $app.page.id = uuidv4()

      $static.utils.merge($app.collab.store.page, {
        name: pageName,
      
        noteIds: [],
        arrowIds: [],
      })
    } else {
    }
  }
}
