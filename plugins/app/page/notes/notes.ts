import { getYjsValue, SyncedArray, SyncedMap, SyncedText } from "@syncedstore/core"
import Quill from "quill"
import Vue from 'vue'
import { z } from "zod"
import { Rect } from "~/plugins/static/rect"
import { IVec2, Vec2 } from "~/plugins/static/vec2"
import { Nullable } from "~/types/deep-notes"
import { ITemplate } from "../../templates"
import { Arrow } from "../arrows/arrows"
import { IContainerCollab } from "../container"
import { Elem, ElemType } from '../elems/elems'
import { AppPage } from '../page'




export enum NoteSection {
  HEAD = 'head',
  BODY = 'body',
  CONTAINER = 'container',
}

export type NoteTextSection = Exclude<NoteSection, NoteSection.CONTAINER>




export class AppNotes {
  page: AppPage
  



  map!: { [key: string]: Note }

  collab!: { [key: string]: INoteCollab };




  constructor(page: AppPage) {
    this.page = page




    $static.vue.ssrRef(this, '$app.page.notes.map', () => ({}))




    $static.vue.computed(this, '$app.page.notes.ids', () => Object.keys(this.map))
    $static.vue.computed(this, '$app.page.notes.array', () => Object.values(this.map))


    

    $static.vue.computed(this, '$app.page.notes.collab', () => this.page.collab.store.notes)
  }
  


  
  createFromTemplate(template: ITemplate, clientPos: Vec2) {
    const [noteId] = this.page.app.serialization.deserialize({
      notes: [template.data],
      arrows: [],
    }, this.page.data.collab)
  
  
  
  
    const worldPos = this.page.pos.clientToWorld(clientPos)
  
  
  
  
    const note = this.page.notes.map[noteId]
    
    note.collab.pos.x = worldPos.x
    note.collab.pos.y = worldPos.y
  
    this.page.editing.start(note, note.topSection)
  }




  createAndObserveChildren(noteId: string, parentId: Nullable<string>) {
    const note = new Note(this.page, noteId, parentId)

    this.createAndObserveIds(note.collab.noteIds, note.id)
  }
  createAndObserveIds(noteIds: string[], parentId: Nullable<string>) {
    for (const noteId of noteIds)
      this.createAndObserveChildren(noteId, parentId);

    (getYjsValue(noteIds) as SyncedArray<string>)
    .observe(event => {
      for (const delta of event.changes.delta) {
        if (delta.insert == null)
          continue

        for (const noteId of delta.insert)
          this.createAndObserveChildren(noteId, parentId)
      }
    })
  }




  observeMap() {
    (getYjsValue(this.collab) as SyncedMap<INoteCollab>)
    .observe(event => {
      for (const [noteId, change] of event.changes.keys) {
        if (change.action !== 'delete')
          continue

        Vue.delete(this.map, noteId)
      }
    })
  }




  fromId(nodeId: string): Note {
    return this.map[nodeId]
  }
  toId(note: Note): string {
    return note.id
  }




  fromIds(noteIds: string[]): Note[] {
    return noteIds
      .map(noteId => this.fromId(noteId))
      .filter(note => note != null)
  }
  toIds(notes: Note[]): string[] {
    return notes.map(note => this.toId(note))
  }
}




export const INoteSize = z.object({
  x: z.string(),

  y: z.object({
    head: z.string(),
    body: z.string(),
    container: z.string(),
  }),
})

export type INoteSize = z.infer<typeof INoteSize>




export const INoteCollab = IContainerCollab.extend({
  linkedPageId: z.string().nullable().default(null),

  anchor: IVec2.default({ x: 0.5, y: 0.5 }),

  pos: IVec2.default({ x: 0, y: 0 }),

  hasHead: z.boolean().default(false),
  hasBody: z.boolean().default(true),

  head: z.any() as z.ZodType<SyncedText>,
  body: z.any() as z.ZodType<SyncedText>,

  collapsible: z.boolean().default(false),
  collapsed: z.boolean().default(false),
  localCollapsing: z.boolean().default(false),

  expandedSize: INoteSize.default({
    x: 'auto',

    y: {
      head: 'auto',
      body: 'auto',
      container: 'auto',
    },
  }),
  collapsedSize: INoteSize.default({
    x: 'expanded',
    
    y: {
      head: 'auto',
      body: 'auto',
      container: 'auto',
    },
  }),

  movable: z.boolean().default(true),
  resizable: z.boolean().default(true),

  wrapHead: z.boolean().default(true),
  wrapBody: z.boolean().default(true),
  
  readOnly: z.boolean().default(false),

  container: z.boolean().default(false),
  horizontal: z.boolean().default(false),
  wrapChildren: z.boolean().default(false),
  stretchChildren: z.boolean().default(true),
  spatial: z.boolean().default(false),

  zIndex: z.number().default(() => $nuxt.$app.page.data.collab.nextZIndex++),
})

