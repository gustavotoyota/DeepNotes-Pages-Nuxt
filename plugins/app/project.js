export const init = (context) => {
  const { $app, $axios } = context

  const project = $app.project = {}




  $app.utils.ref(project, 'path', 'project.path', () => [])
  $app.utils.ref(project, 'recent', 'project.recent', () => [])




  project.init = async () => {
    const data = (await $axios.post('/api/projects/data')).data

    $app.project.path = data.path
    $app.project.recent = data.recent
  }
}