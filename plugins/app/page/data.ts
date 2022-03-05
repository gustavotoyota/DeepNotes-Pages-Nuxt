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
  
  
  
  
    $static.vue.computed(this, '$app.page.data.collab', () => this.page.collab.store.page)




    $static.vue.ssrRef(this, '$app.page.data.auxName', () => null)
      
    $static.vue.computed(this, '$app.page.data.name', () => {
      if (this.collab.name != null)
        return this.collab.name

      if (this.auxName != null)
        return this.auxName

      const pageRef = this.page.project.pathPages.find(
        item => item.id == this.page.id)

      return pageRef?.name ?? ''
    })
  
  
  
  
    $static.vue.computed(this, '$app.page.data.notes', () =>
      this.page.notes.fromIds(this.collab.noteIds))
    $static.vue.computed(this, '$app.page.data.arrows', () =>
      this.page.arrows.fromIds(this.collab.arrowIds))
  }
}