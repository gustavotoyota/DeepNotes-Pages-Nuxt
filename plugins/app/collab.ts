import { Context } from "@nuxt/types"
import { syncedStore, getYjsValue } from "@syncedstore/core"
import { IndexeddbPersistence } from "y-indexeddb"
import { WebsocketProvider } from "y-websocket"
import { Doc } from "yjs"
import { Nullable } from "~/types/deep-notes"
import { IPageCollab } from "./page"




interface IAppCollab {
  store: IAppCollabStore;
  indexedDbProvider: IndexeddbPersistence;
  websocketProvider: WebsocketProvider;

  reset(): void;
  startSync(): void;
}

interface IAppCollabStore {
  page: Partial<IPageCollab>
  notes: {}
  arrows: {}
}

export type {
  IAppCollab,
}




export const init = ({ $app, isDev, $axios }: Context): IAppCollab => {
  return new class implements IAppCollab {
    store!: IAppCollabStore
    indexedDbProvider!: IndexeddbPersistence
    websocketProvider!: WebsocketProvider




    constructor() {
      $static.vue.ref(this, 'collab.store')
    }




    reset() {
      $app.collab.store = syncedStore({
        page: {},
        notes: {},
        arrows: {},
      })
    }
  
  
  
  
    startSync() {
      const name = `page-${$app.page.id}`
      const doc = getYjsValue($app.collab.store)
  
      $app.collab.indexedDbProvider = new IndexeddbPersistence(name, doc as Doc)
  
      $app.collab.indexedDbProvider.on('synced', () => {
        console.log('IndexedDB synced.')
  
  
  
        
        $app.collab.websocketProvider = new WebsocketProvider(
        isDev ? "ws://localhost:1234" : "wss://yjs-server.deepnotes.app/",
        name, doc as Doc)
  
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
  
  
  
  
          // Start observing changes
  
          $app.notes.createFromIds($app.page.collab.noteIds)
          $app.notes.observeIds($app.page.collab.noteIds)
        })
      })
    }
  }
}