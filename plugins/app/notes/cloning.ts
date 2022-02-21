import { Context } from "@nuxt/types"
import Vue from "vue"
import { INoteCollab, Note } from "./notes"
import { v4 as uuidv4 } from 'uuid'
import { Nullable } from "~/types/deep-notes"




export {
  AppCloning,
}




class AppCloning {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  clone(notes: Note[], parentId?: Nullable<string>): Note[] {
    const clones = []



    
    parentId = parentId ?? notes[0].parentId




    for (const note of notes) {
      // Clone note

      const clone = new Note(this.ctx, { parentId })

      clones.push(clone)




      // Clone collab data

      const collabClone: INoteCollab = this.ctx.$app.collab.clone(note.collab)

      collabClone.pos.x += 8
      collabClone.pos.y += 8

      collabClone.zIndex++

      collabClone.childIds.splice(0, collabClone.childIds.length,
        ...this.ctx.$app.notes.toIds(this.clone(note.children, clone.id)))

      Vue.set(this.ctx.$app.notes.collab, clone.id, collabClone)
    }


    

    return clones
  }




  perform() {
    const clones = this.clone(this.ctx.$app.selection.notes)
    const cloneIds = this.ctx.$app.notes.toIds(clones)

    let destIdx = (this.ctx.$app.selection.notes.at(-1)?.index ?? -1) + 1
    this.ctx.$app.activeRegion.noteIds.splice(destIdx, 0, ...cloneIds)




    this.ctx.$app.selection.set(...clones)




    Vue.nextTick(() => {
      const lastSelectedNote = this.ctx.$app.selection.notes.at(-1) as Note
      
      lastSelectedNote.scrollIntoView()
    })
  }
}