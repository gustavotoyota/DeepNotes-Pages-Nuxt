import { v4 as uuidv4 } from 'uuid'

import { syncedStore, getYjsValue } from "@syncedstore/core"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from 'y-indexeddb'




export const init = (ctx) => {
  const { $app } = ctx




  const notes = $app.notes = {}




  let zIndex = 0




  notes.create = ({ id, parentId, clientPos, local }) => {
    const note = $app.elems.create({ type: 'note' })

    $static.utils.merge(note, {
      id: id ?? uuidv4(),
      
      parentId: parentId ?? null,

      children: [],

      zIndex: zIndex++,
    })




    // Realtime collaboration

    const store = new syncedStore({ collab: {} })

    note.collab = store.collab
    
    if (local) {
      $static.utils.merge(note.collab, {
        linkedPageId: null,

        anchor: { x: 0.5, y: 0.5 },

        pos: clientPos ?
          $app.pos.clientToWorld(clientPos) : { x: 0, y: 0 },

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
    }
    
    if (process.client) {
      const name = `note-${note.id}`
      const doc = getYjsValue(store)
      

      const indexedDbProvider = new IndexeddbPersistence(name, doc)

      indexedDbProvider.on('synced', () => {
        const websocketProvider = new WebsocketProvider(
          ctx.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
          name, doc)
      })
    }




    return note
  }
}