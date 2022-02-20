import { Context } from "@nuxt/types"
import Vue from "vue"
import { Note } from "./notes"




export {
  AppDropping,
}




class AppDropping {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  perform(event: PointerEvent, regionNote: Note, dropIndex: number) {
    this.ctx.$app.collab.doc.transact(() => {
      this.ctx.$app.dragging.finish(event)

      for (const selectedNote of this.ctx.$app.selection.notes) {
        selectedNote.removeFromRegion()
        regionNote.collab.childIds.splice(dropIndex++, 0, selectedNote.id)

        selectedNote.parentId = regionNote.id

        this.ctx.$app.selection.add(selectedNote)
      }

      Vue.nextTick(() => {
        const lastSelectedNote = this.ctx.$app.selection.notes.at(-1) as Note
        
        lastSelectedNote.scrollIntoView()
      })
    })
  }
}