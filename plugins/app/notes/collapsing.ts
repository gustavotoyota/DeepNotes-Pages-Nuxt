import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { INote } from "./notes"




interface IAppCollapsing {
  expand(note: INote): void;
  collapse(note: INote): void;
  set(note: INote, collapsed: boolean): void;
  toggle(note: INote): void;
}

export type {
  IAppCollapsing,
}




export const init = <T>({ $app }: Context) => 
new class implements IAppCollapsing {
  expand(note: INote) {
    note.collab.collapsed = false
    
    $app.notes.bringToTop(note)
  }
  collapse(note: INote) {
    if (!note.collab.collapsible)
      return
  
    note.collab.collapsed = true
    
    $app.notes.bringToTop(note)
  }



  set(note: INote, collapsed: boolean) {
    if (collapsed === note.collab.collapsed)
      return
  
    if (collapsed)
      $app.collapsing.collapse(note)
    else
      $app.collapsing.expand(note)
  }



  toggle(note: INote) {
    $app.collapsing.set(note, !note.collab.collapsed)
  }
} as Exact<IAppCollapsing, T>