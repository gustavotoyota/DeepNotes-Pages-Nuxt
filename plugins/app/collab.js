import { syncedStore, getYjsValue } from "@syncedstore/core"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"




export const init = ({ $app, isDev }) => {
  const collab = $app.collab = {}




  $app.utils.ref(collab, 'store', 'collab.store', () => null)
  

  

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

        if ($app.collab.store.page.name != null)
          return
          
        const pathPage = $app.project.path.find(item => item.id == $app.page.id)

        $static.utils.merge($app.collab.store.page, {
          name: pathPage.name,
        
          noteIds: [],
          arrowIds: [],
        })
      })
    })
  }
}