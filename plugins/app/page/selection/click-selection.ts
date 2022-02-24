import { Context } from "@nuxt/types"
import { AppPage } from "../page"
import { Elem } from "../elems/elems"




export {
  AppClickSelection,
}




class AppClickSelection {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  perform(elem: Elem, event: PointerEvent) {
    // Clear selection if not holding Ctrl or Shift
    // And the clicked element is not selected

    if (!event.ctrlKey && !event.shiftKey && !this.page.selection.has(elem))
      this.page.selection.clear(elem.parentId)



    
    // Remove element if selected and holding Ctrl
    // Else, just change the active element

    if (event.ctrlKey && this.page.selection.has(elem))
      this.page.selection.remove(elem)
    else
      this.page.activeElem.set(elem)
  }
}