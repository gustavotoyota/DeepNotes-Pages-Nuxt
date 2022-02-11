export const init = ({ $app, $axios }) => {
  const project = $app.project = {}




  $static.vue.ref(project, 'project.path')
  $static.vue.ref(project, 'project.recent')




  project.init = async () => {
    const data = (await $axios.post('/api/projects/data')).data

    $app.project.path = data.path
    $app.project.recent = data.recent
  }
}