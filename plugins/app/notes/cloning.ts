import { Context } from "@nuxt/types"
import Vue from "vue"
import { INoteCollab, Note } from "./notes"
import { v4 as uuidv4 } from 'uuid'
import { Nullable } from "~/types/deep-notes"
import { SyncedText } from "@syncedstore/core"




export {
  AppCloning,
}




class AppCloning {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  clone(notes: Note[], parent: Nullable<Note>, destIndex?: number): string[] {
    const cloneIds: string[] = []



  
    parent = parent ?? notes[0].parent




    for (const note of notes) {
      const clone: Note = this.ctx.$app.notes.create(parent, destIndex)
      
      clone.copy(note)

      clone.collab.pos.x += 8
      clone.collab.pos.y += 8

      this.clone(note.children, clone)

      clone.bringToTop()
      
      cloneIds.push(clone.id)
    }


    

    return cloneIds
  }




  perform() {
    let destIndex = (this.ctx.$app.selection.notes.at(-1)?.index ?? -1) + 1

    const cloneIds = this.clone(this.ctx.$app.selection.notes, null, destIndex)

    this.ctx.$app.selection.set(...this.ctx.$app.notes.fromIds(cloneIds))




    Vue.nextTick(() => {
      const lastSelectedNote = this.ctx.$app.selection.notes.at(-1) as Note
      
      lastSelectedNote.scrollIntoView()
    })
  }
}