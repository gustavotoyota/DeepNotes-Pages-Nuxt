import { v4 as uuidv4 } from 'uuid'

import { syncedStore, getYjsValue } from "@syncedstore/core"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from 'y-indexeddb'




export const init = (context) => {
  const { $app } = context




  const notes = $app.notes = {}




  let zIndex = 0




  notes.create = ({ id, parentId, clientPos, local }) => {
  }
}