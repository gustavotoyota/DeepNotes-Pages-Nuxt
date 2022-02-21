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




  clone(notes: Note[], parentId?: Nullable<string>): string[] {
    const cloneIds = []



    
    parentId = parentId ?? notes[0].parentId




    for (const note of notes) {
      const cloneId = uuidv4()

      cloneIds.push(cloneId)




      // Clone collab data

      const collabClone: INoteCollab = this.ctx.$app.collab.clone(note.collab)

      collabClone.pos.x += 8
      collabClone.pos.y += 8

      collabClone.zIndex++

      collabClone.childIds.splice(0, collabClone.childIds.length,
        ...this.clone(note.children, cloneId))

      Vue.set(this.ctx.$app.notes.collab, cloneId, collabClone)
    }


    

    return cloneIds
  }




  perform() {
    const cloneIds = this.clone(this.ctx.$app.selection.notes)

    let destIdx = (this.ctx.$app.selection.notes.at(-1)?.index ?? -1) + 1
    this.ctx.$app.activeRegion.noteIds.splice(destIdx, 0, ...cloneIds)



    
    this.ctx.$app.selection.set(...this.ctx.$app.notes.fromIds(cloneIds))




    Vue.nextTick(() => {
      console.log(this.ctx.$app.notes.fromIds(cloneIds))

      const lastSelectedNote = this.ctx.$app.selection.notes.at(-1) as Note
      
      lastSelectedNote.scrollIntoView()
    })
  }
}