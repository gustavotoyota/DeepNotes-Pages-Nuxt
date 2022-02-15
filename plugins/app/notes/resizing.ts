import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"
import { IElem } from "../elems/elems"




export type {
  IAppResizing,
}




interface IAppResizing {
  reset(): void;
  start(event: MouseEvent, elem: IElem, side: string, section: string): void;
  update(event: MouseEvent): void;
  finish(event: MouseEvent): void;
}




export const init = <T>({ $app }: Context) =>
new class implements IAppResizing {
  reset() {
  }




  start(event: MouseEvent, elem: IElem, side: string, section: string) {
  }




  update(event: MouseEvent) {
  }




  finish(event: MouseEvent) {
  }
} as Exact<IAppResizing, T>