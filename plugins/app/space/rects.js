export const init = ({ $app }) => {
  const rects = $app.rects = {}




  rects.fromDisplay = () => {
    const node = document.getElementById('display')

    const domClientRect = node.getBoundingClientRect()

    return $app.rects.fromDOM(domClientRect)
  }




  rects.fromDOM = (domRect) => {
    return {
      start: { x: domRect.left, y: domRect.top },
      end: { x: domRect.right, y: domRect.bottom },
      size: { x: domRect.width, y: domRect.height },
    }
  }
  rects.fromStartEnd = (start, end) => {
    return {
      start: $static.utils.deepCopy(start),
      end: $static.utils.deepCopy(end),
      size: { x: end.x - start.x, y: end.y - start.y },
    }
  }
  rects.fromStartSize = (start, size) => {
    return {
      start: $static.utils.deepCopy(start),
      end: { x: start.x + size.x, y: start.y + size.y },
      size: $static.utils.deepCopy(size),
    }
  }




  rects.clientToWorld = (clientRect) => {
    return {
      start: $app.pos.clientToWorld(clientRect.start),
      end: $app.pos.clientToWorld(clientRect.end),
      size: $app.sizes.screenToWorld2D(clientRect.size),
    }
  }
  rects.worldToClient = (clientRect) => {
    return {
      start: $app.pos.worldToClient(clientRect.start),
      end: $app.pos.worldToClient(clientRect.end),
      size: $app.sizes.worldToScreen2D(clientRect.size),
    }
  }




  rects.displayToWorld = (displayRect) => {
    return {
      start: $app.pos.displayToWorld(displayRect.start),
      end: $app.pos.displayToWorld(displayRect.end),
      size: $app.sizes.screenToWorld2D(displayRect.size),
    }
  }
  rects.worldToDisplay = (displayRect) => {
    return {
      start: $app.pos.worldToDisplay(displayRect.start),
      end: $app.pos.worldToDisplay(displayRect.end),
      size: $app.sizes.worldToScreen2D(displayRect.size),
    }
  }




  rects.displayToClient = (displayRect) => {
    return {
      start: $app.pos.displayToClient(displayRect.start),
      end: $app.pos.displayToClient(displayRect.end),
      size: $static.utils.deepCopy(displayRect.size),
    }
  }
  rects.clientToDisplay = (displayRect) => {
    return {
      start: $app.pos.clientToDisplay(displayRect.start),
      end: $app.pos.clientToDisplay(displayRect.end),
      size: $static.utils.deepCopy(displayRect.size),
    }
  }




  rects.updateSize = (rect) => {
    rect.size = {
      x: rect.end.x - rect.start.x,
      y: rect.end.y - rect.start.y,
    }
  }
  rects.updateEnd = (rect) => {
    rect.end = {
      x: rect.start.x + rect.size.x,
      y: rect.start.y + rect.size.y,
    }
  }
}
