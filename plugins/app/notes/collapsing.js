export const init = ({ $app }) => {
  const collapsing = $app.collapsing = {}




  collapsing.expand = (note) => {
    note.collab.collapsed = false
    
    $app.notes.bringToTop(note)
  }
  collapsing.collapse = (note) => {
    if (!note.collab.collapsible)
      return
  
    note.collab.collapsed = true
    
    $app.notes.bringToTop(note)
  }



  collapsing.set = (note, collapsed) => {
    if (collapsed === note.collab.collapsed)
      return
  
    if (collapsed)
      $app.collapsing.collapse(note)
    else
      $app.collapsing.expand(note)
  }



  collapsing.toggle = (note) => {
    $app.collapsing.set(note, !note.collab.collapsed)
  }
}