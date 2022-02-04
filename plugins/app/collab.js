import { useRoute } from "@nuxtjs/composition-api"
import syncedStore from "@syncedstore/core"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"




export const init = ({ $app, isDev }) => {
  const collab = $app.collab = {}
  

  

  collab.reset = () => {
    $app.collab.store = $app.collab.store = syncedStore({
      page: {},
      notes: {},
      arrows: {},
    })
  }




  collab.startSync = () => {
    const route = useRoute()
    
    const name = `page-${route.value.params.page_id}`
    const doc = getYjsValue($app.collab.store)

    new IndexeddbPersistence(name, doc).on('synced', () => {
      console.log('IndexedDB synced.')

      new WebsocketProvider(
      isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
      name, doc).on('sync', () => {
        console.log('Websocket synced.')
      })
    })
  }
}