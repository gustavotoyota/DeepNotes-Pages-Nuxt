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
  
        for (const noteId of Object.keys($app.selection.noteSet)) {
          Vue.delete($app.elems.map, noteId)
  
          $static.utils.removeFromArray($app.activeRegion.noteIds, noteId)
          Vue.delete($app.collab.store.notes, noteId)
        }
  
        $app.selection.clear()
      })
    }
  }
}