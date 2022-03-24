import { Context } from "@nuxt/types"
import { v4 as uuidv4 } from 'uuid'
import { ISerialNote } from "./serialization"




export interface ITemplate {
  id: string
  name: string
  data: ISerialNote
}




export class AppTemplates {
  ctx: Context

  list!: ITemplate[]
  defaultId!: string

  default!: ITemplate




  constructor(ctx: Context) {
    this.ctx = ctx




    $static.vue.ssrRef(this, '$app.templates.list', () => [
      {
        id: uuidv4(),
        
        name: 'Body note',

        data: {
          hasTitle: false,
          hasBody: true,
        },
      },
      {
        id: uuidv4(),
        
        name: 'Head note',

        data: {
          hasTitle: true,
          hasBody: false,
        },
      },
      {
        id: uuidv4(),
        
        name: 'Head and body',

        data: {
          hasTitle: true,
          hasBody: true,
        },
      },
      {
        id: uuidv4(),
        
        name: 'Titled container',

        data: {
          hasTitle: true,
          hasBody: false,

          container: true,
        },
      }
    ] as ITemplate[])

    $static.vue.ssrRef(this, '$app.templates.defaultId', () => this.list[0].id)


    

    $static.vue.computed(this, 'default', () => 
      this.list.find(template => template.id === this.defaultId))
  }
}