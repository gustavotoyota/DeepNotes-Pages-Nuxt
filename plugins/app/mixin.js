const mixin = {
  setup() {
    
  }
}




export default async function ({ app }) {
	app.mixins = app.mixins ?? []
  app.mixins.push(mixin)
}