export type INoteCollab = z.output<typeof INoteCollab>



  
export class Note extends Elem {
  collab: INoteCollab

  editing!: boolean
  dragging!: boolean

  locallyCollapsed!: boolean
  collapsed!: boolean

  domSizeProp!: 'collapsedSize' | 'expandedSize'
  domSize!: INoteSize

  worldSize!: Vec2
  worldTopLeft!: Vec2
  worldCenter!: Vec2
  worldBottomRight!: Vec2
  worldRect!: Rect

  clientSize!: Vec2
  clientTopLeft!: Vec2
  clientCenter!: Vec2
  clientBottomRight!: Vec2
  clientRect!: Rect

  topSection!: NoteSection
  bottomSection!: NoteSection
  numSections!: number

  headQuill: Nullable<Quill> = null
  bodyQuill: Nullable<Quill> = null

  minWidth!: string
  width!: string
  targetWidth!: string

  headHeight!: string
  bodyHeight!: string
  containerHeight!: string

  parent!: Nullable<Note>

  siblingIds!: string[]
  siblings!: Note[]

  notes!: Note[]
  arrows!: Arrow[]
  



  constructor(page: AppPage, id: string, parentId: Nullable<string>) {
    super(page, { id, type: ElemType.NOTE, parentId })




    this.collab = this.page.notes.collab[this.id]


    

    $static.vue.ref(this, 'note.editing', false)
    $static.vue.ref(this, 'note.dragging', this.page.dragging.active && this.selected)
  


    
    $static.vue.ref(this, 'note.locallyCollapsed', this.collab.collapsed)
    $static.vue.computed(this, 'note.collapsed', () => {
      if (!this.collab.collapsible)
        return false

      if (!this.collab.localCollapsing)
        return this.collab.collapsed

      return this.locallyCollapsed ?? this.collapsed
    })




    $static.vue.computed(this, 'note.domSizeProp', () =>
      this.collapsed ? 'collapsedSize' : 'expandedSize')
    $static.vue.computed(this, 'note.domSize', () =>
      this.collab[this.domSizeProp] as INoteSize)




    $static.vue.ref(this, 'note.worldSize', new Vec2(0, 0))

    $static.vue.computed(this, 'note.worldTopLeft', () =>
      new Vec2(this.collab.pos).sub(new Vec2(this.collab.anchor).mul(this.worldSize)))
    $static.vue.computed(this, 'note.worldCenter', () => 
      new Vec2(this.collab.pos).add(new Vec2(0.5).sub(new Vec2(this.collab.anchor)).mul(this.worldSize)))
    $static.vue.computed(this, 'note.worldBottomRight', () => 
      new Vec2(this.collab.pos).add(new Vec2(1).sub(new Vec2(this.collab.anchor)).mul(this.worldSize)))

    $static.vue.computed(this, 'note.worldRect', () => (
      new Rect(this.worldTopLeft, this.worldBottomRight)))



    
    $static.vue.computed(this, 'note.clientSize', () => 
      this.page.pos.worldToClient(this.worldSize))
      
    $static.vue.computed(this, 'note.clientTopLeft', () => 
      this.page.pos.worldToClient(this.worldTopLeft))
    $static.vue.computed(this, 'note.clientCenter', () => 
      this.page.pos.worldToClient(this.worldCenter))
    $static.vue.computed(this, 'note.clientBottomRight', () => 
      this.page.pos.worldToClient(this.worldBottomRight))

    $static.vue.computed(this, 'note.clientRect', () => (
      new Rect(
        this.page.pos.worldToClient(this.worldTopLeft),
        this.page.pos.worldToClient(this.worldBottomRight),
      )
    ))




    $static.vue.computed(this, 'note.topSection', () => {
      if (this.collab.hasHead)
        return 'head'
      else if (this.collab.hasBody)
        return 'body'
      else if (this.collab.container)
        return 'container'
    })
    $static.vue.computed(this, 'note.bottomSection', () => {
      if (this.collapsed)
        return this.topSection
      else if (this.collab.container)
        return 'container'
      else if (this.collab.hasBody)
        return 'body'
      else if (this.collab.hasHead)
        return 'head'
    })
    $static.vue.computed(this, 'note.numSections', () => {
      let numSections = 0
    
      if (this.collab.hasHead)
        ++numSections
      if (this.collab.hasBody)
        ++numSections
      if (this.collab.container)
        ++numSections
    
      return numSections
    })



    
    $static.vue.computed(this, 'note.minWidth', () => {
      if (this.collab.container
      && this.collab.noteIds.length === 0)
        return '165px'

      if (this.collab.container)
        return '41px'

      return '21px'
    })
    $static.vue.computed(this, 'note.width', {
      get: () => {
        if (this.parent != null) {
          if (this.parent.collab.horizontal || !this.parent.collab.stretchChildren)
            return this.domSize.x
          else
            return 'auto'
        } else if (this.domSize.x === 'expanded')
          return this.collab.expandedSize.x
        else
          return this.domSize.x
      },
      set: (value: string) => {
        if (this.domSize.x === 'expanded')
          this.collab.expandedSize.x = value
        else
          this.domSize.x = value
      },
    })
    $static.vue.computed(this, 'note.targetWidth', () => {
      if (this.parent != null
      && this.parent.targetWidth === '0px'
      && !this.parent.collab.horizontal
      && this.parent.collab.stretchChildren)
        return '0px'
      
      if (this.width === 'auto')
        return 'auto'
      else
        return '0px'
    })




    const makeSectionHeight = (section: NoteSection) => {
      $static.vue.computed(this, `note.${section}Height`, {
        get: () => {
          if (this.collapsed
          && this.collab.collapsedSize.y[section] === 'auto'
          && this.topSection === section) {
            if (this.numSections === 1)
              return '0'
            else
              return this.collab.expandedSize.y[section]
          } else if (this.domSize.y[section] === 'auto')
            return this.collab.expandedSize.y[section]
          else
            return this.domSize.y[section]
        },
        set: (value: string) => {
          if (this.domSize.y[section] === 'auto')
            this.collab.expandedSize.y[section] = value
          else
            this.domSize.y[section] = value
        },
      })
    }

    makeSectionHeight(NoteSection.HEAD)
    makeSectionHeight(NoteSection.BODY)
    makeSectionHeight(NoteSection.CONTAINER)



    
    $static.vue.computed(this, 'note.parent', () => {
      if (this.parentId == null)
        return null
      else
        return this.page.notes.map[this.parentId]
    })




    $static.vue.computed(this, 'note.siblingIds', () =>
      this.page.regions.getNoteIds(this.parent))
    $static.vue.computed(this, 'note.siblings', () =>
      this.page.regions.getNotes(this.parent))



    
    $static.vue.computed(this, 'note.notes', () =>
      this.page.notes.fromIds(this.collab.noteIds))
    $static.vue.computed(this, 'note.arrows', () =>
      this.page.arrows.fromIds(this.collab.arrowIds))
  }


  

  bringToTop() {
    if (this.collab.zIndex === this.page.data.collab.nextZIndex - 1)
      return

    this.collab.zIndex = this.page.data.collab.nextZIndex++
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
  
    return this.page.rects.fromDOM(domClientRect)
  }
  getDisplayRect(part: string) {
    return this.page.rects.clientToDisplay(this.getClientRect(part))
  }
  getWorldRect(part: string) {
    return this.page.rects.clientToWorld(this.getClientRect(part))
  }




  removeFromRegion() {
    this.siblingIds.splice(this.index, 1)
  }




  scrollIntoView() {
    if (this.parentId == null)
      return




    const frameNode = this.getNode('note-frame')

    let auxNode = frameNode as Node

    while (auxNode != null) {
      if ($static.utils.hasVertScrollbar(auxNode as HTMLElement))
        break

      auxNode = auxNode.parentNode as Node
    }

    if (auxNode == null)
      return




    frameNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }
}