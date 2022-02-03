export const init = () => {
  const nuxt = $static.nuxt = {}



  
  nuxt.computed = (obj, key, options) => {
    const aux = computed(options)

    Object.defineProperty(obj, key, {
      get() { return aux.value },
      set(value) { aux.value = value }, 
    })
  }
}