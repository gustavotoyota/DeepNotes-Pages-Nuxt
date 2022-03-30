import { Context } from "@nuxt/types";
import { Nullable } from "~/types/deep-notes";
import { AppPage } from "./page";
import { Note } from "./notes/notes";




export class AppRegions {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  getNoteIds(regionParent: Nullable<Note>) {
    if (regionParent == null)
      return this.page.data.collab.noteIds
    else
      return regionParent.collab.noteIds
  }
  getNotes(regionParent: Nullable<Note>) {
    if (regionParent == null)
      return this.page.data.notes
    else
      return regionParent.notes
  }
}