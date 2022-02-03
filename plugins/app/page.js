import { v4 as uuidv4 } from 'uuid'

import { syncedStore, getYjsValue } from "@syncedstore/core"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from 'y-indexeddb'

import { reactive, ssrRef } from '@nuxtjs/composition-api'




export const init = ({ $app }) => {
  const page = $app.page = {}




  page.id = null
  
  page.camera = reactive({
    pos: { x: 0, y: 0 },
    zoom: 1,
  
    lockPos: false,
    lockZoom: false,
  })




  page.reset = (id) => {
  }
}
