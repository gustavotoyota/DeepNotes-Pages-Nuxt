import { reactive, watch } from "@nuxtjs/composition-api"
import { getYjsValue, SyncedArray, SyncedMap } from "@syncedstore/core"
import { cloneDeep, pull } from "lodash"
import Vue from "vue"
import { z } from "zod"
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
  start: IArrowEndpoint.default(IArrowEndpoint.parse({})),
  end: IArrowEndpoint.default(IArrowEndpoint.parse({})),
})
export type IArrowCollab = z.infer<typeof IArrowCollab>




export class Arrow extends Elem {
  collab!: IArrowCollab




  startPos!: Vec2
  endPos!: Vec2




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



    
    $static.vue.computed(this, 'arrow.startPos', () => 
      this.getEndpointWorldPos(this.collab.start))
    $static.vue.computed(this, 'arrow.endPos', () => 
      this.getEndpointWorldPos(this.collab.end))



    
    if (options.addToMap === false)
      return




    $static.vue.computed(this, 'arrow.siblingIds', () =>
      this.page.regions.getArrowIds(this.parent))



    
    watch(() => this.collab.start.noteId, (newValue, oldValue) => {
      if (newValue == null) {
        if (typeof oldValue == 'string')
          pull(this.page.notes.fromId(oldValue).outgoingArrows, this)
      } else
        this.page.notes.fromId(newValue).outgoingArrows.push(this)
    }, { immediate: true })
    watch(() => this.collab.end.noteId, (newValue, oldValue) => {
      if (newValue == null) {
        if (typeof oldValue == 'string')
          pull(this.page.notes.fromId(oldValue).incomingArrows, this)
      } else
        this.page.notes.fromId(newValue).incomingArrows.push(this)
    }, { immediate: true })
  }




  getEndpointWorldPos(endpoint: IArrowEndpoint): Vec2 {
    if (endpoint.noteId == null)
      return new Vec2(endpoint.pos)

    const note = this.page.notes.fromId(endpoint.noteId)

    if (note == null)
      return new Vec2(0, 0)

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




  fromIds(arrowIds: string[]): Arrow[] {
    return arrowIds
      .map(arrowId => this.map[arrowId] as Arrow)
      .filter(arrow => arrow != null)
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