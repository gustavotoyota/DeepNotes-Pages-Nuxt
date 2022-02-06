import { getYjsValue, SyncedXml } from "@syncedstore/core"

export const init = (context) => {
  const { $app } = context




  const notes = $app.notes = {}




  $app.utils.ref('notes.map', () => ({}))




  let zIndex = 0

  notes.create = ({ id, parentId, clientPos, local }) => {
    const { $set } = context
    



    if (id in $app.notes.map)
      return




    const note = $app.elems.create({ id, type: 'note' })

    $set($app.notes.map, note.id, note)




    // Add private information

    $static.utils.merge(note, {
      parentId: parentId ?? null,

      zIndex: zIndex++,
    })




    // Add collaboration information

    if (local) {
      $set($app.collab.store.notes, note.id, {
        linkedPageId: null,

        anchor: { x: 0.5, y: 0.5 },

        pos: clientPos ?
          $app.pos.clientToWorld(clientPos) : { x: 0, y: 0 },

        hasTitle: false,
        hasBody: true,
        
        title: new SyncedXml(),
        body: new SyncedXml(),

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
        $app.collab.store.page.noteIds.push(note.id)
      else
        $app.collab.store.notes[parentId].childIds.push(note.id)
    }



    // Add "collab" helper

    $app.utils.computed(note, 'collab', () => $app.collab.store.notes[note.id])




    $app.notes.observeIds($app.collab.store.notes[note.id].childIds, note.id)




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
            context.$delete($app.notes.map, id)
        }
      }
    })
  }




  notes.createFromIds = (ids, parentId) => {
    for (const id of ids) {
      $app.notes.create({ id, parentId })

      $app.notes.createFromIds($app.collab.store.notes[id].childIds, id)
    }
  }




  notes.bringToTop = (note) => {
    note.zIndex = zIndex++
  }
}