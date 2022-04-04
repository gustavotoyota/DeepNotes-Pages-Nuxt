import { Nullable } from "~/types/deep-notes";
import { Arrow } from "./arrows/arrows";
import { Note } from "./notes/notes";
import { AppPage } from "./page";




export class AppRegions {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  getNoteIds(regionParent: Nullable<Note>): string[] {
    if (regionParent == null)
      return this.page.data.collab.noteIds
    else
      return regionParent.collab.noteIds
  }
  getArrowIds(regionParent: Nullable<Note>): string[] {
    if (regionParent == null)
      return this.page.data.collab.arrowIds
    else
      return regionParent.collab.arrowIds
  }




  getNotes(regionParent: Nullable<Note>): Note[] {
    if (regionParent == null)
      return this.page.data.notes
    else
      return regionParent.notes
  }
  getArrows(regionParent: Nullable<Note>): Arrow[] {
    if (regionParent == null)
      return this.page.data.arrows
    else
      return regionParent.arrows
  }
}