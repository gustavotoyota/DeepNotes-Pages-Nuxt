import { Context } from "@nuxt/types"
import { Exact, IVec2, Nullable } from "~/types/deep-notes"
import { IElem } from "../elems/elems"




export type {
  IArrow,
  IArrowCollab,
}




interface IArrow extends IElem {
}

interface IArrowCollab {

}




export const init = <T>({ $app }: Context) =>
new class implements IArrow {
  id!: string
  type!: string
  parentId?: string | undefined
} as Exact<IArrow, T>