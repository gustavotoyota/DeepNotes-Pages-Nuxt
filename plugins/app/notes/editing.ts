import { Context } from "@nuxt/types"
import { IElem } from "../elems/elems";
import { INote } from "./notes";




export {
  AppEditing,
}




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




  start(note: INote, section: string) {
    if (note.editing)
      return

    if (note.collab.readOnly)
      return



    this.ctx.$app.selection.clear()
    this.ctx.$app.activeElem.set(note as IElem)



    this.ctx.$app.editing.section = section
    this.ctx.$app.editing.active = true
  }



  
  stop() {
    this.ctx.$app.editing.active = false
  }
}