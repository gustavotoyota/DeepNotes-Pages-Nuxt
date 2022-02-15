import { computed, ComputedGetter, ssrRef, WritableComputedOptions } from '@nuxtjs/composition-api'
import Vue from 'vue'




class StaticVue {
  ref(obj: object, refKey: string, refValue?: () => any) {
    const auxRef = ssrRef(refValue ?? (() => null), refKey)

    const key = refKey.split('.').at(-1) ?? ''

    Object.defineProperty(obj, key, {
      get() { return auxRef.value },
      set(value) { return auxRef.value = value },
    })
  }


  

  computed<T>(obj, key, options) {
    const auxComputed = computed(options) as any
  
    Object.defineProperty(obj, key, {
      get() { return auxComputed.value },
      set(value) { auxComputed.value = value }, 
    })
  }




  assign(target, source) {
    for (const key of Object.keys(source))
      Vue.set(target, key, source[key])
  }



  
  merge(target, ...sources) {
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

export type {
  StaticVue,
}




export const init = () => {
  return new StaticVue()
}