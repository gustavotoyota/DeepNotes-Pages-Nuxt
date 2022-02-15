import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IElem } from "../elems/elems"




export type {
  IAppDropping,
}




interface IAppDropping {
  perform(event: MouseEvent, activeRegionElem: IElem, dropIndex: number): void;
}




export const init = <T>({ $app }: Context) =>
new class implements IAppDropping {
  perform(event: MouseEvent, activeRegionElem: IElem, dropIndex: number) {
  }
} as Exact<IAppDropping, T>