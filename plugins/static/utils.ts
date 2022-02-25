export {
  StaticUtils,
}




class StaticUtils {
  hasVertScrollbar(elem: HTMLElement) {
    return elem.scrollHeight > elem.clientHeight
      && elem.offsetWidth > elem.clientWidth
  }
  hasHorizScrollbar(elem: HTMLElement) {
    return elem.scrollWidth > elem.clientWidth
      && elem.offsetHeight > elem.clientHeight
  }




  isMouseOverScrollbar(event: PointerEvent) {
    const elem = event.target as HTMLElement

    if (this.hasHorizScrollbar(elem)
    && event.offsetY > elem.clientHeight) 
      return true

    if (this.hasVertScrollbar(elem)
    && event.offsetX > elem.clientWidth)
      return true

    return false
  }




  capitalizeFirst(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}