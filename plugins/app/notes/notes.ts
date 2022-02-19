import Vue from 'vue'
import { getYjsValue, SyncedArray, SyncedMap, SyncedText } from "@syncedstore/core"
import { Exact, IVec2, Nullable } from "~/types/deep-notes"
import { Context } from '@nuxt/types'
import { Elem, IElem } from '../elems/elems'
import { IRect } from '../space/rects'




export type {
  IAppNotes,
  INote,
  INoteCollab,
  INoteSize,
}




interface IAppNotes {
  collab: { [key: string]: INoteCollab };



  create(args: {
    id?: string
    parentId?: string
    clientPos?: IVec2
    dontObserve?: boolean
  }): INote;



  observeIds(ids: string[], parentId?: string): void;
  observeMap(): void;
  createAndObserveChildren(ids: string[], parentId?: string): void;
}

interface INote extends IElem {
  [key: string]: any

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
  [key: string]: any

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




export const init = <T>(ctx: Context): IAppNotes => {
  const { $app } = ctx



  
  class Note extends Elem implements INote {
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
    



    constructor(options: {
      id?: string
      parentId?: string
    }) {
      super(ctx, { type: 'note', ...options })




      $static.vue.computed(this, 'collab', () =>
        $app.notes.collab[this.id])




      $static.vue.computed(this, 'selected', () =>
        $app.selection.has(this))
      $static.vue.computed(this, 'active', () =>
        $app.activeElem.is(this as IElem))
      $static.vue.computed(this, 'editing', () =>
        $app.editing.active && this.active)




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
        $static.vue.computed(this, `${section}Height`, () => {
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
        })
      }

      makeSectionHeight('title')
      makeSectionHeight('body')
      makeSectionHeight('container')



      
      $static.vue.computed(this, 'parent', () =>
        ($app.elems.map[this.parentId ?? ''] ?? null) as INote)
      $static.vue.computed(this, 'siblingIds', () => {
        if (this.parent == null)
          return $app.page.collab.noteIds
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
      $static.vue.computed(this, 'width', () => {
        if (this.parentId != null)
          return 'auto'
        else if (this.size.x === 'expanded')
          return this.collab.expandedSize.x
        else
          return this.size.x
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
          const child = $app.elems.map[childId]
          if (child != null)
            children.push(child)
        }

        return children
      })
    }




    resetCollab(clientPos: Nullable<IVec2>, parentId: Nullable<string>) {
      $app.collab.doc.transact(() => {
        Vue.set($app.notes.collab, this.id, {
          linkedPageId: null,
  
          anchor: { x: 0.5, y: 0.5 },
  
          pos: clientPos ?
            $app.pos.clientToWorld(clientPos) : { x: 0, y: 0 },
  
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

          zIndex: $app.page.collab.nextZIndex++
        } as INoteCollab)
  


        
        if (parentId == null)
          $app.page.collab.noteIds.push(this.id)
        else
          $app.notes.collab[parentId].childIds.push(this.id)
      })
    }


    

    bringToTop() {
      if (this.collab.zIndex === $app.page.collab.nextZIndex - 1)
        return

      this.collab.zIndex = $app.page.collab.nextZIndex++
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
    
      return $app.rects.fromDOM(domClientRect)
    }




    removeFromRegion() {
      this.siblingIds.splice(this.index, 1)
    }
  }




  return new class implements IAppNotes {
    collab!: { [key: string]: INoteCollab };




    constructor() {
      $static.vue.computed(this, 'collab', () => $app.collab.store.notes)
    }




    create({ id, parentId, clientPos, dontObserve }: {
      id?: string
      parentId?: string
      clientPos?: IVec2
      dontObserve?: boolean
    }): INote {
      const note = new Note({ id, parentId })

      if (id == null)
        note.resetCollab(clientPos, parentId)

      if (!dontObserve)
        $app.notes.observeIds(note.collab.childIds, note.id)

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
              $app.notes.create({ id, parentId })
        }
      })
    }




    observeMap() {
      (getYjsValue($app.notes.collab) as SyncedMap<INoteCollab>).observe(event => {
        for (const [noteId, change] of event.changes.keys) {
          if (change.action !== 'delete')
            continue

          Vue.delete($app.elems.map, noteId)
        }
      })
    }




    createAndObserveChildren(ids: string[], parentId?: string) {
      for (const id of ids) {
        $app.notes.create({ id, parentId, dontObserve: true })

        $app.notes.createAndObserveChildren($app.notes.collab[id].childIds, id)
      }

      $app.notes.observeIds(ids, parentId)
    }
  } as Exact<T, IAppNotes>
}