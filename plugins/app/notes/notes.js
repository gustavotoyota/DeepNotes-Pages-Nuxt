import { getYjsValue } from "@syncedstore/core"

export const init = (context) => {
  const { $app } = context




  const notes = $app.notes = {}




  $app.utils.ref(notes, 'map', 'notes.map', () => ({}))




  let zIndex = 0

  notes.create = ({ id, parentId, clientPos, local }) => {
    const { $set } = context
    



    if (id in $app.notes.map)
      return




    const note = $app.elems.create({ id, type: 'note' })

    $set($app.notes.map, note.id, note)




    $static.utils.merge(note, {
      parentId: parentId ?? null,

      zIndex: zIndex++,
    })




    if (local) {
      if (parentId == null)
        $set($app.collab.store.page.noteIds, note.id, true)
      else
        $set($app.collab.store.notes[parentId].childIds, note.id, true)

      $set($app.collab.store.notes, note.id, {
        linkedPageId: null,

        anchor: { x: 0.5, y: 0.5 },

        pos: clientPos ?
          $app.pos.clientToWorld(clientPos) : { x: 0, y: 0 },

        hasTitle: false,
        hasBody: true,
        
        title: '',
        body: '',

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
        childIds: {},
      })
    }




    $app.notes.observeMap($app.collab.store.notes[note.id].childIds, note.id)




    return note
  }




  notes.observeMap = (map, parentId) => {
    getYjsValue(map).observe(event => {
      for (const [id, operation] of event.keys) {
        if (operation.action === 'add')
          $app.notes.create({ id, parentId })
        else if (operation.action === 'delete')
          context.$delete($app.notes.map, id)
      }
    })
  }




  notes.createFromMap = (map, parentId) => {
    for (const id of Object.keys(map)) {
      $app.notes.create({ id, parentId })

      $app.notes.createFromMap($app.collab.store.notes[id].childIds, id)
    }
  }
}