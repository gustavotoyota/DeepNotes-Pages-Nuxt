import { v4 as uuidv4 } from 'uuid'

import { syncedStore, getYjsValue } from "@syncedstore/core"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from 'y-indexeddb'

import { reactive } from '@nuxtjs/composition-api'




const page = {}
export default page




page.reset = (id) => {
  const page = reactive({
    id: id ?? uuidv4(),
    
    elems: {
      notes: [],
      arrows: [],
    
      regionId: null,
      selected: {},
      activeId: null,
      editing: false,
    },
    
    camera: {
      pos: { x: 0, y: 0 },
      zoom: 1,
    
      lockPos: false,
      lockZoom: false,
    },
  })
  
  
  

  // Realtime collaboration
  
  const store = new syncedStore({ collab: {} })

  page.collab = store.collab

  $merge(page.collab, {
    name: 'Main page',
  
    noteIds: [],
    arrowIds: [],
  })
  
  if (process.client) {
    const name = `page-${page.id}`
    const doc = getYjsValue(store)
  
    const indexedDbProvider = new IndexeddbPersistence(name, doc)

    indexedDbProvider.on('synced', () => {
      const websocketProvider = new WebsocketProvider(
        $context.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
        name, doc)

      websocketProvider.on('status', event => {
        getYjsValue(store.collab.noteIds).observe(event => {
          console.log(event)
        })
        getYjsValue(store.collab.arrowIds).observe(event => {
          console.log(event)
        })
      })
    })
  }



  
  $state.page = page

  return page
}




page.addNote = (note) => {
  $state.page.elems.notes.push(note)
  $state.page.collab.noteIds.push(note.id)
}
page.addArrow = (arrow) => {
  $state.page.elems.arrows.push(arrow)
  $state.page.collab.arrowIds.push(arrow.id)
}