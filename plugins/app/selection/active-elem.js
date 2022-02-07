export const init = ({ $app }) => {
  const activeElem = $app.activeElem = {}




  $app.utils.ref('activeElem.id', () => null)




  $app.utils.computed(activeElem, 'exists',
    () => $app.activeElem.id != null)

  
  
  
  activeElem.is = (elem) => {
    return elem.id === $app.activeElem.id
  }




  activeElem.clear = () => {
    $app.activeElem.id = null
  }




  activeElem.set = (elem) => {
    if (elem == null) {
      $app.activeElem.clear()
      return
    }

    $app.selection.add(elem)
    
    $app.activeElem.id = elem.id
  }
}