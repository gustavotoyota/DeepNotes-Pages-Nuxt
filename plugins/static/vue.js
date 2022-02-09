import { computed } from '@nuxtjs/composition-api'
import Vue from 'vue'




export const init = () => {
  const vue = $static.vue = {}


  

  vue.computed = (obj, key, options) => {
    const auxComputed = computed(options)
  
    Object.defineProperty(obj, key, {
      get() { return auxComputed.value },
      set(value) { auxComputed.value = value }, 
    })
  }




  vue.assign = (target, source) => {
    for (const key of Object.keys(source))
      Vue.set(target, key, source[key])
  }



  
  vue.merge = (target, ...sources) => {
    for (const source of sources) {
      for (const [key, value] of Object.entries(source)) {
        if (value != null && value.constructor === Object)
          Vue.set(target, key, $static.vue.merge(target[key] ?? {}, value))
        else
          Vue.set(target, key, value)
      }
    }
  
    return target
  }
}