import { Context } from "@nuxt/types"
import { syncedStore, getYjsValue } from "@syncedstore/core"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"
import { Doc } from "yjs"
import type { IArrowCollab } from "./arrows/arrows"
import type { INoteCollab } from "./notes/notes"
import type { IPageCollab } from "./page"




export type {
  IAppCollab,
}




interface IAppCollab {
  store: IAppCollabStore;
  doc: Doc;

  indexedDbProvider: IndexeddbPersistence;
  websocketProvider: WebsocketProvider;

  reset(): void;
  startSync(): void;
}

interface IAppCollabStore {
  page: Partial<IPageCollab>
  notes: { [key: string]: INoteCollab }
  arrows: { [key: string]: IArrowCollab }
}




export const init = ({ $app, isDev, $axios }: Context): IAppCollab => {
  return new class implements IAppCollab {
    store!: IAppCollabStore
    doc!: Doc
    indexedDbProvider!: IndexeddbPersistence
    websocketProvider!: WebsocketProvider




    constructor() {
      $static.vue.ref(this, 'collab.store')



      $static.vue.computed(this, 'doc', () => getYjsValue(this.store) as Doc)
    }




    reset() {
      $app.collab.store = syncedStore({
        page: {},
        notes: {},
        arrows: {},
      })
    }
  
  
  
  
    startSync() {
      if (!process.client)
        return

      const name = `page-${$app.page.id}`
  
      $app.collab.indexedDbProvider = new IndexeddbPersistence(name, this.doc)
  
      $app.collab.indexedDbProvider.on('synced', () => {
        console.log('IndexedDB synced.')
  
  
  
        
        $app.collab.websocketProvider = new WebsocketProvider(
        isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
        name, this.doc)
  
        $app.collab.websocketProvider.on('sync', async () => {
          console.log('Websocket synced.')
  
  
  
          
          // Update project
  
          const pageName = (await $axios.post('/api/project/update', {
            pageId: $app.page.id,
            parentPageId: $app.page.parentId ?? null,
          })).data
  
  
  
  
          // Initialize store if haven't already
  
          if ($app.page.collab.name == null)
            $app.page.resetCollab(pageName)
  
  
  
  
          // Update page path
      
          if ($app.project.path.find(item => item.id === $app.page.id) == null) {
            const index = $app.project.path.findIndex(
              item => item.id === $app.page.parentId)
      
            $app.project.path.splice(index + 1, 1)
      
            $app.project.path.push({
              id: $app.page.id,
              name: $app.page.collab.name,
            })
          }
  
  
  
  
          // Bump recent page
  
          $app.project.bumpRecentPage({
            id: $app.page.id,
            name: $app.page.collab.name,
          })
  
  
  
  
          // Create notes and observe changes
  
          $app.notes.createAndObserveChildren($app.page.collab.noteIds)
          $app.notes.observeMap()
        })
      })
    }
  }
}