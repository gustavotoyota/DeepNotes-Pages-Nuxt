import { Context } from "@nuxt/types"
import { watch } from "@nuxtjs/composition-api"
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

    this.indexedDbProvider = new IndexeddbPersistence(name, this.doc)

    this.indexedDbProvider.on('synced', () => {
      this.websocketProvider = new WebsocketProvider(
      this.page.ctx.isDev ? "ws://192.168.1.7:1234" : "wss://yjs-server.deepnotes.app/",
      name, this.doc)

      this.websocketProvider.on('sync', async () => {
        // Update project
    
        const pageName = (await this.page.ctx.$axios.post('/api/project/update', {
          pageId: this.page.id,
          parentPageId: this.page.ctx.$app.project.parentPageId,
        })).data
    
    
    
    
        // Initialize page collab
    
        if (this.page.data.collab.name == null)
          this.page.resetCollab(pageName)




        // Watch for page name changes
    
        watch(() => this.page.data.collab.name, () => {
          const pathRef = this.page.project.pathPages.find(
            pageRef => pageRef.id == this.page.id)

          if (pathRef != null)
            pathRef.name = this.page.data.collab.name
    

            

          const recentRef = this.page.project.recentPages.find(
            pageRef => pageRef.id == this.page.id)

          if (recentRef != null)
            recentRef.name = this.page.data.collab.name
        }, { immediate: true })




        // Observe note changes
        
        this.page.notes.mapAndObserveIds(this.page.data.collab.noteIds, null)
        this.page.notes.observeMap()




        this.page.loaded = true
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