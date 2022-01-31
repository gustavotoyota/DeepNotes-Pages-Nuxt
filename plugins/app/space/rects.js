const rects = module.exports = {}




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
    start: $utils.deepCopy(start),
    end: $utils.deepCopy(end),
    size: { x: end.x - start.x, y: end.y - start.y },
  }
}
rects.fromStartSize = (start, size) => {
  return {
    start: $utils.deepCopy(start),
    end: { x: start.x + size.x, y: start.y + size.y },
    size: $utils.deepCopy(size),
  }
}




rects.clientToWorld = (clientRect) => {
  return {
    start: $app.coords.clientToWorld(clientRect.start),
    end: $app.coords.clientToWorld(clientRect.end),
    size: $app.sizes.screenToWorld2D(clientRect.size),
  }
}
rects.worldToClient = (clientRect) => {
  return {
    start: $app.coords.worldToClient(clientRect.start),
    end: $app.coords.worldToClient(clientRect.end),
    size: $app.sizes.worldToScreen2D(clientRect.size),
  }
}




rects.displayToWorld = (displayRect) => {
  return {
    start: $app.coords.displayToWorld(displayRect.start),
    end: $app.coords.displayToWorld(displayRect.end),
    size: $app.sizes.screenToWorld2D(displayRect.size),
  }
}
rects.worldToDisplay = (displayRect) => {
  return {
    start: $app.coords.worldToDisplay(displayRect.start),
    end: $app.coords.worldToDisplay(displayRect.end),
    size: $app.sizes.worldToScreen2D(displayRect.size),
  }
}




rects.displayToClient = (displayRect) => {
  return {
    start: $app.coords.displayToClient(displayRect.start),
    end: $app.coords.displayToClient(displayRect.end),
    size: $utils.deepCopy(displayRect.size),
  }
}
rects.clientToDisplay = (displayRect) => {
  return {
    start: $app.coords.clientToDisplay(displayRect.start),
    end: $app.coords.clientToDisplay(displayRect.end),
    size: $utils.deepCopy(displayRect.size),
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