import { Context } from "@nuxt/types"
import { watch } from "@nuxtjs/composition-api"
import { Vec2 } from "../static/vec2"
import { ISerialNote } from "./serialization"




export interface ITemplate {
  id: string
  name: string
  visible: boolean
  data: ISerialNote
}




export class AppTemplates {
  ctx: Context

  list!: ITemplate[]
  defaultId!: string
  default!: ITemplate
  
  popupVisible!: boolean
  popupPos!: Vec2




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ssrRef(this, '$app.templates.list', () => [])

    $static.vue.ssrRef(this, '$app.templates.defaultId', () => null)

    $static.vue.computed(this, 'default', () => 
      this.list.find(template => template.id === this.defaultId))
      
    


    $static.vue.ssrRef(this, '$app.templates.popupVisible', () => false)
    $static.vue.ssrRef(this, '$app.templates.popupPos', () => (new Vec2(0, 0)))
  }




  setup() {
    watch([
      () => this.list,
      () => this.defaultId,
    ], async () => {
      await this.ctx.$axios.post('/api/template/update-settings', {
        templates: this.list.map(template => ({
          id: template.id,
          visible: template.visible,
        })),
        defaultTemplateId: this.defaultId,
      })
    })
  }




  showPopup(pos: Vec2) {
    this.popupPos = pos
    this.popupVisible = true
  }
}