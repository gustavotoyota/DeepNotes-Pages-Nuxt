import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IElem } from "../elems/elems";
import { INote } from "./notes";




export type {
  IAppEditing,
}




interface IAppEditing {
  active: boolean
  section: string

  reset(): void;
  start(note: INote, section: string): void;
  stop(): void;
}




export const init = <T>({ $app }: Context) => 
new class implements IAppEditing {
  active: boolean = false;
  section: string = '';




  constructor() {
    $static.vue.ref(this, 'editing.active')
  }




  reset() {
    $app.editing.active = false
  }




  start(note: INote, section: string) {
    if (note.editing)
      return

    if (note.collab.readOnly)
      return



    $app.selection.clear()
    $app.activeElem.set(note as IElem)



    $app.editing.section = section
    $app.editing.active = true
  }



  
  stop() {
    $app.editing.active = false
  }
} as Exact<IAppEditing, T>