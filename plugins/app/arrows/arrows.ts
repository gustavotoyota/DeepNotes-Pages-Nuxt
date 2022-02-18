import { Context } from "@nuxt/types"
import { Exact, Nullable } from "~/types/deep-notes"
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
  parentId: Nullable<string>
} as Exact<IArrow, T>