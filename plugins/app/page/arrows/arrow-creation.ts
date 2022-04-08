import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from 'uuid';
import Vue from "vue";
import { Vec2 } from "~/plugins/static/vec2";
import { Note } from "../notes/notes";
import { AppPage } from "../page";
import { Arrow, IArrowEndpoint } from "./arrows";




export class AppArrowCreation {
  page: AppPage;




  active!: boolean

  arrow: Arrow




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ssrRef(this, '$app.page.arrows.active', () => false)



    
    this.arrow = new Arrow(this.page, { addToMap: false })
  }




  start(start: IArrowEndpoint, event: PointerEvent) {
    this.active = true

    this.arrow.collab.start = {
      noteId: start.noteId,
      pos: new Vec2(start.pos),
    }
    this.arrow.collab.end = {
      noteId: null,
      pos: this.page.pos.getWorldPos(event),
    }

    


    $static.utils.listenPointerEvents(event, {
      move: this._update,
      up: this.finish,
    })
  }



  
  private _update = function (this: AppArrowCreation, event: PointerEvent) {
    this.arrow.collab.end = {
      noteId: null,
      pos: this.page.pos.getWorldPos(event),
    }
  }.bind(this)



  
  finish = function (this: AppArrowCreation, event: PointerEvent, note?: Note) {
    if (!this.active)
      return


      

    this.active = false


    
    
    const arrowId = uuidv4()

    this.arrow.collab.end.noteId = note?.id ?? null

    Vue.set(this.page.arrows.collab, arrowId, cloneDeep(this.arrow.collab))

    this.page.data.collab.arrowIds.push(arrowId)

    this.page.selection.set(this.page.arrows.fromId(arrowId))
  }.bind(this)
}