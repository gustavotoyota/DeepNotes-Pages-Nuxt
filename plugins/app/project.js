export const init = ({ $app, $axios }) => {
  const project = $app.project = {}




  $app.utils.ref('project.path')
  $app.utils.ref('project.recent')




  project.init = async () => {
    const data = (await $axios.post('/api/projects/data')).data

    $app.project.path = data.path
    $app.project.recent = data.recent
  }
}