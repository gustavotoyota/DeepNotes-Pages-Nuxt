import { v4 as uuidv4 } from 'uuid'

import { syncedStore, getYjsValue } from "@syncedstore/core"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from 'y-indexeddb'




const notes = {}
export default notes




let zIndex = 0




notes.create = ({ id, clientPos }) => {
  const note = $app.elems.create({ type: 'note' })

  $utils.merge(note, {
    id: id ?? uuidv4(),

    children: [],

    zIndex: zIndex++,
  })




  // Realtime collaboration

  const store = new syncedStore({ collab: {} })

  note.collab = store.collab

  $utils.merge(note.collab, {
    parentId: null,

    linkedPageId: null,

    anchor: { x: 0.5, y: 0.5 },

    pos: clientPos ?
      $app.coords.clientToWorld(clientPos) : { x: 0, y: 0 },

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
      for (const noteId of note.collab.childrenIds)
        note.children.push($app.notes.create({ noteId }))

      getYjsValue(note.collab.childrenIds).observe(event => {
        let index = 0

        for (const delta of event.changes.delta) {
          if (delta.retain != null)
            index += delta.retain
          if (delta.delete != null)
            note.children.splice(index, delta.delete)
          if (delta.insert != null) {
            const inserted = []
            for (const noteId of delta.insert)
              inserted.push($app.notes.create({ noteId }))
            note.children.splice(index, 0, ...inserted)
          }
        }
        
        console.log(event)
      })

      const websocketProvider = new WebsocketProvider(
        $context.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
        name, doc)
    })
  }




  return note
}