import Vue from 'vue'
import { getYjsValue, SyncedArray, SyncedMap, SyncedText } from "@syncedstore/core"
import { IVec2, Nullable } from "~/types/deep-notes"
import { Context } from '@nuxt/types'
import { Elem, IElem } from '../elems/elems'
import { IRect } from '../space/rects'




export {
  AppNotes,
  INote,
  INoteCollab,
  INoteSize,
}




class AppNotes {
  ctx: Context

  collab!: { [key: string]: INoteCollab };




  constructor(ctx: Context) {
    this.ctx = ctx

    $static.vue.computed(this, 'collab', () => this.ctx.$app.collab.store.notes)
  }




  create({ id, parentId, clientPos, dontObserve }: {
    id?: string
    parentId?: string
    clientPos?: IVec2
    dontObserve?: boolean
  }): INote {
    const note = new Note(this.ctx, { id, parentId })

    if (id == null)
      note.resetCollab(clientPos, parentId)

    if (!dontObserve)
      this.ctx.$app.notes.observeIds(note.collab.childIds, note.id)

    return note
  }




  observeIds(ids: string[], parentId?: string) {
    (getYjsValue(ids) as SyncedArray<string>).observe(event => {
      let index = 0
    
      for (const delta of event.changes.delta) {
        if (delta.retain != null)
          index += delta.retain
    
        if (delta.insert != null)
          for (const id of delta.insert)
            this.ctx.$app.notes.create({ id, parentId })
      }
    })
  }




  observeMap() {
    (getYjsValue(this.ctx.$app.notes.collab) as SyncedMap<INoteCollab>).observe(event => {
      for (const [noteId, change] of event.changes.keys) {
        if (change.action !== 'delete')
          continue

        Vue.delete(this.ctx.$app.elems.map, noteId)
      }
    })
  }




  createAndObserveChildren(ids: string[], parentId?: string) {
    for (const id of ids) {
      this.ctx.$app.notes.create({ id, parentId, dontObserve: true })

      this.ctx.$app.notes.createAndObserveChildren(this.ctx.$app.notes.collab[id].childIds, id)
    }

    this.ctx.$app.notes.observeIds(ids, parentId)
  }
}

interface INote extends IElem {
  [key: string]: unknown

  collab: INoteCollab

  selected: boolean
  active: boolean
  editing: boolean

  sizeProp: string
  size: INoteSize

  topSection: string
  bottomSection: string
  numSections: number

  titleHeight: string
  bodyHeight: string
  containerHeight: string

  parent: Nullable<INote>
  siblingIds: string[]
  index: number

  minWidth: string
  width: string
  targetWidth: string

  children: INote[]



  bringToTop(): void
  getNode(part: string): Element
  getClientRect(part: string): IRect
  removeFromRegion(): void
}

interface INoteCollab {
  [key: string]: unknown

  linkedPageId: Nullable<string>

  anchor: IVec2

  pos: IVec2

  hasTitle: boolean
  hasBody: boolean
  
  title: SyncedText
  body: SyncedText

  collapsible: boolean
  collapsed: boolean

  expandedSize: INoteSize
  collapsedSize: INoteSize

  movable: boolean
  resizable: boolean

  wrapTitle: boolean
  wrapBody: boolean
  
  readOnly: boolean

  container: boolean
  childIds: string[]

  dragging: boolean

  zIndex: number
}

interface INoteSize {
  x: string

  y: {
    [key: string]: string

    title: string
    body: string
    container: string
  },
}



  
class Note extends Elem implements INote {
  [key: string]: unknown

  id!: string;

  collab!: INoteCollab

  selected!: boolean
  active!: boolean
  editing!: boolean

  sizeProp!: string
  size!: INoteSize

  topSection!: string
  bottomSection!: string
  numSections!: number

  titleHeight!: string
  bodyHeight!: string
  containerHeight!: string

  parent: Nullable<INote>
  siblingIds!: string[]
  index!: number

  minWidth!: string
  width!: string
  targetWidth!: string

  children!: INote[]
  



