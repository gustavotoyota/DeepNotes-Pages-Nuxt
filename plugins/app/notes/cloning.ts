import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IElem } from "../elems/elems"




interface IAppCloning {
  perform(elem: IElem, event: KeyboardEvent): void;
}

export type {
  IAppCloning,
}




export const init = <T>({ $app }: Context) =>
new class implements IAppCloning {
  perform(elem: IElem, event: KeyboardEvent) {
  }
} as Exact<IAppCloning, T>