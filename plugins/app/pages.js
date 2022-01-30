import { v4 as uuidv4 } from 'uuid'

import { syncedStore, getYjsValue, boxed } from "@syncedstore/core"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from 'y-indexeddb'


const pages = {}
export default pages




pages.create = (name) => {
  const store = syncedStore({ page: {} })



  
  const page = store.page

  page.id = uuidv4()

  page.name = name

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

  if (process.client) {
    const doc = getYjsValue(store);

    const name = `page-${store.page.id}`

    new WebsocketProvider(
      $context.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
      name, doc)

    new IndexeddbPersistence(name, doc)
  }


  

  $state.project.pages.list.push(page)

  return page
}