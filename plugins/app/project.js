export const init = async ({ $app, $axios, route }) => {
  const project = $app.project = {}




  $static.vue.ref(project, 'project.path')
  $static.vue.ref(project, 'project.recent')




  project.init = async () => {
    const data = (await $axios.post('/api/project/data', {
      pageId: route.params.page_id,
    })).data

    $app.project.path = data.path
    $app.project.recent = data.recent
  }




  project.bumpRecentPage = (page) => {
    const index = $app.project.recent.findIndex(item => item.id === page.id)
    if (index >= 0)
      $app.project.recent.splice(index, 1)

    $app.project.recent.push(page)
  }
}