import { syncedStore, getYjsValue } from "@syncedstore/core"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"




export const init = (context) => {
  const { $app, isDev } = context

  const collab = $app.collab = {}




  $app.utils.ref(collab, 'collab.store', () => null)
  

  

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

    new IndexeddbPersistence(name, doc).on('synced', () => {
      console.log('IndexedDB synced.')

      new WebsocketProvider(
      isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
      name, doc).on('sync', () => {
        console.log('Websocket synced.')




        // Initialize store if not already initialized

        if ($app.collab.store.page.name == null) {
          const pathPage = $app.project.path.find(item => item.id == $app.page.id)

          $app.page.resetCollab(pathPage.name)
        }




        // Start observing changes

        $app.notes.createFromMap($app.collab.store.page.noteIds)
        $app.notes.observeMap($app.collab.store.page.noteIds)
      })
    })
  }
}