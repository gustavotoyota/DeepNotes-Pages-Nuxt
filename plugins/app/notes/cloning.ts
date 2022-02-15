import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IElem } from "../elems/elems"




export type {
  IAppCloning,
}




interface IAppCloning {
  perform(elem: IElem, event: KeyboardEvent): void;
}




export const init = <T>({ $app }: Context) =>
new class implements IAppCloning {
  perform(elem: IElem, event: KeyboardEvent) {
  }
} as Exact<IAppCloning, T>