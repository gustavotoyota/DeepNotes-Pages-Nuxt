import { v4 as uuidv4 } from 'uuid'

import { syncedStore, getYjsValue, boxed } from "@syncedstore/core"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from 'y-indexeddb'




const page = {}
export default page




page.reset = (id) => {
  const page = {}
  
  page.id = id ?? uuidv4()
  
  page.elems = {
    blocks: [],
    arrows: [],
  
    regionId: null,
    selected: {},
    activeId: null,
    editing: false,
  }
  
  page.camera = {
    pos: { x: 0, y: 0 },
    zoom: 1,
  
    lockPos: false,
    lockZoom: false,
  }
  
  
  

  // Realtime collaboration
  
  const store = new syncedStore({ collab: {} })
  page.collab = store.collab
  $merge(page.collab, {
    name: 'Main page',
  
    blockIds: [],
    arrowIds: [],
  })
  
  if (process.client) {
    const name = `page-${page.id}`
    const doc = getYjsValue(store)
  
    new WebsocketProvider(
      $context.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
      name, doc)
    new IndexeddbPersistence(name, doc)
  }




  $state.page = page
}