import { computed, ref, ssrRef } from '@nuxtjs/composition-api'
import Vue from 'vue'




export {
  StaticVue,
}




class StaticVue {
  ref(obj: object, key: string, refValue: any) {
    const auxRef = ref(refValue)

    Object.defineProperty(obj, key, {
      get() { return auxRef.value },
      set(value) { return auxRef.value = value },
    })
  }




  ssrRef(obj: object, refKey: string, refValue: () => any) {
    const auxRef = ssrRef(refValue, refKey)

    const key = refKey.split('.').at(-1) ?? ''

    Object.defineProperty(obj, key, {
      get() { return auxRef.value },
      set(value) { return auxRef.value = value },
    })
  }


  

  computed(obj: object, key: string, options: any) {
    const auxComputed = computed(options) as any
  
    Object.defineProperty(obj, key, {
      get() { return auxComputed.value },
      set(value) { auxComputed.value = value }, 
    })
  }




  assign(target: object, source: any) {
    for (const key of Object.keys(source))
      Vue.set(target, key, source[key])
  }



  
  merge(target: any, ...sources: any[]) {
    for (const source of sources) {
      for (const [key, value] of Object.entries(source)) {
        if (value != null && (value as any).constructor === Object)
          Vue.set(target, key, $static.vue.merge(target[key] ?? {}, value))
        else
          Vue.set(target, key, value)
      }
    }
  
    return target
  }
}