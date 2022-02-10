import { v4 as uuidv4 } from 'uuid'
import { getYjsValue } from '@syncedstore/core'




export const init = ({ $app }) => {
  const page = $app.page = {}



  
  $app.utils.ref('page.id')




  $static.vue.computed(page, 'collab', () => $app.collab.store.page)




  $static.vue.computed(page, 'notes', () =>
    $app.page.collab.noteIds.map(noteId => $app.elems.map[noteId]))
  $static.vue.computed(page, 'arrows', () =>
    $app.page.collab.arrowIds.map(arrowId => $app.elems.map[arrowId]))




  page.reset = ({ id, pageName }) => {
    $app.page.id = id ?? uuidv4()




    $app.collab.reset()

    $app.camera.reset()
    $app.panning.reset()

    $app.elems.reset()

    $app.dragging.reset()
    $app.editing.reset()

    $app.activeElem.reset()
    $app.activeRegion.reset()
    $app.boxSelection.reset()
    $app.selection.reset()
    



    if (id == null)
      $app.page.resetCollab(pageName)




    $app.collab.startSync()
  }




  page.resetCollab = (pageName) => {
    getYjsValue($app.collab.store).transact(() => {
      $static.vue.merge($app.page.collab, {
        name: pageName,
      
        noteIds: [],
        arrowIds: [],
      })
    })
  }
}
