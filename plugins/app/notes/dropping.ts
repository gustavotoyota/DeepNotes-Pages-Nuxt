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
    this.ctx.$app.dragging.finish(event)
    



    const selectedNotes = this.ctx.$app.selection.notes.splice(0).reverse()

    for (const selectedNote of selectedNotes) {
      selectedNote.removeFromRegion()

      regionNote.collab.childIds.splice(dropIndex, 0, selectedNote.id)
      selectedNote.parentId = regionNote.id
    }

    this.ctx.$app.activeRegion.id = regionNote.id




    Vue.nextTick(() => {
      const lastSelectedNote = this.ctx.$app.selection.notes.at(-1) as Note
      
      lastSelectedNote.scrollIntoView()
    })
  }
}