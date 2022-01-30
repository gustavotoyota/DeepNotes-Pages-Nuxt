import { v4 as uuidv4 } from 'uuid'

import { syncedStore, getYjsValue, boxed } from "@syncedstore/core";
import { WebsocketProvider } from "y-websocket";


const pages = {}
export default pages




pages.create = (name) => {
  const store = syncedStore({ page: {} });

  store.page.id = uuidv4()

  store.page.name = name

  store.page.elems = {
    blocks: [],
    arrows: [],
    
    regionId: null,
    selected: {},
    activeId: null,
    editing: false,
  }

  store.page.camera = {
    pos: { x: 0, y: 0 },
    zoom: 1,

    lockPos: false,
    lockZoom: false,
  }

  if (globalThis.window) {
    const doc = getYjsValue(store);
    new WebsocketProvider(
      $context.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
      `page-${store.page.id}`,
      doc);
  }



  $state.project.pages.list.push(store.page)

  return store
}