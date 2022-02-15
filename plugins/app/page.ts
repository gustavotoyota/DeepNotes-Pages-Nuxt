import { v4 as uuidv4 } from 'uuid'
import { getYjsValue } from '@syncedstore/core'
import { Exact } from "~/types/deep-notes"
import { Context } from '@nuxt/types'
import { Doc } from 'yjs'
import { INote } from './notes/notes'




export type {
  IAppPage,
  IPageCollab,
  IPageRef,
}




interface IAppPage {
  id: string

  collab: IPageCollab

  notes: INote[]
  arrows: any[]

  parentId: string



  reset(args): void;
  resetCollab(pageName: string): void;
  create(name: string);
  navigateTo(args): void;
}

interface IPageCollab {
  name: string,

  noteIds: string[],
  arrowIds: string[],
}

interface IPageRef {
  id: string
  name: string
}




export const init = <T>({ $app, $axios }: Context) => 
new class implements IAppPage {
  id: string = null
  
  collab: any = null

  notes: any[] = null
  arrows: any[] = null

  parentId: string = null




  constructor() {
    $static.vue.ref(this, 'page.id')
  
  
  
  
    $static.vue.computed(this, 'collab', () => $app.collab.store.page)
  
  
  
  
    $static.vue.computed(this, 'notes', () =>
      $app.page.collab.noteIds.map(noteId => $app.elems.map[noteId]))
    $static.vue.computed(this, 'arrows', () =>
      $app.page.collab.arrowIds.map(arrowId => $app.elems.map[arrowId]))
  }




  reset(id) {
    $app.page.id = id ?? uuidv4()




    $app.collab.reset()

    $app.camera.reset()
    $app.panning.reset()

    $app.elems.reset()

    $app.dragging.reset()
    $app.editing.reset()

    $app.activeElem.reset()
    $app.activeRegion.reset()
    $app.boxSelection.reset()
    $app.selection.reset()




    $app.collab.startSync()
  }




  resetCollab(pageName: string) {
    (getYjsValue($app.collab.store) as Doc).transact(() => {
      $static.vue.merge($app.page.collab, {
        name: pageName,
      
        noteIds: [],
        arrowIds: [],
      })
    })
  }




  async create(name) {
    const id = (await $axios.post('/api/page/create', { name })).data

    $app.page.navigateTo({ id, fromParent: true })

    return id
  }




  navigateTo({ id, fromParent }) {
    $app.page.parentId = fromParent ? $app.page.id : null

    $nuxt.$router.push({ path: `/${id}` })
  }
} as Exact<IAppPage, T>