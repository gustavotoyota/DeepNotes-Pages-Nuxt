export const init = () => {
  const nuxt = $static.nuxt = {}



  
  nuxt.makeComputed = (obj, key, options) => {
    const aux = computed(options)

    Object.defineProperty(obj, key, {
      get() { return aux.value },
      set(value) { aux.value = value }, 
    })
  }
}