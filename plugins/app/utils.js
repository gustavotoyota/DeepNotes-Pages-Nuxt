globalThis.$utils = {}
export default (context, inject) => inject('utils', $utils)




$utils.deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
$utils.shallowCopy = (obj) => {
  if (Array.isArray(obj))
    return obj.slice()

  if (obj != null && obj.constructor == Object)
    return Object.assign({}, obj)

  return obj
}




$utils.merge = (target, ...objs) => {
  for (const obj of objs) {
    for (const [key, value] of Object.entries(obj)) {
      if (value != null && value.constructor === Object)
        target[key] = $utils.merge(target[key] ?? {}, value)
      else
        target[key] = value
    }
  }

  return target
}
$utils.merged = (...objs) => {
  const result = {}
  
  for (const obj of objs) {
    for (const [key, value] of Object.entries(obj)) {
      if (value != null && value.constructor === Object)
        result[key] = $utils.merged(result[key] ?? {}, value)
      else
        result[key] = value
    }
  }
  
  return result
}




$utils.writeToClipboard = function (text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
    return
  }
  
  if (window.clipboardData) {
    clipboardData.setData('Text', text)
    return
  }

  if (document.queryCommandSupported
  && document.queryCommandSupported('copy')) {
    const elem = document.createElement('span')
  
    elem.textContent = text
  
    elem.style.whiteSpace = 'pre'
    elem.style.webkitUserSelect = 'auto'
    elem.style.userSelect = 'all'
  
    document.body.appendChild(elem)
  
    const selection = window.getSelection()
    const range = document.createRange()
    selection.removeAllRanges()
    range.selectNode(elem)
    selection.addRange(range)

    document.execCommand('copy')

    selection.removeAllRanges()
    document.body.removeChild(elem)
    
    return
  }
}
$utils.readFromClipboard = async function () {
  if (navigator.clipboard && navigator.clipboard.readText)
    return await navigator.clipboard.readText()

  if (window.clipboardData)
    return clipboardData.getData('Text')

  if (document.queryCommandSupported
  && document.queryCommandSupported('paste')) {
    const elem = document.createElement('textarea')

    document.body.appendChild(elem)

    elem.focus()

    document.execCommand('paste')

    const text = elem.value

    document.body.removeChild(elem)
    
    return text
  }

  return ''
}




$utils.removeFromArray = (array, item) => {
  const index = array.indexOf(item)
  return array.splice(index, 1)[0]
}




$utils.hasVertScrollbar = (node) => {
  return node.scrollHeight > node.clientHeight
    && node.offsetWidth > node.clientWidth
}
$utils.hasHorizScrollbar = (node) => {
  return node.scrollWidth > node.clientWidth
    && node.offsetHeight > node.clientHeight
}




$utils.capitalizeFirst = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}