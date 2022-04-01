import { Note } from "../notes/notes";
import { AppPage } from "../page";
import { IArrowEndpoint as IArrowPoint } from "./arrows";




export class AppArrowCreation {
  page: AppPage;




  creating!: boolean
  startPoint!: IArrowPoint
  endPoint!: IArrowPoint




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ssrRef(this, '$app.page.arrows.creating', () => false)
    $static.vue.ssrRef(this, '$app.page.arrows.startPoint', () => null)
    $static.vue.ssrRef(this, '$app.page.arrows.endPoint', () => null)
  }




  start(note: Note, event: PointerEvent) {
    this.startPoint = {
      noteId: null,
      pos: { x: 0, y: 0 },
    }
  }
}