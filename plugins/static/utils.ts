export type {
  StaticUtils,
}




class StaticUtils {
  deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj))
  }
  shallowCopy(obj: object) {
    if (Array.isArray(obj))
      return obj.slice()

    if (obj != null && obj.constructor == Object)
      return Object.assign({}, obj)

    return obj
  }




  merge(target: any, ...objs: object[]) {
    for (const obj of objs) {
      for (const [key, value] of Object.entries(obj)) {
        if (value != null && value.constructor === Object)
          target[key] = $static.utils.merge(target[key] ?? {}, value)
        else
          target[key] = value
      }
    }

    return target
  }
  merged(...objs: object[]) {
    const result = {} as any
    
    for (const obj of objs) {
      for (const [key, value] of Object.entries(obj)) {
        if (value != null && value.constructor === Object)
          result[key] = $static.utils.merged(result[key] ?? {}, value)
        else
          result[key] = value
      }
    }
    
    return result
  }




  removeFromArray(array: any[], item: any) {
    const index = array.indexOf(item)
    return array.splice(index, 1)[0]
  }




  hasVertScrollbar(node: HTMLElement) {
    return node.scrollHeight > node.clientHeight
      && node.offsetWidth > node.clientWidth
  }
  hasHorizScrollbar(node: HTMLElement) {
    return node.scrollWidth > node.clientWidth
      && node.offsetHeight > node.clientHeight
  }




  capitalizeFirst(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}




export const init = () => {
  return new StaticUtils()
}