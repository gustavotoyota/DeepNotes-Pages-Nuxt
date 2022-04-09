import { watch, watchEffect } from "@nuxtjs/composition-api"
import { getYjsValue, SyncedArray, SyncedMap, syncedStore, SyncedText, Y } from "@syncedstore/core"
import { debounce } from "lodash"
import Vue from "vue"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"
import type { IArrowCollab } from "./arrows/arrows"
import type { INoteCollab } from "./notes/notes"
import { AppPage, IPageCollab } from "./page"




export class AppCollab {
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




  reset(pageName: string) {
    this.doc.transact(() => {
      $static.vue.merge(this.page.data.collab, {
        name: pageName,
      
        noteIds: [],
        arrowIds: [],

        nextZIndex: 0,
      } as IPageCollab)
    })
  }




  async startSync() {
    const promises = []

    const roomName = `page-${this.page.id}-2`

    if (!this.page.ctx.isDev) {
      this.indexedDbProvider = new IndexeddbPersistence(roomName, this.doc)

      promises.push(new Promise((resolve) => this.indexedDbProvider.on('synced', resolve)))
    }

    this.websocketProvider = new WebsocketProvider(
      this.page.ctx.isDev ? "ws://192.168.1.3:1234" : "wss://yjs-server.deepnotes.app/",
      roomName, this.doc)
      
    promises.push(new Promise((resolve) => this.websocketProvider.on('sync', resolve)))

    await Promise.all(promises)
  }




  postSync(pageData: any) {
    // Initialize page collab

    if (pageData.stateUpdate)
      Y.applyUpdateV2(this.doc, pageData.stateUpdate)
    else if (this.page.data.collab.name == null)
      this.reset(this.page.data.name)




    // Setup camera

    this.page.camera.setup(pageData)




    // Setup page name

    this.page.observeName()




    // Setup templates
    
    this.page.app.templates.setup()




    // Setup elements
    
    this.page.elems.setup()


    

    // Setup undo/redo

    this.page.undoRedo.setup()




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




  clean() {
    const visitedIds = new Set<string>()

    const stack = [...this.page.data.notes]

    while (stack.length > 0) {
      const note = stack.pop()
      if (note == null)
        continue

      visitedIds.add(note.id)

      stack.push(...note.notes)
    }




    const excessNoteIds = Object.keys(this.page.notes.collab).filter(
      noteId => !visitedIds.has(noteId))

    console.log('Excess:', excessNoteIds)

    this.page.collab.doc.transact(() => {
      for (const excessNoteId of excessNoteIds)
        Vue.delete(this.page.notes.collab, excessNoteId)
    })
  }
}

interface IAppCollabStore {
  page: Partial<IPageCollab>
  notes: { [key: string]: INoteCollab }
  arrows: { [key: string]: IArrowCollab }
}