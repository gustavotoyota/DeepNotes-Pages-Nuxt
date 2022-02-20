import { Context } from "@nuxt/types"
import { Exact, Nullable } from "~/types/deep-notes"
import { INote } from "../notes/notes";




export {
  AppActiveRegion,
}




class AppActiveRegion {
  ctx: Context

  id: Nullable<string>
  parent: Nullable<INote>
  noteIds!: string[]
  notes!: INote[]




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ref(this, 'activeRegion.id')




    $static.vue.computed(this, 'parent', () => {
      return this.ctx.$app.elems.map[this.ctx.$app.activeRegion.id ?? ''] ?? null
    })




    $static.vue.computed(this, 'noteIds', () => {
      if (this.ctx.$app.activeRegion.id == null)
        return this.ctx.$app.page.collab.noteIds
      else
        return this.ctx.$app.notes.collab[this.ctx.$app.activeRegion.id].childIds
    })
    $static.vue.computed(this, 'notes', () => {
      const notes = []

      for (const noteId of this.ctx.$app.activeRegion.noteIds) {
        const note = this.ctx.$app.elems.map[noteId]
        if (note)
          notes.push(note)
      }

      return notes
    })
  }




  reset() {
    this.ctx.$app.activeRegion.id = null
  }
}