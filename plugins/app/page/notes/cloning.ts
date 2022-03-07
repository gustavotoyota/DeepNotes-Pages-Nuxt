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
    // Determine destination index

    let destIndex
    
    if (this.page.selection.notes.length > 0)
      destIndex = this.page.selection.notes.at(-1)!.index + 1
    else
      destIndex = this.page.activeRegion.notes.length



    
    // Insert clones into structure

    const cloneIds = this._performAux(this.page.selection.notes)

    this.page.activeRegion.noteIds.splice(destIndex, 0, ...cloneIds)




    // Select and reposition clones

    const clones = this.page.notes.fromIds(cloneIds)

    this.page.selection.set(...clones)

    if (this.page.activeRegion.id == null) {
      this.page.collab.doc.transact(() => {
        for (const clone of clones) {
          clone.collab.pos.x += 8
          clone.collab.pos.y += 8
        }
      })
    }



    
    // Reset undo-redo capturing
    
    this.page.undoRedo.resetCapturing()




    // Scroll into view

    Vue.nextTick(() => {
      const lastSelectedNote = this.page.selection.notes.at(-1) as Note
      
      lastSelectedNote.scrollIntoView()
    })
  }
}