import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IElem } from "../elems/elems"
import { INote } from "./notes"




export type {
  IAppDropping,
}




interface IAppDropping {
  perform(event: PointerEvent, regionNote: INote, dropIndex: number): void;
}




export const init = <T>({ $app }: Context) =>
new class implements IAppDropping {
  perform(event: PointerEvent, regionNote: INote, dropIndex: number) {
    $app.dragging.finish(event)

    for (const selectedNote of $app.selection.notes) {
      $static.utils.removeFromArray(selectedNote.siblingIds, selectedNote.id)

      regionNote.collab.childIds.splice(dropIndex, 0, selectedNote.id)

      selectedNote.parentId = regionNote.id

      $app.selection.add(selectedNote)
    }
  }
} as Exact<IAppDropping, T>