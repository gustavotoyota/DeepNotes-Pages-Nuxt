export const init = ({ $app  }) => {
  const dragging = $app.dragging = {}




  dragging.minDistance = 5
  
  


  $app.utils.ref(dragging, 'dragging.data', () => null)
  
  


  }
  dragging.update = (event) => {
  }
  dragging.finish = (event) => {
  }
}