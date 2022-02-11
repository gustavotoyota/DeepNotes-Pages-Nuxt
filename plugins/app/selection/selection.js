import Vue from 'vue'



export const init = ({ $app }) => {
  const selection = $app.selection = {}




  $static.vue.ref(selection, 'selection.noteIds')
  $static.vue.ref(selection, 'selection.arrowIds')




  $static.vue.computed(selection, 'elemIds', () =>
    Object.keys($app.selection.noteIds).concat(
      Object.keys($app.selection.arrowIds)))
  $static.vue.computed(selection, 'notes', () => 
    $app.activeRegion.notes.filter(note => $app.selection.has(note)))
  $static.vue.computed(selection, 'arrows', () => 
    $app.page.arrows.filter(arrow => $app.selection.has(arrow)))
  $static.vue.computed(selection, 'elems', () => 
    $app.selection.arrows.concat($app.selection.notes))




  selection.reset = () => {
    $app.selection.noteIds = {}
    $app.selection.arrowIds = {}
  }




  selection.clear = (activeRegionId) => {
    $app.selection.noteIds = {}
    $app.selection.arrowIds = {}

    $app.activeElem.clear()

    if (activeRegionId !== undefined)
      $app.activeRegion.id = activeRegionId
  }




  selection.has = (elem) => {
    return elem.id in $app.selection[`${elem.type}Ids`]
  }




  selection.add = (elem) => {
    if ($app.selection.has(elem))
      return

    if (elem.parentId != $app.activeRegion.id)
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