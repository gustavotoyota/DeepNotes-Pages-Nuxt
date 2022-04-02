import { Context } from "@nuxt/types"
import { v4 as uuidv4 } from 'uuid'
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




    $static.vue.ssrRef(this, '$app.templates.list', () => [
      {
        id: uuidv4(),
        name: 'Body note',
        visible: true,

        data: {
          hasHead: false,
          hasBody: true,
        },
      },
      {
        id: uuidv4(),
        name: 'Head note',
        visible: true,

        data: {
          hasHead: true,
          hasBody: false,
        },
      },
      {
        id: uuidv4(),
        name: 'Head and body',
        visible: true,

        data: {
          hasHead: true,
          hasBody: true,
        },
      },
      {
        id: uuidv4(),
        name: 'Container with head',
        visible: true,

        data: {
          hasHead: true,
          hasBody: false,

          container: true,
        },
      },
    ] as ITemplate[])

    $static.vue.ssrRef(this, '$app.templates.defaultId', () => this.list[0].id)

    $static.vue.computed(this, 'default', () => 
      this.list.find(template => template.id === this.defaultId))
      
    


    $static.vue.ssrRef(this, '$app.templates.popupVisible', () => false)
    $static.vue.ssrRef(this, '$app.templates.popupPos', () => (new Vec2(0, 0)))
  }




  showPopup(pos: Vec2) {
    this.popupPos = pos
    this.popupVisible = true
  }
}