export const init = ({ $app }) => {
  const region = $app.region = {}



  
  $app.utils.ref('region.id', () => null)




  $app.utils.computed(region, 'parent', () => {
    return $app.elems.map[$app.region.id] ?? null
  })




  $app.utils.computed(region, 'noteIds', () => {
    if ($app.region.id == null)
      return $app.page.collab.noteIds
    else
      return $app.collab.store.notes[$app.region.id].childIds
  })


  
  $app.utils.computed(region, 'notes', () => 
    $app.region.noteIds.map(noteId => $app.elems.map[noteId]))
}