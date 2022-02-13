import {
  onMounted,
  onUnmounted,
} from "@nuxtjs/composition-api"




export default async function (context, inject) {
  const { $app, app } = context




  inject('context', context)




	app.mixins = (app.mixins ?? []).concat({
    async setup() {
      // Release pointer down for touchscreen
  
      onMounted(() => {
        document.addEventListener('pointerdown', onPointerDownCapture, true)
      })
  
      function onPointerDownCapture(event) {
        event.target.releasePointerCapture(event.pointerId)
      }
  
      onUnmounted(() => {
        document.removeEventListener('pointerdown', onPointerDownCapture, true)
      })
  
  
  
  
  
      // Pointer move
  
      onMounted(() => {
        document.addEventListener('pointermove', onPointerMove)
      })
  
      function onPointerMove(event) {
        $app.panning.update(event)
        
        $app.boxSelection.update(event)
        $app.dragging.update(event)
      }
  
      onUnmounted(() => {
        document.removeEventListener('pointermove', onPointerMove)
      })
  
  
  
  
  
      // Pointer up
  
      onMounted(() => {
        document.addEventListener('pointerup', onPointerUp)
      })
  
      function onPointerUp(event) {
        $app.panning.finish(event)
        
        $app.boxSelection.finish(event)
        $app.dragging.finish(event)
      }
  
      onUnmounted(() => {
        document.removeEventListener('pointerup', onPointerUp)
      })




      // Shortcuts

      onMounted(() => {
        document.addEventListener('keydown', onKeyDown)
      })

      function onKeyDown(event) {
        if (event.target.nodeName === 'INPUT'
        || event.target.nodeName === 'TEXTAREA'
        || event.target.isContentEditable)
          return
        
        if (event.code === 'Delete')
          $app.deleting.perform(event)
      }

      onUnmounted(() => {
        document.removeEventListener('keydown', onKeyDown)
      })



      
      await $app.project.init()
    }
  })
}