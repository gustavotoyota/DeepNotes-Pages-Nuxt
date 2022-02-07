import Vue from 'vue'



export const init = ({ $app }) => {
  const selection = $app.selection = {}




  $app.utils.ref('selection.noteIds', () => ({}))
  $app.utils.ref('selection.arrowIds', () => ({}))

  $app.utils.computed(selection, 'elemIds', () =>
    Object.keys($app.selection.noteIds).concat(
      Object.keys($app.selection.arrowIds)))




  $app.utils.computed(selection, 'notes', () => 
    $app.region.notes.filter(note => $app.selection.has(note)))
  $app.utils.computed(selection, 'arrows', () => 
    $app.page.arrows.filter(arrow => $app.selection.has(arrow)))
  $app.utils.computed(selection, 'elems', () => 
    $app.selection.arrows.concat($app.selection.notes))
  




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
    if ($app.selection.has(elem))
      return

    if (elem.parentId != $app.region.id)
      $app.selection.clear(elem.parentId)

    Vue.set($app.selection[`${elem.type}Ids`], elem.id, true)
    
    if (!$app.activeElem.exists)
      $app.activeElem.set(elem)
  }
  selection.remove = (elem) => {
    if (!$app.selection.has(elem))
      return

    Vue.delete($app.selection[`${elem.type}Ids`], elem.id)

    if ($app.activeElem.is(elem))
      $app.activeElem.set($app.selection.elems.at(-1))
  }




  selection.set = (elem) => {
    $app.selection.clear()
    $app.selection.add(elem)
  }
}