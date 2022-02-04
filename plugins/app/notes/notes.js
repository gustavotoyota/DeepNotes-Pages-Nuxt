import { v4 as uuidv4 } from 'uuid'

import { reactive } from '@nuxtjs/composition-api'




export const init = (context) => {
  const { $app } = context




  const notes = $app.notes = {}




  let zIndex = 0




  notes.map = reactive({})




  notes.create = ({ id, parentId, clientPos, local }) => {
    const note = $app.elems.create({ type: 'note' })

    $static.utils.merge(note, {
      id: id ?? uuidv4(),
      
      parentId: parentId ?? null,

      children: [],

      zIndex: zIndex++,
    })




    if (local) {
      $app.collab.store.notes[note.id] = {
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
        childIds: [],
      }
    }




    $app.notes.map[note.id] = note




    return note
  }
}