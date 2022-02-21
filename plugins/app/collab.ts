import { Context } from "@nuxt/types"
import { syncedStore, getYjsValue, SyncedText, SyncedArray, SyncedMap } from "@syncedstore/core"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"
import { Doc } from "yjs"
import type { IArrowCollab } from "./arrows/arrows"
import type { INoteCollab } from "./notes/notes"
import type { IPageCollab } from "./page"




export {
  AppCollab,
}




class AppCollab {
  ctx: Context

  store!: IAppCollabStore
  doc!: Doc
  indexedDbProvider!: IndexeddbPersistence
  websocketProvider!: WebsocketProvider




  constructor(ctx: Context) {
    this.ctx = ctx

    $static.vue.ref(this, 'collab.store')

    $static.vue.computed(this, 'doc', () => getYjsValue(this.store) as Doc)
  }




  reset() {
    this.ctx.$app.collab.store = syncedStore({
      page: {},
      notes: {},
      arrows: {},
    })
  }




  startSync() {
    if (!process.client)
      return

    const name = `page-${this.ctx.$app.page.id}`

    this.ctx.$app.collab.indexedDbProvider = new IndexeddbPersistence(name, this.doc)

    this.ctx.$app.collab.indexedDbProvider.on('synced', () => {
      console.log('IndexedDB synced.')



      
      this.ctx.$app.collab.websocketProvider = new WebsocketProvider(
      this.ctx.isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
      name, this.doc)

      this.ctx.$app.collab.websocketProvider.on('sync', async () => {
        console.log('Websocket synced.')



        
        // Update project

        const pageName = (await this.ctx.$axios.post('/api/project/update', {
          pageId: this.ctx.$app.page.id,
          parentPageId: this.ctx.$app.page.parentId ?? null,
        })).data




        // Initialize store if haven't already

        if (this.ctx.$app.page.collab.name == null)
          this.ctx.$app.page.resetCollab(pageName)




        // Update page path
    
        if (this.ctx.$app.project.path.find(item => item.id == this.ctx.$app.page.id) == null) {
          const index = this.ctx.$app.project.path.findIndex(
            item => item.id == this.ctx.$app.page.parentId)
    
          this.ctx.$app.project.path.splice(index + 1, 1)
    
          this.ctx.$app.project.path.push({
            id: this.ctx.$app.page.id,
            name: this.ctx.$app.page.collab.name,
          })
        }




        // Bump recent page

        this.ctx.$app.project.bumpRecentPage({
          id: this.ctx.$app.page.id,
          name: this.ctx.$app.page.collab.name,
        })




        // Create notes and observe changes

        this.ctx.$app.notes.mapAndObserveNoteIds(this.ctx.$app.page.collab.noteIds, null)

        this.ctx.$app.notes.observeMap()
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