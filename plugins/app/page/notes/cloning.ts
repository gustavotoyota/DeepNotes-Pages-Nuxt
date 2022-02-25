import { Context } from "@nuxt/types"
import { cloneDeep, pull } from "lodash"
import Vue from "vue"
import { Nullable } from "~/types/deep-notes"
import { AppPage } from "../page"
import { INoteCollab, Note } from "./notes"




export {
  AppCloning,
}




class AppCloning {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  private _performAux(notes: Note[]): string[] {
    const cloneIds = []



  
    parent = parent ?? notes[0].parent




    for (const note of notes) {
      // Create overrides

      const collabOverrides = {} as Partial<INoteCollab>

      collabOverrides.title = $static.syncedStore.cloneText(note.collab.title)
      collabOverrides.body = $static.syncedStore.cloneText(note.collab.body)

      const collabKeys = Object.keys(note.collab)
      pull(collabKeys, 'title', 'body', 'childIds', 'zIndex', 'dragging')
      for (const collabKey of collabKeys)
        collabOverrides[collabKey] = cloneDeep(note.collab[collabKey])

      collabOverrides.childIds = this._performAux(note.children)




      // Create clone

      const cloneId = this.page.notes.create(collabOverrides)
      
      cloneIds.push(cloneId)
    }


    

    return cloneIds
  }
  perform() {
    const cloneIds = this._performAux(this.page.selection.notes)
    
    let destIndex = (this.page.selection.notes.at(-1)?.index ?? -1) + 1
    this.page.activeRegion.noteIds.splice(destIndex, 0, ...cloneIds)




    const clones = this.page.notes.fromIds(cloneIds)

    this.page.selection.set(...clones)

    this.page.collab.doc.transact(() => {
      for (const clone of clones) {
        clone.collab.pos.x += 8
        clone.collab.pos.y += 8
      }
    })




    Vue.nextTick(() => {
      const lastSelectedNote = this.page.selection.notes.at(-1) as Note
      
      lastSelectedNote.scrollIntoView()
    })
  }
}