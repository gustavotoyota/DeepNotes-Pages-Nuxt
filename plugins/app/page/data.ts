import { Context } from '@nuxt/types'
import { Nullable } from "~/types/deep-notes"
import { AppPage, IPageCollab } from './page'
import { Note } from './notes/notes'




export {
  AppPageData,
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
        .map(noteId => this.page.notes.map[noteId])
        .filter(note => note != null))
    $static.vue.computed(this, 'arrows', () =>
      this.collab?.arrowIds
        .map(arrowId => this.page.arrows.map[arrowId])
        .filter(arrow => arrow != null))
  }
}