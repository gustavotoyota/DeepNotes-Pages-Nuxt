import { Context } from "@nuxt/types"
import Vue from "vue"
import { INoteCollab, Note } from "./notes"
import { v4 as uuidv4 } from 'uuid'




export {
  AppCloning,
}




class AppCloning {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  perform() {
    const siblingIds = this.ctx.$app.activeRegion.noteIds
    
    let destIdx = (this.ctx.$app.selection.notes.at(-1)?.index ?? -1) + 1

    for (const selectedNote of this.ctx.$app.selection.notes) {
      const clone = new Note(this.ctx, { parentId: selectedNote.parentId })




      const collabClone: INoteCollab = this.ctx.$app.collab.clone(selectedNote.collab)

      collabClone.pos.x += 8
      collabClone.pos.y += 8

      collabClone.zIndex++

      Vue.set(this.ctx.$app.notes.collab, clone.id, collabClone)




      siblingIds.splice(destIdx++, 0, clone.id)




      this.ctx.$app.selection.remove(selectedNote)
      this.ctx.$app.selection.add(clone)
    }
  }
}