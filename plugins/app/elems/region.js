import { ssrRef } from "@nuxtjs/composition-api"




export const init = ({ $app }) => {
  const region = $app.region = {}



  
  $app.utils.ref(region, 'id', 'region.id', () => null)




  $app.utils.computed(region, 'elem', () => {
    return $app.elems.getById($app.region.id)
  })




  $app.utils.computed(region, 'noteIds', () => {
    if ($app.region.id == null)
      return $app.collab.page.noteIds
    else
      return $app.region.elem.collab.childIds
  })
}