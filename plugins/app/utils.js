import { ssrRef } from '@nuxtjs/composition-api'




export const init = ({ $app }) => {
  const utils = $app.utils = {}




  utils.ref = (refKey, refValue) => {
    const auxRef = ssrRef(refValue ?? (() => null), refKey)

    const obj = $app[refKey.split('.')[0]]
    const key = refKey.split('.').at(-1)

    Object.defineProperty(obj, key, {
      get() { return auxRef.value },
      set(value) { return auxRef.value = value },
    })
  }
}