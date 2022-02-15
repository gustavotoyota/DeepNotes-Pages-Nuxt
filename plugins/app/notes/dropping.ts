import { Context } from "@nuxt/types"
import { Exact } from "~/types/deep-notes"




export type {
  IAppDropping,
}




interface IAppDropping {
  perform(event, activeRegionElem, dropIndex): void;
}




export const init = <T>({ $app }: Context) =>
new class implements IAppDropping {
  perform(event, activeRegionElem, dropIndex) {
  }
} as Exact<IAppDropping, T>