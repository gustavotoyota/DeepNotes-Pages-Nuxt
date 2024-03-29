export class StaticClipboard {
  async get (): Promise<string> {
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




  set(text: string) {
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
      selection?.removeAllRanges()
      range.selectNode(elem)
      selection?.addRange(range)
  
      document.execCommand('copy')
  
      selection?.removeAllRanges()
      document.body.removeChild(elem)
      
      return
    }
  }
}