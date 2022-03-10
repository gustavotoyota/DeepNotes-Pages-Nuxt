import Vue from 'vue';
import type { App } from '~/plugins/app/app'
import type { Static } from '~/plugins/static/static'
import { Context } from '@nuxt/types';




export type Nullable<T> = T | null;
export type Nilable<T> = T | null | undefined;
export type Newable<T> = { new (...args: any[]): T }

export type Exact<T, Shape = T> = T extends Shape ?
  (Exclude<keyof T, keyof Shape> extends never ?
    T : never): never;

export interface IVec2 {
  x: number;
  y: number;
}

declare module '@nuxt/types' {
  interface Context {
    $ctx: Context
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