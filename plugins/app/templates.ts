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




    $static.vue.ssrRef(this, '$app.templates.list', () => [{
      id: uuidv4(),
      
      name: 'Default',

      data: {
        linkedPageId: null,
  
        anchor: { x: 0.5, y: 0.5 },
  
        pos: { x: 0, y: 0 },
  
        hasTitle: false,
        hasBody: true,
        
        title: [],
        body: [],
  
        collapsible: false,
        collapsed: false,
        localCollapsing: false,
  
        expandedSize: {
          x: 'auto',
  
          y: {
            title: 'auto',
            body: 'auto',
            container: 'auto',
          },
        },
        collapsedSize: {
          x: 'expanded',
          
          y: {
            title: 'auto',
            body: 'auto',
            container: 'auto',
          },
        },
  
        movable: true,
        resizable: true,
  
        wrapTitle: true,
        wrapBody: true,
        
        readOnly: false,
  
        container: false,
        horizontal: false,
        wrapChildren: false,
        fullWidthChildren: true,

        notes: [],
        arrows: [],
      },
    }])

    $static.vue.ssrRef(this, '$app.templates.defaultId', () => this.list[0].id)


    

    $static.vue.computed(this, 'default', () => 
      this.list.find(template => template.id === this.defaultId))
  }
}