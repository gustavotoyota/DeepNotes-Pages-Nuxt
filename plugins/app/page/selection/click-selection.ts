import { Context } from "@nuxt/types"
import { AppPage } from "../page"
import { Elem } from "../elems/elems"
import { Note } from "../notes/notes"




export class AppClickSelection {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  perform(elem: Elem, event: PointerEvent) {
    // Container shift-selection
  
    if (elem.parentId != null
    && event.shiftKey && this.page.activeElem.exists) {
      const fromIndex = (this.page.activeElem.get as Note).index
      const toIndex = (elem as Note).index
  
      const step = Math.sign(toIndex - fromIndex)
  
      for (let i = fromIndex; i !== toIndex; i += step)
        this.page.selection.add(this.page.activeRegion.notes[i])
    }




    // Clear selection if not holding Ctrl or Shift
    // And the clicked element is not selected

    if (!event.ctrlKey && !event.shiftKey && !elem.selected)
      this.page.selection.clear(elem.parentId)



    
    // Remove element if selected and holding Ctrl
    // Else, just change the active element

    if (event.ctrlKey && elem.selected)
      this.page.selection.remove(elem)
    else
      this.page.activeElem.set(elem)
  }
}