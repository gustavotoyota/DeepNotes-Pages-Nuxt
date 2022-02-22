import { Context } from "@nuxt/types";
import { Elem } from "../elems/elems";
import { Note } from "./notes";




export {
  AppEditing,
};




class AppEditing {
  ctx: Context

  active!: boolean
  section!: string




  constructor(ctx: Context) {
    this.ctx = ctx

    $static.vue.ref(this, 'editing.active')
  }




  reset() {
    this.ctx.$app.editing.active = false
  }




  start(note: Note, section?: string) {
    if (note.editing)
      return

    if (note.collab.readOnly)
      return



    this.ctx.$app.selection.clear()
    this.ctx.$app.activeElem.set(note as Elem)



    this.ctx.$app.editing.section = section ?? note.topSection
    this.ctx.$app.editing.active = true
  }



  
  stop() {
    this.ctx.$app.editing.active = false
  }
}