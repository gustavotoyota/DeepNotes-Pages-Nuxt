import { Context } from "@nuxt/types";
import { AppPage } from "../page";
import { Elem } from "../elems/elems";
import { Note } from "./notes";




export {
  AppEditing,
};




class AppEditing {
  page: AppPage

  active!: boolean
  section!: string




  constructor(page: AppPage) {
    this.page = page

    $static.vue.ref(this, 'editing.active', () => false)
  }




  start(note: Note, section?: string) {
    if (note.editing)
      return

    if (note.collab.readOnly)
      return



    this.page.selection.clear()
    this.page.activeElem.set(note as Elem)



    this.page.editing.section = section ?? note.topSection
    this.page.editing.active = true
  }



  
  stop() {
    this.page.editing.active = false
  }
}