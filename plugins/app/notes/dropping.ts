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
    for (const selectedNote of $app.selection.notes) {
      $static.utils.removeFromArray(selectedNote.siblingIds, selectedNote.id)

      regionNote.collab.childIds.push(selectedNote.id)

      selectedNote.parentId = regionNote.id
    }
  }
} as Exact<IAppDropping, T>