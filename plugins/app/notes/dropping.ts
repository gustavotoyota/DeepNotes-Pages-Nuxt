import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IElem } from "../elems/elems"
import { INote } from "./notes"




export type {
  IAppDropping,
}




interface IAppDropping {
  perform(event: PointerEvent, regionNote: INote, dropIndex: number): void;
}




export const init = <T>({ $app }: Context) =>
new class implements IAppDropping {
  perform(event: PointerEvent, regionNote: INote, dropIndex: number) {
  }
} as Exact<IAppDropping, T>