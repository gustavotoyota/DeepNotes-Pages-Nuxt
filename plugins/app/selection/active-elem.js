export const init = ({ $app }) => {
  const activeElem = $app.activeElem = {}




  activeElem.clear = () => {
    $state.page.elems.activeId = null
  }
}