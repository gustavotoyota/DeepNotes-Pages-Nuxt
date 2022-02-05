import {
  onMounted,
  onUnmounted,
} from "@nuxtjs/composition-api"




export default async function (context, inject) {
  const { $app, app } = context




  inject('context', context)




	app.mixins = (app.mixins ?? []).concat({
    async setup(_, { root }) {
      context.$root = root
      context.$set = root.$set
      context.$delete = root.$delete
      context.$watch = root.$watch
      context.$nextTick = root.$nextTick
  
      
  
      
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
      }
  
      onUnmounted(() => {
        document.removeEventListener('pointerup', onPointerUp)
      })




      // Initialize app

      await $app.init()
    }
  })
}