export const init = ({ $app }) => {
  const selection = $app.selection = {}




  selection.clear = (regionId) => {
    // Clear selected map
    $state.page.elems.selected = {}


    // Clear active element
    $app.activeElem.clear()


    // Reset region ID
    if (regionId !== undefined)
      $state.page.elems.regionId = regionId
  }



  selection.has = (elem) => {
    // Check same region
    if (elem.parentId != $getters.regionId)
      return false

    // Check if in selection map
    if (!(elem.id in $state.page.elems.selected))
      return false

    return true
  }




  selection.add = (elem) => {
    // Skip if already selected
    if ($app.selection.has(elem))
      return

      

    // If different region
    // Clear selection and reset region
    if (elem.parentId != $getters.regionId)
      $app.selection.clear(elem.parentId)



    // Include element in selected map
    $set($state.page.elems.selected, elem.id, true)



    // If there's no currently active element
    // Set as active element
    if ($getters.elemId == null)
      $app.activeElem.set(elem, false)
  }




  selection.remove = (elem) => {
    // Skip if not selected
    if (!$app.selection.has(elem))
      return



    // Skip if element outside current region
    if (elem.parentId != $getters.regionId)
      return


    
    // Remove element from selected map
    $delete($state.page.elems.selected, elem.id)



    // If it was the active element
    if ($app.activeElem.is(elem)) {
      // Determine new active element
      if ($getters.elems.length === 0)
        $app.activeElem.clear()
      else
        $app.activeElem.set($getters.elems.at(-1))
    }
  }





  selection.set = (elem) => {
    // Clear selection and reset region
    $app.selection.clear(elem.parentId)

    // Add element to selection
    $app.selection.add(elem)
  }
}