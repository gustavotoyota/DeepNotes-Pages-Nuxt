import Vue from 'vue'



export const init = ({ $app }) => {
  const selection = $app.selection = {}




  $app.utils.ref('selection.noteIds', () => ({}))
  $app.utils.ref('selection.arrowIds', () => ({}))

  $app.utils.computed(selection, 'elemIds', () =>
    $app.selection.noteIds.concat($app.selection.arrowIds))




  $app.utils.computed(selection, 'notes', () => 
    Object.keys($app.selection.noteIds).map(noteId => $app.elems.map[noteId]))
  $app.utils.computed(selection, 'arrows', () => 
    Object.keys($app.selection.arrowIds).map(arrowId => $app.elems.map[arrowId]))
  




  selection.clear = (regionId) => {
    $app.selection.noteIds = {}
    $app.selection.arrowIds = {}

    $app.activeElem.clear()

    if (regionId !== undefined)
      $app.region.id = regionId
  }




  selection.has = (elem) => {
    return elem.id in $app.selection[`${elem.type}Ids`]
  }




  selection.add = (elem) => {
    $app.selection[`${elem.type}Ids`][elem.id] = true
  }




  selection.remove = (elem) => {
    Vue.delete($app.selection[`${elem.type}Ids`], elem.id)
  }




  selection.set = (elem) => {
    $app.selection.clear()
    $app.selection.add(elem)
  }
}