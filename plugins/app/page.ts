import { v4 as uuidv4 } from 'uuid'
import { Nullable } from "~/types/deep-notes"
import { Context } from '@nuxt/types'
import { INote } from './notes/notes'




export {
  AppPage,
  IPageCollab,
  IPageRef,
}




class AppPage {
  ctx: Context

  id!: string
  
  collab!: IPageCollab

  notes!: INote[]
  arrows!: any[]

  parentId: Nullable<string>




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ref(this, 'page.id')
  
  
  
  
    $static.vue.computed(this, 'collab', () => this.ctx.$app.collab.store?.page)
  
  
  
  
    $static.vue.computed(this, 'notes', () =>
      this.ctx.$app.page.collab?.noteIds.map(noteId => this.ctx.$app.elems.map[noteId]))
    $static.vue.computed(this, 'arrows', () =>
      this.ctx.$app.page.collab?.arrowIds.map(arrowId => this.ctx.$app.elems.map[arrowId]))
  }




  reset(id?: string) {
    this.ctx.$app.page.id = id ?? uuidv4()




    this.ctx.$app.collab.reset()

    this.ctx.$app.camera.reset()
    this.ctx.$app.panning.reset()

    this.ctx.$app.elems.reset()

    this.ctx.$app.dragging.reset()
    this.ctx.$app.editing.reset()

    this.ctx.$app.activeElem.reset()
    this.ctx.$app.activeRegion.reset()
    this.ctx.$app.boxSelection.reset()
    this.ctx.$app.selection.reset()




    this.ctx.$app.collab.startSync()
  }




  resetCollab(pageName: string) {
    this.ctx.$app.collab.doc.transact(() => {
      $static.vue.merge(this.ctx.$app.page.collab, {
        name: pageName,
      
        noteIds: [],
        arrowIds: [],

        nextZIndex: 0,
      } as IPageCollab)
    })
  }




  async create(name: string) {
    const id = (await this.ctx.$axios.post('/api/page/create', { name })).data

    this.ctx.$app.page.navigateTo(id, true)

    return id
  }




  navigateTo(id: string, fromParent?: boolean) {
    this.ctx.$app.page.parentId = fromParent ? this.ctx.$app.page.id : null

    $nuxt.$router.push({ path: `/${id}` })
  }
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