import { Context } from "@nuxt/types";
import { AppPage } from "../page";
import { Elem } from "../elems/elems";
import { Note } from "./notes";
import { Nullable } from "~/types/deep-notes";




export {
  AppEditing,
};




class AppEditing {
  page: AppPage

  note!: Nullable<Note>
  section!: string

  active!: boolean




  constructor(page: AppPage) {
    this.page = page

    $static.vue.ssrRef(this, 'editing.note', () => null)

    $static.vue.computed(this, 'active', () => this.note != null)
  }




  start(note: Note, section?: string) {
    if (note.editing)
      return

    if (note.collab.readOnly)
      return




    this.note = note
    note.editing = true

    this.section = section ?? note.topSection

    this.page.selection.set(note as Elem)
  }



  
  stop() {
    if (this.note == null)
      return


      
    
    this.note.editing = false
    this.note = null
  }
}