  constructor(ctx: Context, options: {
    id?: string
    parentId?: string
  }) {
    super(ctx, { type: 'note', ...options })




    $static.vue.computed(this, 'collab', () =>
      this.ctx.$app.notes.collab[this.id])




    $static.vue.computed(this, 'selected', () =>
      this.ctx.$app.selection.has(this))
    $static.vue.computed(this, 'active', () =>
      this.ctx.$app.activeElem.is(this as IElem))
    $static.vue.computed(this, 'editing', () =>
      this.ctx.$app.editing.active && this.active)




    $static.vue.computed(this, 'sizeProp', () =>
      this.collab.collapsed ? 'collapsedSize' : 'expandedSize')
    $static.vue.computed(this, 'size', () =>
      this.collab[this.sizeProp])




    $static.vue.computed(this, 'topSection', () => {
      if (this.collab.hasTitle)
        return 'title'
      else if (this.collab.hasBody)
        return 'body'
      else if (this.collab.container)
        return 'container'
    })
    $static.vue.computed(this, 'bottomSection', () => {
      if (this.collab.collapsed)
        return this.topSection
      else if (this.collab.container)
        return 'container'
      else if (this.collab.hasBody)
        return 'body'
      else if (this.collab.hasTitle)
        return 'title'
    })
    $static.vue.computed(this, 'numSections', () => {
      let numSections = 0
    
      if (this.collab.hasTitle)
        ++numSections
      if (this.collab.hasBody)
        ++numSections
      if (this.collab.container)
        ++numSections
    
      return numSections
    })




    const makeSectionHeight = (section: string) => {
      $static.vue.computed(this, `${section}Height`, {
        get: () => {
          if (this.collab.collapsed
          && this.collab.collapsedSize.y[section] === 'auto'
          && this.topSection === section) {
            if (this.numSections === 1)
              return '0'
            else
              return this.collab.expandedSize.y[section]
          } else if (this.size.y[section] === 'auto')
            return this.collab.expandedSize.y[section]
          else
            return this.size.y[section]
        },
        set: (value: string) => {
          if (this.size.y[section] === 'auto')
            this.collab.expandedSize.y[section] = value
          else
            this.size.y[section] = value
        },
      })
    }

    makeSectionHeight('title')
    makeSectionHeight('body')
    makeSectionHeight('container')



    
    $static.vue.computed(this, 'parent', () =>
      (this.ctx.$app.elems.map[this.parentId ?? ''] ?? null) as INote)
    $static.vue.computed(this, 'siblingIds', () => {
      if (this.parent == null)
        return this.ctx.$app.page.collab.noteIds
      else
        return this.parent.collab.childIds
    })
    $static.vue.computed(this, 'index', () =>
      this.siblingIds.findIndex(noteId => noteId === this.id))



    
    $static.vue.computed(this, 'minWidth', () => {
      if (this.collab.container
      && this.collab.childIds.length === 0)
        return '165px'

      if (this.collab.container)
        return '41px'

      return '21px'
    })
    $static.vue.computed(this, 'width', {
      get: () => {
        if (this.parentId != null)
          return 'auto'
        else if (this.size.x === 'expanded')
          return this.collab.expandedSize.x
        else
          return this.size.x
      },
      set: (value: string) => {
        if (this.size.x === 'expanded')
          this.collab.expandedSize.x = value
        else
          this.size.x = value
      },
    })
    $static.vue.computed(this, 'targetWidth', () => {
      if (this.parent != null)
        return this.parent.targetWidth

      if (this.width === 'auto')
        return 'auto'
      else
        return '0px'
    })



    
    $static.vue.computed(this, 'children', () => {
      const children = []

      for (const childId of this.collab.childIds) {
        const child = this.ctx.$app.elems.map[childId]
        if (child != null)
          children.push(child)
      }

      return children
    })
  }




  resetCollab(clientPos: Nullable<IVec2>, parentId: Nullable<string>) {
    this.ctx.$app.collab.doc.transact(() => {
      Vue.set(this.ctx.$app.notes.collab, this.id, {
        linkedPageId: null,

        anchor: { x: 0.5, y: 0.5 },

        pos: clientPos ?
          this.ctx.$app.pos.clientToWorld(clientPos) : { x: 0, y: 0 },

        hasTitle: false,
        hasBody: true,
        
        title: new SyncedText(),
        body: new SyncedText(),

        collapsible: false,
        collapsed: false,

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
        childIds: [],

        dragging: false,

        zIndex: this.ctx.$app.page.collab.nextZIndex++
      } as INoteCollab)



      
      if (parentId == null)
        this.ctx.$app.page.collab.noteIds.push(this.id)
      else
        this.ctx.$app.notes.collab[parentId].childIds.push(this.id)
    })
  }


  

  bringToTop() {
    if (this.collab.zIndex === this.ctx.$app.page.collab.nextZIndex - 1)
      return

    this.collab.zIndex = this.ctx.$app.page.collab.nextZIndex++
  }




  getNode(part: string): Element {
    if (part == null)
      return document.getElementById(`note-${this.id}`) as Element
    else
      return document.querySelector(`#note-${this.id} .${part}`) as Element
  }




  getClientRect(part: string) {
    const node = this.getNode(part)

    const domClientRect = node.getBoundingClientRect()
  
    return this.ctx.$app.rects.fromDOM(domClientRect)
  }




  removeFromRegion() {
    this.siblingIds.splice(this.index, 1)
  }
}