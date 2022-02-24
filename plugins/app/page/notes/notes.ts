import { Context } from '@nuxt/types'
import { getYjsValue, SyncedArray, SyncedMap, SyncedText } from "@syncedstore/core"
import { v4 as uuidv4 } from 'uuid'
import Vue from 'vue'
import { IVec2, Nullable } from "~/types/deep-notes"
import { AppPage } from '../page'
import { Elem } from '../elems/elems'




export {
  AppNotes,
  Note,
  INoteCollab,
  INoteSize,
}




class AppNotes {
  page: AppPage

  collab!: { [key: string]: INoteCollab };




  constructor(page: AppPage) {
    this.page = page

    $static.vue.computed(this, 'collab', () => this.page.collab.store.notes)
  }




  create(parent: Nullable<Note>, destIndex?: number) {
    const id = uuidv4()



    
    this.page.collab.doc.transact(() => {
      Vue.set(this.page.notes.collab, id, {
        linkedPageId: null,
  
        anchor: { x: 0.5, y: 0.5 },
  
        pos: { x: 0, y: 0 },
  
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
  
        zIndex: this.page.data.collab.nextZIndex++
      } as INoteCollab)
    })




    const siblingIds = this.page.regions.getNoteIds(parent)
    destIndex = destIndex ?? siblingIds.length
    siblingIds.splice(destIndex, 0, id)




    return this.page.elems.map[id] as Note
  }




  mapAndObserveNote(noteId: string, parentId: Nullable<string>) {
    const note = new Note(this.page, noteId, parentId)

    this.page.notes.mapAndObserveNoteIds(note.collab.childIds, note.id)
  }
  mapAndObserveNoteIds(noteIds: string[], parentId: Nullable<string>) {
    for (const noteId of noteIds)
      this.mapAndObserveNote(noteId, parentId);

    (getYjsValue(noteIds) as SyncedArray<string>)
    .observe(event => {
      for (const delta of event.changes.delta) {
        if (delta.insert == null)
          continue

        for (const noteId of delta.insert)
          this.mapAndObserveNote(noteId, parentId)
      }
    })
  }




  observeMap() {
    (getYjsValue(this.page.notes.collab) as SyncedMap<INoteCollab>)
    .observe(event => {
      for (const [noteId, change] of event.changes.keys) {
        if (change.action !== 'delete')
          continue

        Vue.delete(this.page.elems.map, noteId)
      }
    })
  }




  fromIds(noteIds: string[]): Note[] {
    return noteIds
      .map(noteId => this.page.elems.map[noteId] as Note)
      .filter(note => note != null)
  }
  toIds(notes: Note[]): string[] {
    return notes.map(note => note.id)
  }
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



  
class Note extends Elem {
  [key: string]: unknown

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

  parent!: Nullable<Note>

  siblingIds!: string[]
  siblings!: Note[]

  index!: number

  minWidth!: string
  width!: string
  targetWidth!: string

  children!: Note[]
  



  constructor(page: AppPage, id: string, parentId: Nullable<string>) {
    super(page, { id, type: 'note', parentId })




    $static.vue.computed(this, 'collab', () =>
      this.page.notes.collab[this.id])




    $static.vue.computed(this, 'selected', () =>
      this.page.selection.has(this))
    $static.vue.computed(this, 'active', () =>
      this.page.activeElem.is(this as Elem))
    $static.vue.computed(this, 'editing', () =>
      this.page.editing.active && this.active)




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
      (this.page.elems.map[this.parentId ?? ''] ?? null) as Note)




    $static.vue.computed(this, 'siblingIds', () =>
      this.page.regions.getNoteIds(this.parent))
    $static.vue.computed(this, 'siblings', () =>
      this.page.regions.getNotes(this.parent))




    $static.vue.computed(this, 'index', () =>
      this.siblings.findIndex(note => note.id == this.id))



    
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



    
    $static.vue.computed(this, 'children', () =>
      this.collab.childIds
        .map(childId => this.page.elems.map[childId])
        .filter(child => child != null))
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




  removeFromRegion() {
    this.siblingIds.splice(this.index, 1)
  }




  scrollIntoView() {
    if (this.parentId == null)
      return




    let auxNode = this.getNode('frame') as Node

    while (auxNode != null) {
      if ($static.utils.hasVertScrollbar(auxNode as HTMLElement))
        break

      auxNode = auxNode.parentNode as Node
    }

    if (auxNode == null)
      return




    const frameNode = this.getNode('frame')

    frameNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }




  copy(note: Note) {
    this.page.collab.doc.transact(() => {
      this.collab.linkedPageId = note.collab.linkedPageId
  
      this.collab.anchor.x = note.collab.anchor.x
      this.collab.anchor.y = note.collab.anchor.y
  
      this.collab.pos.x = note.collab.pos.x
      this.collab.pos.y = note.collab.pos.y
  
      this.collab.hasTitle = note.collab.hasTitle
      this.collab.hasBody = note.collab.hasBody
  
      this.collab.title.delete(0, this.collab.title.length)
      this.collab.title.applyDelta(note.collab.title.toDelta())
  
      this.collab.body.delete(0, this.collab.body.length)
      this.collab.body.applyDelta(note.collab.body.toDelta())
  
      this.collab.collapsible = note.collab.collapsible
      this.collab.collapsed = note.collab.collapsed
  
      this.collab.expandedSize.x = note.collab.expandedSize.x
      this.collab.expandedSize.y.title = note.collab.expandedSize.y.title
      this.collab.expandedSize.y.body = note.collab.expandedSize.y.body
      this.collab.expandedSize.y.container = note.collab.expandedSize.y.container
  
      this.collab.collapsedSize.x = note.collab.collapsedSize.x
      this.collab.collapsedSize.y.title = note.collab.collapsedSize.y.title
      this.collab.collapsedSize.y.body = note.collab.collapsedSize.y.body
      this.collab.collapsedSize.y.container = note.collab.collapsedSize.y.container
  
      this.collab.movable = note.collab.movable
      this.collab.resizable = note.collab.resizable
      
      this.collab.wrapTitle = note.collab.wrapTitle
      this.collab.wrapBody = note.collab.wrapBody
      
      this.collab.readOnly = note.collab.readOnly
      
      this.collab.container = note.collab.container
  
      this.collab.dragging = note.collab.dragging
      
      this.collab.zIndex = note.collab.zIndex
    })
  }
}