import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"




interface IAppCollapsing {
  expand(note): void;
  collapse(note): void;
  set(note, collapsed): void;
  toggle(note): void;
}

export type {
  IAppCollapsing,
}




export const init = <T>({ $app }: Context) => 
new class implements IAppCollapsing {
  expand(note) {
    note.collab.collapsed = false
    
    $app.notes.bringToTop(note)
  }
  collapse(note) {
    if (!note.collab.collapsible)
      return
  
    note.collab.collapsed = true
    
    $app.notes.bringToTop(note)
  }



  set(note, collapsed) {
    if (collapsed === note.collab.collapsed)
      return
  
    if (collapsed)
      $app.collapsing.collapse(note)
    else
      $app.collapsing.expand(note)
  }



  toggle(note) {
    $app.collapsing.set(note, !note.collab.collapsed)
  }
} as Exact<IAppCollapsing, T>