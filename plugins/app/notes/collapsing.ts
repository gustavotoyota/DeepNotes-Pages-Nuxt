import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { INote } from "./notes"




export {
  AppCollapsing,
}




class AppCollapsing {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  expand(note: INote) {
    note.collab.collapsed = false
    
    note.bringToTop()
  }
  collapse(note: INote) {
    if (!note.collab.collapsible)
      return
  
    note.collab.collapsed = true
    
    note.bringToTop()
  }



  set(note: INote, collapsed: boolean) {
    if (collapsed === note.collab.collapsed)
      return
  
    if (collapsed)
      this.ctx.$app.collapsing.collapse(note)
    else
      this.ctx.$app.collapsing.expand(note)
  }



  toggle(note: INote) {
    this.ctx.$app.collapsing.set(note, !note.collab.collapsed)
  }
}