import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { Note } from "./notes"




export {
  AppCollapsing,
}




class AppCollapsing {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  expand(note: Note) {
    this.ctx.$app.collab.doc.transact(() => {
      note.collab.collapsed = false
      
      note.bringToTop()
    })
  }
  collapse(note: Note) {
    if (!note.collab.collapsible)
      return
    
    this.ctx.$app.collab.doc.transact(() => {
      note.collab.collapsed = true
      
      note.bringToTop()
    })
  }



  set(note: Note, collapsed: boolean) {
    if (collapsed === note.collab.collapsed)
      return
  
    if (collapsed)
      this.ctx.$app.collapsing.collapse(note)
    else
      this.ctx.$app.collapsing.expand(note)
  }



  toggle(note: Note) {
    this.ctx.$app.collapsing.set(note, !note.collab.collapsed)
  }
}