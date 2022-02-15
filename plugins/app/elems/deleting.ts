import { Context } from "@nuxt/types"
import { getYjsValue } from "@syncedstore/core"
import Vue from 'vue'
import { Doc } from "yjs"




export type {
  IAppDeleting,
}




interface IAppDeleting {
  perform(event: KeyboardEvent): void;
}




export const init = ({ $app }: Context) => {
  return new class implements IAppDeleting {
    perform() {
      (getYjsValue($app.collab.store) as Doc).transact(() => {
        if (($app.activeElem.id ?? '') in $app.selection.noteIds)
          $app.activeElem.clear()
  
        for (const noteId of Object.keys($app.selection.noteIds)) {
          Vue.delete($app.elems.map, noteId)
  
          $static.utils.removeFromArray($app.activeRegion.noteIds, noteId)
          Vue.delete($app.collab.store.notes, noteId)
        }
  
        $app.selection.clear()
      })
    }
  }
}