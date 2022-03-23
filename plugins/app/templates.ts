import { INoteCollab } from "./page/notes/notes"
import { v4 as uuidv4 } from 'uuid'
import { Context } from "@nuxt/types"
import { ISerialNote } from "./serialization"
import { reactive } from "@nuxtjs/composition-api"




interface ITemplate {
  id: string
  name: string
  data: ISerialNote
}




export class AppTemplates {
  ctx: Context

  list: ITemplate[]
  defaultId: string

  default!: ITemplate




  constructor(ctx: Context) {
    this.ctx = ctx




    this.list = reactive([{
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

    this.defaultId = this.list[0].id


    

    $static.vue.computed(this, 'default', () => 
      this.list.find(template => template.id === this.defaultId))
  }
}