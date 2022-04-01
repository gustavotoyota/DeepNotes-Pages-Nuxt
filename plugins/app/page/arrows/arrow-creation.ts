import { reactive } from "@nuxtjs/composition-api";
import { Note } from "../notes/notes";
import { AppPage } from "../page";
import { Arrow, IArrowCollab, IArrowEndpoint } from "./arrows";




export class AppArrowCreation {
  page: AppPage;




  active!: boolean

  arrow: Arrow




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ssrRef(this, '$app.page.arrows.active', () => false)



    
    this.arrow = new Arrow(this.page, { addToMap: false })
    this.arrow.collab = reactive(IArrowCollab.parse({}))
  }




  start(note: Note, event: PointerEvent) {
    this.active = true

    this.arrow.collab.start = {
      noteId: note.id,
      pos: { x: 0, y: 0 },
    }
    this.arrow.collab.end = {
      noteId: null,
      pos: this.page.pos.getWorldPos(event),
    }

    


    $static.utils.listenPointerEvents(event, {
      move: this._update,
      up: this._finish,
    })
  }



  
  private _update = function (this: AppArrowCreation, event: PointerEvent) {
    this.arrow.collab.end = {
      noteId: null,
      pos: this.page.pos.getWorldPos(event),
    }
  }.bind(this)



  
  private _finish = function (this: AppArrowCreation, event: PointerEvent) {
    this.active = false
  }.bind(this)
}