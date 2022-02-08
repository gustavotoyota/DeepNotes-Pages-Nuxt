import Vue from 'vue'




export const init = ({ $app }) => {
  const editing = $app.editing = {}




  $app.utils.ref('editing.active', () => false)




  editing.start = (note, section) => {
    if (note.editing)
      return

    if (note.collab.readOnly)
      return



    $app.selection.clear()
    $app.activeElem.set(note)



    $app.editing.active = true
    

    
    Vue.nextTick(() => {
      
    })
  }



  
  editing.stop = () => {
    $app.editing.active = false
  }
}