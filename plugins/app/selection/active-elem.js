export const init = ({ $app }) => {
  const activeElem = $app.activeElem = {}




  $app.utils.ref('activeElem.id', () => null)




  $static.vue.computed(activeElem, 'exists',
    () => $app.activeElem.id != null)
  $static.vue.computed(activeElem, 'get',
    () => $app.elems.map[$app.activeElem.id])

  
  
  
  activeElem.is = (elem) => {
    return elem.id === $app.activeElem.id
  }




  activeElem.clear = () => {
    $app.activeElem.id = null
  }




  activeElem.set = (elem, bringToTop) => {
    if ($app.activeElem.is(elem))
      return
      
    if (elem == null) {
      $app.activeElem.clear()
      return
    }

    $app.selection.add(elem)
    
    $app.activeElem.id = elem.id
  
    if (bringToTop !== false)
      $app.notes.bringToTop(elem)
  }
}