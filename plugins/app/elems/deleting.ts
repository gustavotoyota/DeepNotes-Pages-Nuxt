import { Context } from "@nuxt/types"
import Vue from 'vue'




export type {
  IAppDeleting,
}




interface IAppDeleting {
  perform(event: KeyboardEvent): void;
}




export const init = ({ $app }: Context) => {
  return new class implements IAppDeleting {
    perform() {
      $app.collab.doc.transact(() => {
        if (($app.activeElem.id ?? '') in $app.selection.noteSet)
          $app.activeElem.clear()
  
        for (const note of $app.selection.notes) {
          Vue.delete($app.elems.map, note.id)
  
          note.removeFromRegion()
          Vue.delete($app.collab.store.notes, note.id)
        }
  
        $app.selection.clear()
      })
    }
  }
}