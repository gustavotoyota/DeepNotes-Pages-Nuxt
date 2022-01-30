const project = {}
export default project




project.reset = () => {
  $set($state, 'project', {
    pages: {
      list: [],

      path: [],
      depth: -1,

      recent: [],
    },
  })



  $app.pages.create('Main page')
}