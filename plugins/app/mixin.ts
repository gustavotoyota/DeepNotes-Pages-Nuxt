import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"
import {
  onMounted,
  onUnmounted,
} from "@nuxtjs/composition-api"




export default async function (context: Context, inject: Inject) {
  const { $app, app } = context




  inject('context', context)




	app.mixins = (app.mixins ?? []).concat({
    // @ts-ignore
    async setup() {
      // Release pointer down for touchscreen
  
      onMounted(() => {
        document.addEventListener('pointerdown', onPointerDownCapture, true)
      })
  
      function onPointerDownCapture(event: PointerEvent) {
        (event.target as Element).releasePointerCapture(event.pointerId)
      }
  
      onUnmounted(() => {
        document.removeEventListener('pointerdown', onPointerDownCapture, true)
      })
  
  
  
  
  
      // Pointer move
  
      onMounted(() => {
        document.addEventListener('pointermove', onPointerMove)
      })
  
      function onPointerMove(event: PointerEvent) {
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
  
      function onPointerUp(event: PointerEvent) {
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

      function onKeyDown(event: KeyboardEvent) {
        if ((event.target as HTMLElement).nodeName === 'INPUT'
        || (event.target as HTMLElement).nodeName === 'TEXTAREA'
        || (event.target as HTMLElement).isContentEditable)
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