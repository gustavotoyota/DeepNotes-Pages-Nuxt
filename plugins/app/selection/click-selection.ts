import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IElem } from "../elems/elems"




export type {
  IAppClickSelection,
}




interface IAppClickSelection {
  perform(elem: IElem, event: MouseEvent): void
}




export const init = <T>({ $app }: Context) => 
new class implements IAppClickSelection {
  perform(elem: IElem, event: MouseEvent) {
    // Clear selection if not holding Ctrl or Shift
    // And the clicked element is not selected

    if (!event.ctrlKey && !event.shiftKey && !$app.selection.has(elem))
      $app.selection.clear(elem.parentId)



    
    // Remove element if selected and holding Ctrl
    // Else, just change the active element

    if (event.ctrlKey && $app.selection.has(elem))
      $app.selection.remove(elem)
    else
      $app.activeElem.set(elem)
  }
} as Exact<IAppClickSelection, T>