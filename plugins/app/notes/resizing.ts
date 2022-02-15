import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"




export type {
  IAppResizing,
}




interface IAppResizing {
  reset(): void;
  start(event, elem, side, section): void;
  update(event): void;
  finish(event): void;
}




export const init = <T>({ $app }: Context) =>
new class implements IAppResizing {
  reset() {
  }




  start(event, elem, side, section) {
  }




  update(event) {
  }




  finish(event) {
  }
} as Exact<IAppResizing, T>