export const init = ({ $app }) => {
  const activeRegion = $app.activeRegion = {}



  
  $static.vue.ref(activeRegion, 'activeRegion.id')




  activeRegion.reset = () => {
    $app.activeRegion.id = null
  }




  $static.vue.computed(activeRegion, 'parent', () => {
    return $app.elems.map[$app.activeRegion.id] ?? null
  })




  $static.vue.computed(activeRegion, 'noteIds', () => {
    if ($app.activeRegion.id == null)
      return $app.page.collab.noteIds
    else
      return $app.notes.collab[$app.activeRegion.id].childIds
  })
  $static.vue.computed(activeRegion, 'notes', () => 
    $app.activeRegion.noteIds.map(noteId => $app.elems.map[noteId]))
}