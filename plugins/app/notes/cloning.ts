import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"




interface IAppCloning {
  perform(elem, event): void;
}

export type {
  IAppCloning,
}




export const init = <T>({ $app }: Context) =>
new class implements IAppCloning {
  perform(elem, event) {
  }
} as Exact<IAppCloning, T>