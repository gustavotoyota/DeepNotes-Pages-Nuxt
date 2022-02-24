import { Context } from "@nuxt/types"
import { getYjsValue, SyncedArray, SyncedMap, syncedStore, SyncedText } from "@syncedstore/core"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"
import { Doc } from "yjs"
import type { IArrowCollab } from "./arrows/arrows"
import type { INoteCollab } from "./notes/notes"
import type { IPageCollab } from "./data"
import { AppPage } from "./page"




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

    const name = `page-${this.page.data.id}-1`

    this.page.collab.indexedDbProvider = new IndexeddbPersistence(name, this.doc)

    this.page.collab.indexedDbProvider.on('synced', () => {
      this.page.collab.websocketProvider = new WebsocketProvider(
      this.page.ctx.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
      name, this.doc)

      this.page.collab.websocketProvider.on('sync', async () => {
        // Update project

        const pageName = (await this.page.ctx.$axios.post('/api/project/update', {
          pageId: this.page.data.id,
          parentPageId: this.page.data.parentId,
        })).data




        // Initialize store if haven't already

        if (this.page.data.collab.name == null)
          this.page.data.resetCollab(pageName)




        // Update page path
    
        if (this.page.project.path.find(item => item.id == this.page.data.id) == null) {
          const index = this.page.project.path.findIndex(
            item => item.id == this.page.data.parentId)
    
          this.page.project.path.splice(index + 1)
    
          this.page.project.path.push({
            id: this.page.data.id,
            name: this.page.data.collab.name,
          })
        }




        // Bump recent page

        this.page.project.bumpRecentPage({
          id: this.page.data.id,
          name: this.page.data.collab.name,
        })




        // Create notes and observe changes

        this.page.notes.mapAndObserveNoteIds(this.page.data.collab.noteIds, null)

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