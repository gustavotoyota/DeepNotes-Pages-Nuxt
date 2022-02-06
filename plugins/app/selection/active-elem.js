import { ssrRef } from "@nuxtjs/composition-api"




export const init = ({ $app }) => {
  const activeElem = $app.activeElem = {}




  $app.utils.ref('activeElem.id', () => null)

  
  
  
  activeElem.is = (elem) => {
    return elem.id == $app.activeElem.id
  }




  activeElem.clear = () => {
    $app.activeElem.id = null
  }




  activeElem.set = (elem, bringToTop) => {
    $app.activeElem.id = elem.id
  }
  activeElem.setExclusive = (elem) => {
  }
}