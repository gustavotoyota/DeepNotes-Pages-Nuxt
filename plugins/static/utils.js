export const init = () => {
  const utils = $static.utils = {}



  
  utils.deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
  }
  utils.shallowCopy = (obj) => {
    if (Array.isArray(obj))
      return obj.slice()

    if (obj != null && obj.constructor == Object)
      return Object.assign({}, obj)

    return obj
  }




  utils.merge = (target, ...objs) => {
    for (const obj of objs) {
      for (const [key, value] of Object.entries(obj)) {
        if (value != null && value.constructor === Object)
          target[key] = utils.merge(target[key] ?? {}, value)
        else
          target[key] = value
      }
    }

    return target
  }
  utils.merged = (...objs) => {
    const result = {}
    
    for (const obj of objs) {
      for (const [key, value] of Object.entries(obj)) {
        if (value != null && value.constructor === Object)
          result[key] = utils.merged(result[key] ?? {}, value)
        else
          result[key] = value
      }
    }
    
    return result
  }




  utils.removeFromArray = (array, item) => {
    const index = array.indexOf(item)
    return array.splice(index, 1)[0]
  }




  utils.hasVertScrollbar = (node) => {
    return node.scrollHeight > node.clientHeight
      && node.offsetWidth > node.clientWidth
  }
  utils.hasHorizScrollbar = (node) => {
    return node.scrollWidth > node.clientWidth
      && node.offsetHeight > node.clientHeight
  }




  utils.capitalizeFirst = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}