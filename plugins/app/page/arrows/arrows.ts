import { z } from "zod"
import { IVec2 } from "~/plugins/static/types"
import { Elem, ElemType } from "../elems/elems"
import { AppPage } from "../page"




export const IArrowEndpoint = z.object({
  noteId: z.string().nullable(),
  pos: IVec2,
})
export type IArrowEndpoint = z.infer<typeof IArrowEndpoint>




export class Arrow extends Elem {
  constructor(page: AppPage, id?: string) {
    super(page, { id, type: ElemType.ARROW })
  }
}




export const IArrowCollab = z.object({
  start: IArrowEndpoint,
  end: IArrowEndpoint,
})
export type IArrowCollab = z.infer<typeof IArrowCollab>




export class AppArrows {
  page: AppPage




  map!: { [key: string]: Arrow }




  constructor(page: AppPage) {
    this.page = page




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
}