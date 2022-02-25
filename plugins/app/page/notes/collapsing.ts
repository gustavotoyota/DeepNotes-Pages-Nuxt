import { Context } from "@nuxt/types"
import { AppPage } from "../page"
import { Note } from "./notes"




export {
  AppCollapsing,
}




class AppCollapsing {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  expand(note: Note) {
    this.page.collab.doc.transact(() => {
      note.collab.collapsed = false
      
      note.bringToTop()
    })
  }
  collapse(note: Note) {
    if (!note.collab.collapsible)
      return
    
    this.page.collab.doc.transact(() => {
      note.collab.collapsed = true
      
      note.bringToTop()
    })
  }



  set(note: Note, collapsed: boolean) {
    if (collapsed === note.collab.collapsed)
      return
  
    if (collapsed)
      this.collapse(note)
    else
      this.expand(note)
  }



  toggle(note: Note) {
    this.set(note, !note.collab.collapsed)
  }
}