import { reactive } from "@nuxtjs/composition-api"

export const init = ({ $app }) => {
  const project = $app.project = {}




  project.path = reactive([])
  project.recent = reactive([])
}