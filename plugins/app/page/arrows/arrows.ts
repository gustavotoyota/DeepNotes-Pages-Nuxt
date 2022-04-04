import { nextTick, reactive } from "@nuxtjs/composition-api"
import { getYjsValue, SyncedArray, SyncedMap } from "@syncedstore/core"
import { pull } from "lodash"
import Vue from "vue"
import { z } from "zod"
import { lineRectIntersection } from "~/plugins/static/geometry"
import { Line } from "~/plugins/static/line"
import { IVec2, Vec2 } from "~/plugins/static/vec2"
import { Nullable } from "~/types/deep-notes"
import { Elem, ElemType } from "../elems/elems"
import { AppPage } from "../page"




export const IArrowEndpoint = z.object({
  noteId: z.string().nullable().default(null),
  pos: IVec2.default({ x: 0, y: 0 }),
})
export type IArrowEndpoint = z.infer<typeof IArrowEndpoint>




export const IArrowCollab = z.object({
  start: IArrowEndpoint.default({}),
  end: IArrowEndpoint.default({}),
})
export type IArrowCollab = z.infer<typeof IArrowCollab>




export class Arrow extends Elem {
  collab!: IArrowCollab




  preStartPos!: Vec2
  preEndPos!: Vec2

  startPos!: Vec2
  endPos!: Vec2

  centerPos!: Vec2


  

  siblingIds!: string[]
  siblings!: Arrow[]



  
  constructor(page: AppPage, options: {
    id?: string,
    parentId?: Nullable<string>,
    addToMap?: boolean,
  }) {
    super(page, {
      id: options.id,
      type: ElemType.ARROW,
      addToMap: options.addToMap,
    })




    this.collab = this.page.arrows.collab[this.id] ?? reactive(IArrowCollab.parse({}))



    
    $static.vue.computed(this, 'arrow.preStartPos', () => 
      this.getEndpointWorldPos(this.collab.start))
    $static.vue.computed(this, 'arrow.preEndPos', () => 
      this.getEndpointWorldPos(this.collab.end))



      
    $static.vue.computed(this, 'arrow.startPos', () => {
      if (this.collab.start.noteId == null)
        return this.preStartPos

      const note = this.page.notes.fromId(this.collab.start.noteId)

      if (note == null)
        return this.preStartPos

      return lineRectIntersection(
        new Line(this.preEndPos, this.preStartPos),
        note.worldRect.grow(10)
      ) ?? this.preStartPos
    })
    $static.vue.computed(this, 'arrow.endPos', () => {
      if (this.collab.end.noteId == null)
        return this.preEndPos

      const note = this.page.notes.fromId(this.collab.end.noteId)

      if (note == null)
        return this.preEndPos

      return lineRectIntersection(
        new Line(this.preStartPos, this.preEndPos),
        note.worldRect.grow(10)
      ) ?? this.preEndPos
    })

    $static.vue.computed(this, 'arrow.centerPos', () => 
      this.startPos.lerp(this.endPos, 0.5))



    
    if (options.addToMap === false)
      return




    $static.vue.computed(this, 'arrow.siblingIds', () =>
      this.page.regions.getArrowIds(this.parent))



      
    nextTick(() => {
      if (this.collab.start.noteId != null)
        this.page.notes.fromId(this.collab.start.noteId).outgoingArrows.push(this)
      if (this.collab.end.noteId != null)
        this.page.notes.fromId(this.collab.end.noteId).incomingArrows.push(this)
    })
  }




  getEndpointWorldPos(endpoint: IArrowEndpoint): Vec2 {
    if (endpoint.noteId == null)
      return new Vec2(endpoint.pos)

    const note = this.page.notes.fromId(endpoint.noteId)

    if (note == null)
      return new Vec2(endpoint.pos)

    return note.worldCenter
  }




  getClientRect() {
    const node = document.getElementById(`arrow-${this.id}`)!

    const domClientRect = node.getBoundingClientRect()
  
    return this.page.rects.fromDOM(domClientRect)
  }




  removeFromRegion() {
    Vue.delete(this.siblingIds, this.index)
  }
}




export class AppArrows {
  page: AppPage




  collab!: { [key: string]: IArrowCollab }

  map!: { [key: string]: Arrow }




  constructor(page: AppPage) {
    this.page = page




    $static.vue.computed(this, '$app.page.arrows.collab',
      () => this.page.collab.store.arrows)

    $static.vue.ssrRef(this, '$app.page.arrows.map', () => ({}))




    $static.vue.computed(this, '$app.page.arrows.ids', () => Object.keys(this.map))
    $static.vue.computed(this, '$app.page.arrows.array', () => Object.values(this.map))
  }




  fromId(arrowId: string): Arrow {
    return this.map[arrowId]
  }
  fromIds(arrowIds: string[]): Arrow[] {
    return arrowIds
      .map(arrowId => this.map[arrowId] as Arrow)
      .filter(arrow => arrow != null)
  }



  
  toId(arrow: Arrow): string {
    return arrow.id
  }
  toIds(arrows: Arrow[]): string[] {
    return arrows.map(arrow => arrow.id)
  }




  create(arrowId: string, parentId: Nullable<string>) {
    new Arrow(this.page, {
      id: arrowId,
      parentId: parentId,
    })
  }
  createAndObserveIds(arrowIds: string[], parentId: Nullable<string>) {
    for (const arrowId of arrowIds)
      this.create(arrowId, parentId);

    (getYjsValue(arrowIds) as SyncedArray<string>)
    .observe(event => {
      for (const delta of event.changes.delta) {
        if (delta.insert == null)
          continue

        for (const arrowId of delta.insert)
          this.create(arrowId, parentId)
      }
    })
  }




  observeMap() {
    (getYjsValue(this.collab) as SyncedMap<IArrowCollab>)
    .observe(event => {
      for (const [arrowId, change] of event.changes.keys) {
        if (change.action !== 'delete')
          continue




        const arrow = this.map[arrowId]




        const startNoteId = change.oldValue._map.get('start').content.type._map.get('noteId').content.arr[0]
        
        if (startNoteId != null) {
          const note = this.page.notes.fromId(startNoteId)
          
          if (note != null)
            pull(note.outgoingArrows, arrow)
        }



        
        const endNoteId = change.oldValue._map.get('end').content.type._map.get('noteId').content.arr[0]
        
        if (endNoteId != null) {
          const note = this.page.notes.fromId(endNoteId)

          if (note != null)
            pull(note.incomingArrows, arrow)
        }




        Vue.delete(this.map, arrowId)
      }
    })
  }
}