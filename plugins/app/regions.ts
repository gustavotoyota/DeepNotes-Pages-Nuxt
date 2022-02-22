import { Context } from "@nuxt/types";
import { Nullable } from "~/types/deep-notes";
import { Note } from "./notes/notes";




export {
  AppRegions
};




class AppRegions {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  getNoteIds(regionParent: Nullable<Note>) {
    if (regionParent == null)
      return this.ctx.$app.page.collab.noteIds
    else
      return regionParent.collab.childIds
  }
  getNotes(regionParent: Nullable<Note>) {
    if (regionParent == null)
      return this.ctx.$app.page.notes
    else
      return regionParent.children
  }
}