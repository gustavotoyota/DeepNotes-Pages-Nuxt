import { getYjsValue, SyncedArray, SyncedMap, SyncedText } from "@syncedstore/core"
import { merge } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import Vue from 'vue'
import { IVec2, Nullable } from "~/types/deep-notes"
import { Elem } from '../elems/elems'
import { AppPage } from '../page'




export {
  AppNotes,
  Note,
  INoteCollab,
  INoteSize,
}




class AppNotes {
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




  create(overrides?: object) {
    const noteId = uuidv4()




    this.page.collab.doc.transact(() => {
      const noteCollab = {
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
        horizontal: false,
        childIds: [],
  
        dragging: false,
  
        zIndex: this.page.data.collab.nextZIndex++
      } as INoteCollab

      if (overrides != null)
        merge(noteCollab, overrides)

      Vue.set(this.collab, noteId, noteCollab)
    })




    return noteId
  }




  mapAndObserve(noteId: string, parentId: Nullable<string>) {
    const note = new Note(this.page, noteId, parentId)

    this.mapAndObserveIds(note.collab.childIds, note.id)
  }
  mapAndObserveIds(noteIds: string[], parentId: Nullable<string>) {
    for (const noteId of noteIds)
      this.mapAndObserve(noteId, parentId);

    (getYjsValue(noteIds) as SyncedArray<string>)
    .observe(event => {
      for (const delta of event.changes.delta) {
        if (delta.insert == null)
          continue

        for (const noteId of delta.insert)
          this.mapAndObserve(noteId, parentId)
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




  fromIds(noteIds: string[]): Note[] {
    return noteIds
      .map(noteId => this.map[noteId] as Note)
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
  horizontal: boolean
  childIds: string[]

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

  editing!: boolean
  dragging!: boolean

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

  minWidth!: string
  width!: string
  targetWidth!: string

  children!: Note[]
  



  constructor(page: AppPage, id: string, parentId: Nullable<string>) {
    super(page, { id, type: 'note', parentId })




    $static.vue.computed(this, 'note.collab', () =>
      this.page.notes.collab[this.id])


    

    $static.vue.ref(this, 'note.editing', false)
    $static.vue.ref(this, 'note.dragging', this.page.dragging.active && this.selected)




    $static.vue.computed(this, 'note.sizeProp', () =>
      this.collab.collapsed ? 'collapsedSize' : 'expandedSize')
    $static.vue.computed(this, 'note.size', () =>
      this.collab[this.sizeProp])




    $static.vue.computed(this, 'note.topSection', () => {
      if (this.collab.hasTitle)
        return 'title'
      else if (this.collab.hasBody)
        return 'body'
      else if (this.collab.container)
        return 'container'
    })
    $static.vue.computed(this, 'note.bottomSection', () => {
      if (this.collab.collapsed)
        return this.topSection
      else if (this.collab.container)
        return 'container'
      else if (this.collab.hasBody)
        return 'body'
      else if (this.collab.hasTitle)
        return 'title'
    })
    $static.vue.computed(this, 'note.numSections', () => {
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
      $static.vue.computed(this, `note.${section}Height`, {
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



    
    $static.vue.computed(this, 'note.minWidth', () => {
      if (this.collab.container
      && this.collab.childIds.length === 0)
        return '165px'

      if (this.collab.container)
        return '41px'

      return '21px'
    })
    $static.vue.computed(this, 'note.width', {
      get: () => {
        if (this.parent != null) {
          if (this.parent.collab.horizontal)
            return this.size.x
          else
            return 'auto'
        } else if (this.size.x === 'expanded')
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
    $static.vue.computed(this, 'note.targetWidth', () => {
      if (this.parent != null
      && this.parent.targetWidth === '0px'
      && !this.parent.collab.horizontal)
        return '0px'

      if (this.width === 'auto')
        return 'auto'
      else
        return '0px'
    })



    
    $static.vue.computed(this, 'note.children', () =>
      this.page.notes.fromIds(this.collab.childIds))
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




    const frameNode = this.getNode('frame')

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