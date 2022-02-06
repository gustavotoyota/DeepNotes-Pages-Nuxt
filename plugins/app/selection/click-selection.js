export const init = ({ $app }) => {
  const clickSelection = $app.clickSelection = {}




  clickSelection.perform = (elem, event) => {
    // Clear selection if not holding Ctrl or Shift
    // And the clicked element is not selected

    if (!event.ctrlKey && !event.shiftKey && !$app.selection.has(elem))
      $app.selection.clear(elem.parentId)



    
    // Remove element if selected and holding Ctrl
    // Else, just change the active element

    if (event.ctrlKey && $app.selection.has(elem))
      $app.selection.remove(elem)
    else
      $app.activeElem.set(elem)
  }
}