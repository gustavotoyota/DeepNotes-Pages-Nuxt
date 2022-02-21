import { Context } from "@nuxt/types"
import Vue from 'vue'




export {
  AppDeleting,
}




class AppDeleting {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  perform() {
    this.ctx.$app.collab.doc.transact(() => {
      if ((this.ctx.$app.activeElem.id ?? '') in this.ctx.$app.selection.noteSet)
        this.ctx.$app.activeElem.clear()

      for (const note of this.ctx.$app.selection.notes) {
        note.removeFromRegion()
        Vue.delete(this.ctx.$app.collab.store.notes, note.id)
      }

      this.ctx.$app.selection.clear()
    })
  }
}