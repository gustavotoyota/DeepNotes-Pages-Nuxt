import { getYjsValue } from "@syncedstore/core"
import Vue from 'vue'

export const init = ({ $app }) => {
  const deleting = $app.deleting = {}




  deleting.perform = () => {
    getYjsValue($app.collab.store).transact(() => {
      for (const noteId of Object.keys($app.selection.noteIds)) {
        Vue.delete($app.elems.map, noteId)

        $static.utils.removeFromArray($app.activeRegion.noteIds, noteId)
        Vue.delete($app.collab.store.notes, noteId)
      }
    })
  }
}