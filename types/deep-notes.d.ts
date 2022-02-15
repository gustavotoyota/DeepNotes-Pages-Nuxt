import Vue from 'vue';
import type { IApp } from '~/plugins/app/app'
import { IElem } from '~/plugins/app/elems/elems';
import type { Static } from '~/plugins/static/static'




export type {
  IArrow,

  $static,
  clipboardData,
  
  IVec2,
  IRect,

  Exact,
}





interface IArrow extends IElem {
}




type Exact<T, Shape = T> = T extends Shape ?
  (Exclude<keyof T, keyof Shape> extends never ?
    T : never): never;

interface IVec2 {
  x: number;
  y: number;
}

interface IRect {
  start: { x: number, y: number }
  end: { x: number, y: number }
  size: { x: number, y: number }
}

declare module '@nuxt/types' {
  interface Context {
    $app: IApp;
  }
}

declare global {
  var $static: Static
  var $nuxt: Vue
  var clipboardData: any
}