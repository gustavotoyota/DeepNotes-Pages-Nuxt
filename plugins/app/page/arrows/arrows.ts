import { getYjsValue, SyncedArray, SyncedMap } from "@syncedstore/core"
import Vue from "vue"
import { z } from "zod"
import { IVec2 } from "~/plugins/static/types"
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




  startPos!: IVec2
  endPos!: IVec2



  
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




    this.collab = this.page.arrows.collab[this.id]




    $static.vue.computed(this, 'startPos', () => 
      this.getEndpointWorldPos(this.collab.start))
    $static.vue.computed(this, 'endPos', () => 
      this.getEndpointWorldPos(this.collab.end))
  }




  getEndpointWorldPos(endpoint: IArrowEndpoint): IVec2 {
    if (endpoint.noteId == null)
      return endpoint.pos

    const note = this.page.notes.fromId(endpoint.noteId)

    return note.worldCenter
  }




  getClientRect() {
    const node = document.getElementById(`arrow-${this.id}`)!

    const domClientRect = node.getBoundingClientRect()
  
    return this.page.rects.fromDOM(domClientRect)
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
      for (const [noteId, change] of event.changes.keys) {
        if (change.action !== 'delete')
          continue

        Vue.delete(this.map, noteId)
      }
    })
  }
}