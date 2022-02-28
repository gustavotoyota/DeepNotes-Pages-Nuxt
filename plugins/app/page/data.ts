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

  auxName!: Nullable<string>
  name!: string

  notes!: Note[]
  arrows!: any[]




  constructor(page: AppPage) {
    this.page = page
  
  
  
  
    $static.vue.computed(this, 'collab', () => this.page.collab.store.page)




    $static.vue.ref(this, 'auxName', () => null)
      
    $static.vue.computed(this, 'name', () => {
      if (this.collab.name != null)
        return this.collab.name

      if (this.auxName != null)
        return this.auxName

      const pageRef = this.page.project.pathPages.find(
        item => item.id == this.page.id)

      return pageRef?.name ?? ''
    })
  
  
  
  
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