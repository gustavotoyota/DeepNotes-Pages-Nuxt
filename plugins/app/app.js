globalThis.$app = {}
export default (context, inject) => inject('app', $app)




$app.project = require('./project').default

$app.pages = require('./pages').default