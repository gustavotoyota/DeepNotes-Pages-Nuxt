import { syncedStore, getYjsValue } from "@syncedstore/core"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from 'y-indexeddb'




const notes = {}
export default notes




notes.create = (clientPos) => {
  const note = $app.elems.create({ type: 'note' })

  $utils.merge(note, {
    children: [],
  })




  // Realtime collaboration

  const store = new syncedStore({ collab: {} })

  note.collab = store.collab

  $utils.merge(note.collab, {
    parentId: null,

    linkedPageId: null,

    anchor: { x: 0.5, y: 0.5 },

    pos: $app.coords.clientToWorld(clientPos),

    hasTitle: false,
    hasBody: true,
    
    title: '',
    body: '',

    collapsible: false,
    collapsed: false,

    expandedSize: {
      x: 'auto',

      y: {
        title: 'auto',
        body: 'auto',
        container: 'auto',
      },
    },
    collapsedSize: {
      x: 'expanded',
      
      y: {
        title: 'auto',
        body: 'auto',
        container: 'auto',
      },
    },

    movable: true,
    resizable: true,

    wrapTitle: true,
    wrapBody: true,
    
    readOnly: false,

    container: false,
    childrenIds: [],
  })
  
  if (process.client) {
    const name = `note-${note.id}`
    const doc = getYjsValue(store)
  
    const indexedDbProvider = new IndexeddbPersistence(name, doc)

    indexedDbProvider.on('synced', () => {
      const websocketProvider = new WebsocketProvider(
        $context.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
        name, doc)

      websocketProvider.on('status', event => {
        getYjsValue(store.collab.childrenIds).observe(event => {
          console.log(event)
        })
      })
    })
  }
  
  getYjsValue(note.collab.childrenIds).observe(event => {
    console.log(event)
  })




  return note
}