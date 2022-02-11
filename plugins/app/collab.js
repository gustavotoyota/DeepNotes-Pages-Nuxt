import { syncedStore, getYjsValue } from "@syncedstore/core"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"




export const init = ({ $app, isDev }) => {
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

      $app.collab.websocketProvider.on('sync', () => {
        console.log('Websocket synced.')




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