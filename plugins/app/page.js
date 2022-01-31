import { v4 as uuidv4 } from 'uuid'

import { syncedStore, getYjsValue } from "@syncedstore/core"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from 'y-indexeddb'




const page = {}
export default page




page.reset = (id) => {
  const page = $state.page = {}
  
  page.id = id ?? uuidv4()
  
  page.elems = {
    notes: [],
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
  
  const store = new syncedStore({ collab: {}, test: [] })

  page.store = store

  page.collab = store.collab

  $merge(page.collab, {
    name: 'Main page',
  
    noteIds: [],
    arrowIds: [],
  })
  
  if (process.client) {
    const name = `page-${page.id}`
    const doc = getYjsValue(store)
  
    new WebsocketProvider(
      $context.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
      name, doc)
    new IndexeddbPersistence(name, doc)

    getYjsValue(store.collab.noteIds).observe(event => {
      console.log(event)
    })
    getYjsValue(store.collab.arrowIds).observe(event => {
      console.log(event)
    })
  }



  return page
}




page.addNote = (note) => {
  page.elems.notes.push(note)
  page.collab.noteIds.push(note.id)
}
page.addArrow = (arrow) => {
  page.elems.arrows.push(arrow)
  page.collab.arrowIds.push(arrow.id)
}