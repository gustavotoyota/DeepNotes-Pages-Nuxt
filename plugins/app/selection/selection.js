export const init = ({ $app }) => {
  const selection = $app.selection = {}




  $app.utils.ref('selection.noteIds', () => ({}))
  $app.utils.ref('selection.arrowIds', () => ({}))

  $app.utils.computed(selection, 'elemIds',
    () => $app.selection.noteIds.concat($app.selection.arrowIds))




  selection.clear = (regionId) => {
    $app.selection.noteIds = {}
    $app.selection.arrowIds = {}

    if (regionId !== undefined)
      $app.region.id = regionId
  }




  selection.has = (elem) => {
  }




  selection.add = (elem) => {
  }




  selection.remove = (elem) => {
  }




  selection.set = (elem) => {
  }
}