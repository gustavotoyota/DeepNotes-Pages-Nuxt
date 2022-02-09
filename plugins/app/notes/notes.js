import Vue from 'vue'
import { getYjsValue, SyncedText } from "@syncedstore/core"




export const init = ({ $app }) => {
  const notes = $app.notes = {}




  $static.vue.computed(notes, 'collab', () => $app.collab.store.notes)




  let zIndex = 0

  notes.create = ({ id, parentId, clientPos, local }) => {
    if (id in $app.elems.map)
      return



      
    const note = $app.elems.create({
      id: id,
      type: 'note',
      parentId: parentId,
    })




    // Add private information

    $static.vue.merge(note, {
      zIndex: zIndex++,
    })




    // Add collaboration information

    if (local) {
      getYjsValue($app.collab.store).transact(() => {
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
        })
  
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
      $app.activeElem.is(note))
    $static.vue.computed(note, 'dragging', () =>
      $app.dragging.active && note.selected)
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
      $app.elems.map[note.parentId] ?? null)
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




  notes.observeIds = (ids, parentId) => {
    const mirror = ids.slice()

    getYjsValue(ids).observe(event => {
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




  notes.createFromIds = (ids, parentId) => {
    for (const id of ids) {
      $app.notes.create({ id, parentId })

      $app.notes.createFromIds($app.notes.collab[id].childIds, id)
    }
  }




  notes.bringToTop = (note) => {
    note.zIndex = zIndex++
  }




  notes.getNode = (note, part) => {
    if (part == null)
      return document.getElementById(`note-${note.id}`)
    else
      return document.querySelector(`#note-${note.id} .${part}`)
  }




  notes.getClientRect = (note, part) => {
    const node = $app.notes.getNode(note, part)

    const domClientRect = node.getBoundingClientRect()
  
    return $app.rects.fromDOM(domClientRect)
  }
}