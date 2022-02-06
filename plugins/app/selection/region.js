import { ssrRef } from "@nuxtjs/composition-api"




export const init = ({ $app }) => {
  const region = $app.region = {}



  
  $app.utils.ref('region.id', () => null)




  $app.utils.computed(region, 'parent', () => {
    return $app.notes.map[$app.region.id] ?? null
  })




  $app.utils.computed(region, 'noteIds', () => {
    if ($app.region.id == null)
      return $app.collab.store.page.noteIds
    else
      return $app.collab.store.notes[$app.region.id].childIds
  })
}