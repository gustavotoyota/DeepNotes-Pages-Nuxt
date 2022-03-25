import { Context } from "@nuxt/types"
import _ from "lodash"




export class AppSnackbar {
  ctx: Context

  active!: boolean
  color!: string
  text!: string




  constructor(ctx: Context) {
    this.ctx = ctx

    $static.vue.ssrRef(this, '$app.snackbar.active', () => false)
    $static.vue.ssrRef(this, '$app.snackbar.color', () => '')
    $static.vue.ssrRef(this, '$app.snackbar.text', () => '')
  }




  show(text: string, color: string) {
    this.active = true
    this.color = color
    this.text = text

    this._hide()
  }
  private _hide = _.debounce(() => {
    this.active = false
  }, 3000)
}