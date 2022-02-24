import { Context } from '@nuxt/types'
import { Nullable } from "~/types/deep-notes"
import { AppPage } from './page'
import { Note } from './notes/notes'




export {
  AppPageData,
  IPageCollab,
  IPageRef,
}




class AppPageData {
  page: AppPage
  
  collab!: IPageCollab

  notes!: Note[]
  arrows!: any[]




  constructor(page: AppPage, id?: string) {
    this.page = page
  
  
  
  
    $static.vue.computed(this, 'collab', () => this.page.collab.store.page)
  
  
  
  
    $static.vue.computed(this, 'notes', () =>
      this.collab?.noteIds
        .map(noteId => this.page.elems.map[noteId])
        .filter(note => note != null))
    $static.vue.computed(this, 'arrows', () =>
      this.collab?.arrowIds
        .map(arrowId => this.page.elems.map[arrowId])
        .filter(arrow => arrow != null))
  }




  resetCollab(pageName: string) {
    this.page.collab.doc.transact(() => {
      $static.vue.merge(this.collab, {
        name: pageName,
      
        noteIds: [],
        arrowIds: [],

        nextZIndex: 0,
      } as IPageCollab)
    })
  }




  async create(name: string) {
    const id = (await this.page.ctx.$axios.post('/api/page/create', { name })).data

    this.navigateTo(id, true)

    return id
  }




  navigateTo(id: string, fromParent?: boolean) {
    this.page.ctx.$app.parentPageId = fromParent ? this.page.id : null

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