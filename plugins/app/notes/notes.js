import Vue from 'vue'
import { getYjsValue, SyncedText } from "@syncedstore/core"




export const init = ({ $app }) => {
  const notes = $app.notes = {}




  $app.utils.computed(notes, 'collab', () => $app.collab.store.notes)




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

    $static.utils.merge(note, {
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



    // Add "collab" helper

    $app.utils.computed(note, 'collab', () => $app.notes.collab[note.id])




    $app.notes.observeIds($app.notes.collab[note.id].childIds, note.id)




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
      return document.getElementById(`note-${note.id}-${part}`)
  }




  notes.getClientRect = (note, part) => {
    const node = $app.notes.getNode(note, part ?? 'frame')

    const domClientRect = node.getBoundingClientRect()
  
    return $app.rects.fromDOM(domClientRect)
  }
}