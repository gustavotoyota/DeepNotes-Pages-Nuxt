import { v4 as uuidv4 } from 'uuid'

import { syncedStore, getYjsValue } from "@syncedstore/core"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from 'y-indexeddb'

import { reactive } from '@nuxtjs/composition-api'




export const init = (ctx) => {
  const { $app, $state } = ctx




  const page = $app.page = {}




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

    $static.utils.merge(page.collab, {
      name: 'Main page',
    
      noteIds: [],
      arrowIds: [],
    })
    
    if (process.client) {
      const name = `page-${page.id}`
      const doc = getYjsValue(store)
    
      const indexedDbProvider = new IndexeddbPersistence(name, doc)

      indexedDbProvider.on('synced', () => {
        for (const noteId of page.collab.noteIds)
          page.elems.notes.push($app.notes.create({ id: noteId }))

        getYjsValue(page.collab.noteIds).observe(event => {
          let index = 0

          for (const delta of event.changes.delta) {
            if (delta.retain != null)
              index += delta.retain
            if (delta.delete != null)
              page.elems.notes.splice(index, delta.delete)
            if (delta.insert != null) {
              const inserted = []
              
              for (const noteId of delta.insert)
                inserted.push($app.notes.create({ id: noteId }))

              page.elems.notes.splice(index, 0, ...inserted)
            }
          }
          
          console.log(event)
        })
        // getYjsValue(page.collab.arrowIds).observe(event => {
        //   console.log(event)
        // })

        const websocketProvider = new WebsocketProvider(
          ctx.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
          name, doc)
      })
    }



    
    $state.page = page

    return page
  }




  page.addNote = (note) => {
    $state.page.collab.noteIds.push(note.id)
  }
  page.addArrow = (arrow) => {
    $state.page.collab.arrowIds.push(arrow.id)
  }
}
