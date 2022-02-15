import { v4 as uuidv4 } from 'uuid'
import { Exact, Nullable } from "~/types/deep-notes"
import { Context } from '@nuxt/types'
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

  parentId: Nullable<string>



  reset(id?: string): void;
  resetCollab(pageName: string): void;
  create(name: string): Promise<string>;
  navigateTo(id: string, fromParent?: boolean): void;
}

interface IPageCollab {
  name: string,

  noteIds: string[],
  arrowIds: string[],

  nextZIndex: number
}

interface IPageRef {
  id: string
  name: string
}




export const init = <T>({ $app, $axios }: Context) => 
new class implements IAppPage {
  id!: string
  
  collab!: IPageCollab

  notes!: INote[]
  arrows!: any[]

  parentId: Nullable<string>




  constructor() {
    $static.vue.ref(this, 'page.id')
  
  
  
  
    $static.vue.computed(this, 'collab', () => $app.collab.store?.page)
  
  
  
  
    $static.vue.computed(this, 'notes', () =>
      $app.page.collab?.noteIds.map(noteId => $app.elems.map[noteId]))
    $static.vue.computed(this, 'arrows', () =>
      $app.page.collab?.arrowIds.map(arrowId => $app.elems.map[arrowId]))
  }




  reset(id?: string) {
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
    $app.collab.doc.transact(() => {
      $static.vue.merge($app.page.collab, {
        name: pageName,
      
        noteIds: [],
        arrowIds: [],

        nextZIndex: 0,
      } as IPageCollab)
    })
  }




  async create(name: string) {
    const id = (await $axios.post('/api/page/create', { name })).data

    $app.page.navigateTo(id, true)

    return id
  }




  navigateTo(id: string, fromParent?: boolean) {
    $app.page.parentId = fromParent ? $app.page.id : null

    $nuxt.$router.push({ path: `/${id}` })
  }
} as Exact<IAppPage, T>