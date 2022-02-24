import { Context } from "@nuxt/types"
import Vue from "vue"
import { Nullable } from "~/types/deep-notes"
import { AppPage } from "../page"
import { Note } from "./notes"




export {
  AppCloning,
}




class AppCloning {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  clone(notes: Note[], parent: Nullable<Note>, destIndex?: number): string[] {
    const cloneIds: string[] = []



  
    parent = parent ?? notes[0].parent




    for (const note of notes) {
      const clone: Note = this.page.notes.create(parent, destIndex)
      
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
    let destIndex = (this.page.selection.notes.at(-1)?.index ?? -1) + 1

    const cloneIds = this.clone(this.page.selection.notes, null, destIndex)

    this.page.selection.set(...this.page.notes.fromIds(cloneIds))




    Vue.nextTick(() => {
      const lastSelectedNote = this.page.selection.notes.at(-1) as Note
      
      lastSelectedNote.scrollIntoView()
    })
  }
}