import { Context } from "@nuxt/types";
import { AppPage } from "../page";
import { Elem } from "../elems/elems";
import { Note } from "./notes";
import { Nullable } from "~/types/deep-notes";
import Quill from "quill";
import { nextTick } from "@nuxtjs/composition-api";




export class AppEditing {
  page: AppPage

  note!: Nullable<Note>

  active!: boolean




  constructor(page: AppPage) {
    this.page = page

    $static.vue.ssrRef(this, '$app.page.editing.note', () => null)

    $static.vue.computed(this, '$app.page.editing.active', () => this.note != null)
  }




  start(note: Note, section?: string) {
    if (note.editing)
      return

    if (note.collab.readOnly)
      return




    this.note = note
    note.editing = true

    this.page.selection.set(note as Elem)




    // Setup Quill

    nextTick(() => {
      for (const section of ['title', 'body']) {
        const quill = note[`${section}Quill`] as Quill
        if (quill == null)
          continue

        quill.enable(true)
        // @ts-ignore
        quill.history.clear()
      }




      section = section ?? note.topSection
      const quill = note[`${section}Quill`] as Quill
  
      quill.focus()
      quill.setSelection(0, 0)
      quill.setSelection(0, Infinity, 'user')
    })
  }



  
  stop() {
    if (this.note == null)
      return




    for (const section of ['title', 'body']) {
      const quill = this.note[`${section}Quill`] as Quill
      if (quill == null)
        continue

      quill.enable(false)
      // @ts-ignore
      quill.setSelection(null)
      // @ts-ignore
      quill.theme.tooltip.hide()
    }


      
    
    this.note.editing = false
    this.note = null



    
    // Reset undo-redo capturing
    
    this.page.undoRedo.resetCapturing()
  }
}