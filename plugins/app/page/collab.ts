import { Context } from "@nuxt/types"
import { getYjsValue, SyncedArray, SyncedMap, syncedStore, SyncedText } from "@syncedstore/core"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"
import { Doc } from "yjs"
import type { IArrowCollab } from "./arrows/arrows"
import type { INoteCollab } from "./notes/notes"
import { AppPage, IPageCollab } from "./page"




export {
  AppCollab,
}




class AppCollab {
  page: AppPage

  store: IAppCollabStore
  doc: Doc

  indexedDbProvider!: IndexeddbPersistence
  websocketProvider!: WebsocketProvider




  constructor(page: AppPage) {
    this.page = page




    this.store = syncedStore({
      page: {},
      notes: {},
      arrows: {},
    })

    this.doc = getYjsValue(this.store) as Doc
  }




  startSync() {
    if (!process.client)
      return



      
    const name = `page-${this.page.id}-1`

    this.page.collab.indexedDbProvider = new IndexeddbPersistence(name, this.doc)

    this.page.collab.indexedDbProvider.on('synced', () => {
      this.page.collab.websocketProvider = new WebsocketProvider(
      this.page.ctx.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
      name, this.doc)

      this.page.collab.websocketProvider.on('sync', async () => {
        this.page.notes.mapAndObserveIds(this.page.data.collab.noteIds, null)
        this.page.notes.observeMap()
      })
    })
  }



  
  clone(obj: unknown): any {
    const yjsValue = getYjsValue(obj)
  
    if (obj instanceof SyncedText) {
      const text = new SyncedText()
      text.applyDelta(obj.toDelta())
      return text
    } else if (yjsValue instanceof SyncedArray) {
      const cloneArray = []
      for (const value of yjsValue)
        cloneArray.push(this.clone(value))
      return cloneArray
    } else if (yjsValue instanceof Doc
    || yjsValue instanceof SyncedMap) {
      const cloneObj: { [key: string]: unknown } = {}
      for (const [key, value] of Object.entries(obj as object))
        cloneObj[key] = this.clone(value)
      return cloneObj
    } else
      return obj
  }
}

interface IAppCollabStore {
  page: Partial<IPageCollab>
  notes: { [key: string]: INoteCollab }
  arrows: { [key: string]: IArrowCollab }
}