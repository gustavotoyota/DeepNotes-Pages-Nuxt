import Vue from 'vue'
import { getYjsValue, SyncedArray, SyncedText } from "@syncedstore/core"
import { Exact, IVec2, Nullable } from "~/types/deep-notes"
import { Context } from '@nuxt/types'
import { IElem } from '../elems/elems'
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
    local?: boolean
  }): INote;
  observeIds(ids: string[], parentId?: string): void;
  createFromIds(ids: string[], parentId?: string): void;
  bringToTop(note: INote): void;
  getNode(note: INote, part: string): Element;
  getClientRect(note: INote, part: string): IRect;
}

interface INote extends IElem {
  collab: INoteCollab

  selected: boolean
  active: boolean
  editing: boolean

  sizeProp: string
  size: INoteSize

  topSection: string
  bottomSection: string

  numSections: number

  parent: Nullable<INote>
  siblingIds: string[]
  index: number

  minWidth: string
  width: string
  targetWidth: string
}

interface INoteCollab {
  [key: string]: any;

  linkedPageId: Nullable<string>

  anchor: IVec2

  pos: IVec2

  hasTitle: boolean
  hasBody: boolean
  
  title: SyncedText
  body: SyncedText

  collapsible: boolean
  collapsed: boolean

  expandedSize: INoteSize,
  collapsedSize: INoteSize,

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
  x: string,

  y: {
    [key: string]: string

    title: string,
    body: string,
    container: string,
  },
}




export const init = <T>({ $app }: Context): IAppNotes => 
new class implements IAppNotes {
  collab: any;




  constructor() {
    $static.vue.computed(this, 'collab', () => $app.collab.store.notes)
  }




  create({ id, parentId, clientPos, local }: Partial<{
    id: string
    parentId: string
    clientPos: IVec2
    local: boolean
  }>): INote {
    const note = $app.elems.create({
      id: id,
      type: 'note',
      parentId: parentId,
    }) as INote




    // Add collaboration information

    if (local) {
      $app.collab.doc.transact(() => {
        Vue.set($app.notes.collab, note.id, {
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
          $app.page.collab.noteIds.push(note.id)
        else
          $app.notes.collab[parentId].childIds.push(note.id)
      })
    }




    // Computed properties

    $static.vue.computed(note, 'collab', () =>
      $app.notes.collab[note.id])

    $static.vue.computed(note, 'selected', () =>
      $app.selection.has(note))
    $static.vue.computed(note, 'active', () =>
      $app.activeElem.is(note as IElem))
    $static.vue.computed(note, 'editing', () =>
      $app.editing.active && note.active)



    $static.vue.computed(note, 'sizeProp', () =>
      note.collab.collapsed ? 'collapsedSize' : 'expandedSize')
    $static.vue.computed(note, 'size', () =>
      note.collab[note.sizeProp])




    $static.vue.computed(note, 'topSection', () => {
      if (note.collab.hasTitle)
        return 'title'
      else if (note.collab.hasBody)
        return 'body'
      else if (note.collab.container)
        return 'container'
    })
    $static.vue.computed(note, 'bottomSection', () => {
      if (note.collab.collapsed)
        return note.topSection
      else if (note.collab.container)
        return 'container'
      else if (note.collab.hasBody)
        return 'body'
      else if (note.collab.hasTitle)
        return 'title'
    })



    
    $static.vue.computed(note, 'numSections', () => {
      let numSections = 0
    
      if (note.collab.hasTitle)
        ++numSections
      if (note.collab.hasBody)
        ++numSections
      if (note.collab.container)
        ++numSections
    
      return numSections
    })



    
    $static.vue.computed(note, 'parent', () =>
      $app.elems.map[note.parentId ?? ''] ?? null)
    $static.vue.computed(note, 'siblingIds', () => {
      if (note.parentId == null)
        return $app.page.collab.noteIds
      else
        return note.collab.childIds
    })
    $static.vue.computed(note, 'index', () =>
      note.siblingIds.findIndex(noteId => noteId === note.id))



    
    $static.vue.computed(note, 'minWidth', () => {
      if (note.collab.container && note.collab.childIds.length === 0)
        return '165px'

      if (note.collab.container)
        return '41px'

      return '21px'
    })
    $static.vue.computed(note, 'width', () => {
      if (note.parentId != null)
        return 'auto'
      else if (note.size.x === 'expanded')
        return note.collab.expandedSize.x
      else
        return note.size.x
    })
    $static.vue.computed(note, 'targetWidth', () => {
      if (note.width === 'auto')
        return 'auto'
      else
        return '0px'
    })




    // Observe children

    $app.notes.observeIds(note.collab.childIds, note.id)




    return note
  }




  observeIds(ids: string[], parentId?: string) {
    const mirror = ids.slice();

    (getYjsValue(ids) as SyncedArray<string>).observe(event => {
      let index = 0
    
      for (const delta of event.changes.delta) {
        if (delta.retain != null)
          index += delta.retain
    
        if (delta.insert != null) {
          mirror.splice(index, 0, ...delta.insert)

          for (const id of delta.insert)
            $app.notes.create({ id, parentId })
        }
    
        if (delta.delete != null) {
          const deleted = mirror.splice(index, delta.delete)

          for (const id of deleted)
            Vue.delete($app.elems.map, id)
        }
      }
    })
  }




  createFromIds(ids: string[], parentId?: string) {
    for (const id of ids) {
      $app.notes.create({ id, parentId })

      $app.notes.createFromIds($app.notes.collab[id].childIds, id)
    }
  }




  bringToTop(note: INote) {
    if (note.collab.zIndex === $app.page.collab.nextZIndex - 1)
      return

    note.collab.zIndex = $app.page.collab.nextZIndex++
  }




  getNode(note: INote, part: string): Element {
    if (part == null)
      return document.getElementById(`note-${note.id}`) as Element
    else
      return document.querySelector(`#note-${note.id} .${part}`) as Element
  }




  getClientRect(note: INote, part: string) {
    const node = $app.notes.getNode(note, part)

    const domClientRect = node.getBoundingClientRect()
  
    return $app.rects.fromDOM(domClientRect)
  }
} as Exact<T, IAppNotes>