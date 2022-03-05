import { Context } from "@nuxt/types"
import { watch } from "@nuxtjs/composition-api"
import { getYjsValue, SyncedArray, SyncedMap, syncedStore, SyncedText, Y } from "@syncedstore/core"
import { debounce } from "lodash"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"
import type { IArrowCollab } from "./arrows/arrows"
import type { INoteCollab } from "./notes/notes"
import { AppPage, IPageCollab } from "./page"




export {
  AppCollab,
}




class AppCollab {
  page: AppPage

  store: IAppCollabStore
  doc: Y.Doc

  indexedDbProvider!: IndexeddbPersistence
  websocketProvider!: WebsocketProvider




  constructor(page: AppPage) {
    this.page = page




    this.store = syncedStore({
      page: {},
      notes: {},
      arrows: {},
    })

    this.doc = getYjsValue(this.store) as Y.Doc
  }




  async startSync() {
    const roomName = `page-${this.page.id}-1`




    this.indexedDbProvider = new IndexeddbPersistence(roomName, this.doc)
    this.websocketProvider = new WebsocketProvider(
      this.page.ctx.isDev ? "ws://192.168.1.3:1234" : "wss://yjs-server.deepnotes.app/",
      roomName, this.doc)




    const promises = []

    promises.push(new Promise((resolve) => this.indexedDbProvider.on('synced', resolve)))
    promises.push(new Promise((resolve) => this.websocketProvider.on('sync', resolve)))

    await Promise.all(promises)
  }




  postSync(pageData: any) {
    // Initialize page collab

    if (pageData.stateUpdate)
      Y.applyUpdateV2(this.doc, pageData.stateUpdate)
    else if (this.page.data.collab.name == null)
      this.page.resetCollab(this.page.data.name)




    // Setup camera
    
    if (!this.page.camera.loaded) {
      this.page.camera.fitToScreen()

      this.page.camera.loaded = true
    }

    this.page.camera.watchChanges()




    // Keep path and recent page names updated

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




    // Keep page name updated on database

    watch(() => this.page.data.collab.name, debounce(() => {
      this.page.ctx.$axios.post('/api/page/update-name', {
        pageId: this.page.id,
        pageName: this.page.data.collab.name,
      })
    }, 2000))




    // Observe note changes
    
    this.page.notes.mapAndObserveIds(this.page.data.collab.noteIds, null)
    this.page.notes.observeMap()




    this.page.loaded = true
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
    } else if (yjsValue instanceof Y.Doc
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