const mixin = {
  setup() {
    $app.reset()
  }
}




export default async function ({ app }) {
	app.mixins = app.mixins ?? []
  app.mixins.push(mixin)
}