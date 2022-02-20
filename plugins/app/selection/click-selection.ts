import { Context } from "@nuxt/types"
import { Elem } from "../elems/elems"




export {
  AppClickSelection,
}




class AppClickSelection {
  ctx: Context




  constructor(ctx: Context) {
    this.ctx = ctx
  }




  perform(elem: Elem, event: PointerEvent) {
    // Clear selection if not holding Ctrl or Shift
    // And the clicked element is not selected

    if (!event.ctrlKey && !event.shiftKey && !this.ctx.$app.selection.has(elem))
      this.ctx.$app.selection.clear(elem.parentId)



    
    // Remove element if selected and holding Ctrl
    // Else, just change the active element

    if (event.ctrlKey && this.ctx.$app.selection.has(elem))
      this.ctx.$app.selection.remove(elem)
    else
      this.ctx.$app.activeElem.set(elem)
  }
}