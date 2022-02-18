import Vue from 'vue';
import type { App } from '~/plugins/app/app'
import type { Static } from '~/plugins/static/static'
import { Context } from '@nuxt/types';




export type {
  IVec2,

  Exact,
  Nullable,
}




type Nullable<T> = T | undefined | null;

type Exact<T, Shape = T> = T extends Shape ?
  (Exclude<keyof T, keyof Shape> extends never ?
    T : never): never;

interface IVec2 {
  x: number;
  y: number;
}

declare module '@nuxt/types' {
  interface Context {
    $app: App;
  }
}

declare module 'vue/types/vue' {
  // 3. Declare a ampliação para Vue
  interface Vue {
    $ctx: Context
    $app: App;
  }
}

declare global {
  var $static: Static
  var $nuxt: Vue
  var clipboardData: any
  var hljs: any
}