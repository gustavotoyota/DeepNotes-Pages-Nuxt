import { computed, ssrRef } from '@nuxtjs/composition-api'




export const init = ({ $app }) => {
  const utils = $app.utils = {}




  utils.ref = (refKey, refValue) => {
    const auxRef = ssrRef(refValue, refKey)

    const obj = $app[refKey.split('.')[0]]
    const key = refKey.split('.').at(-1)

    Object.defineProperty(obj, key, {
      get() { return auxRef.value },
      set(value) { return auxRef.value = value },
    })
  }




  utils.computed = (obj, key, options) => {
    const auxComputed = computed(options)
  
    Object.defineProperty(obj, key, {
      get() { return auxComputed.value },
      set(value) { auxComputed.value = value }, 
    })
  }
}