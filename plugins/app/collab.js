import syncedStore from "@syncedstore/core"




export const init = ({ $app }) => {
  const collab = $app.collab = {}
  

  

  collab.reset = ({ newPage, pageName }) => {
    $app.collab.data = syncedStore({
      page: {},
      notes: {},
      arrows: {},
    })



    if (newPage) {
      $static.utils.merge($app.collab.data.page, {
        name: pageName,
      
        noteIds: [],
        arrowIds: [],
      })
    }
  }
}