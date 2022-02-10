import Vue from 'vue'




export const init = ({ $app }) => {
  const editing = $app.editing = {}




  $app.utils.ref('editing.active')




  editing.reset = () => {
    $app.editing.active = false
  }




  editing.start = (note, section) => {
    if (note.editing)
      return

    if (note.collab.readOnly)
      return



    $app.selection.clear()
    $app.activeElem.set(note)



    $app.editing.section = section
    $app.editing.active = true
  }



  
  editing.stop = () => {
    $app.editing.active = false
  }
}