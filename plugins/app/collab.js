import { syncedStore, getYjsValue } from "@syncedstore/core"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"




export const init = ({ $app, isDev, $axios, route }) => {
  const collab = $app.collab = {}




  $static.vue.ref(collab, 'collab.store')
  

  

  collab.reset = () => {
    $app.collab.store = syncedStore({
      page: {},
      notes: {},
      arrows: {},
    })
  }




  collab.startSync = () => {
    const name = `page-${$app.page.id}`
    const doc = getYjsValue($app.collab.store)

    $app.collab.indexedDbProvider = new IndexeddbPersistence(name, doc)

    $app.collab.indexedDbProvider.on('synced', () => {
      console.log('IndexedDB synced.')



      
      $app.collab.websocketProvider = new WebsocketProvider(
      isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
      name, doc)

      $app.collab.websocketProvider.on('sync', async () => {
        console.log('Websocket synced.')



        
        // Update project

        const pageName = (await $axios.post('/api/project/update', {
          pageId: $app.page.id,
          parentPageId: $app.page.parentId ?? null,
        })).data




        // Initialize store if haven't already

        if ($app.page.collab.name == null)
          $app.page.resetCollab(pageName)




        // Update page path
    
        if ($app.project.path.find(item => item.id === $app.page.id) == null) {
          const index = $app.project.path.findIndex(
            item => item.id === $app.page.parentId)
    
          $app.project.path.splice(index + 1, 1)
    
          $app.project.path.push({
            id: $app.page.id,
            name: $app.page.collab.name,
          })
        }




        // Bump recent page

        $app.project.bumpRecentPage({
          id: $app.page.id,
          name: $app.page.collab.name,
        })




        // Start observing changes

        $app.notes.createFromIds($app.page.collab.noteIds)
        $app.notes.observeIds($app.page.collab.noteIds)
      })
    })
  }
}