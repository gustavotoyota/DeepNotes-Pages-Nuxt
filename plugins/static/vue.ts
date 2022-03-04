import { computed, ref, ssrRef } from '@nuxtjs/composition-api'
import Vue from 'vue'




export {
  StaticVue,
}




class StaticVue {
  ref(obj: object, fullPath: string, refValue: any) {
    const auxRef = ref(refValue)

    const key = fullPath.split('.').at(-1) ?? ''

    Object.defineProperty(obj, key, {
      get() { return auxRef.value },
      set(value) { return auxRef.value = value },
    })
  }




  ssrRef(obj: object, fullPath: string, refValue: () => any) {
    const auxRef = ssrRef(refValue, fullPath)

    const key = fullPath.split('.').at(-1) ?? ''

    Object.defineProperty(obj, key, {
      get() { return auxRef.value },
      set(value) { return auxRef.value = value },
    })
  }


  

  computed(obj: object, fullPath: string, options: any) {
    if (options instanceof Function)
      options = { get: options }

    const modifiedOptions = {
      get: () => {
        if (process.env.NODE_ENV === 'development')
          console.log(`Computed getter: ${fullPath}`)

        return options.get()
      },
      set: options.set,
    }

    const auxComputed = computed(modifiedOptions) as any

    const key = fullPath.split('.').at(-1) ?? ''
  
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