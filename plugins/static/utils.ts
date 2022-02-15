class StaticUtils {
  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
  shallowCopy(obj) {
    if (Array.isArray(obj))
      return obj.slice()

    if (obj != null && obj.constructor == Object)
      return Object.assign({}, obj)

    return obj
  }




  merge(target, ...objs) {
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
  merged(...objs) {
    const result = {}
    
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




  removeFromArray(array, item) {
    const index = array.indexOf(item)
    return array.splice(index, 1)[0]
  }




  hasVertScrollbar(node) {
    return node.scrollHeight > node.clientHeight
      && node.offsetWidth > node.clientWidth
  }
  hasHorizScrollbar(node) {
    return node.scrollWidth > node.clientWidth
      && node.offsetHeight > node.clientHeight
  }




  capitalizeFirst(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}

export type {
  StaticUtils,
}




export const init = () => {
  return new StaticUtils()
}