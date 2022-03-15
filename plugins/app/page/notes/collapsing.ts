import { Context } from "@nuxt/types"
import { AppPage } from "../page"
import { Note } from "./notes"




export class AppCollapsing {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  expand(note: Note) {
    this.page.collab.doc.transact(() => {
      if (note.collab.localCollapsing)
        note.locallyCollapsed = false
      else
        note.collab.collapsed = false
      
      note.bringToTop()
    })

    this.page.undoRedo.resetCapturing()
  }
  collapse(note: Note) {
    this.page.collab.doc.transact(() => {
      if (note.collab.localCollapsing)
        note.locallyCollapsed = true
      else
        note.collab.collapsed = true
      
      note.bringToTop()
    })
    
    this.page.undoRedo.resetCapturing()
  }



  set(note: Note, collapsed: boolean) {
    if (collapsed === note.collapsed)
      return
  
    if (collapsed)
      this.collapse(note)
    else
      this.expand(note)
  }



  toggle(note: Note) {
    this.set(note, !note.collapsed)
  }
}