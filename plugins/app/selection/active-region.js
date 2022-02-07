export const init = ({ $app }) => {
  const activeRegion = $app.activeRegion = {}



  
  $app.utils.ref('activeRegion.id', () => null)




  $app.utils.computed(activeRegion, 'parent', () => {
    return $app.elems.map[$app.activeRegion.id] ?? null
  })




  $app.utils.computed(activeRegion, 'noteIds', () => {
    if ($app.activeRegion.id == null)
      return $app.page.collab.noteIds
    else
      return $app.notes.collab[$app.activeRegion.id].childIds
  })
  $app.utils.computed(activeRegion, 'notes', () => 
    $app.activeRegion.noteIds.map(noteId => $app.elems.map[noteId]))
}