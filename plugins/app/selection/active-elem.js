import { computed, ssrRef } from "@nuxtjs/composition-api"




export const init = ({ $app }) => {
  const activeElem = $app.activeElem = {}




  const activeElemRef = ssrRef(() => null, 'activeElem')




  $app.utils.computed(activeElem, 'get', () => {
    return activeElemRef.value
  })
  
  
  
  activeElem.is = (elem) => {
    return elem.id == $app.activeElem.get
  }




  activeElem.clear = () => {
    activeElemRef.value = null
  }




  activeElem.set = (elem, bringToTop) => {
  }
  activeElem.setExclusive = (elem) => {
  }
}