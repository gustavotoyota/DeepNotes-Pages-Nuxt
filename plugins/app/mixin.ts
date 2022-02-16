import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"
import {
  onMounted,
  onUnmounted,
  watch,
} from "@nuxtjs/composition-api"

import { openDB } from 'idb'




export default async function (ctx: Context, inject: Inject) {
  const { $app, app } = ctx




  inject('ctx', ctx)




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




      // Maintain IndexedDB
      
      onMounted(async () => {
        const db = await openDB(`user-${ctx.$auth.user?.userId}`, 1, {
          upgrade(db, oldVersion, newVersion, transaction) {
            db.createObjectStore('path')
            db.createObjectStore('recent')
          },
        })

        watch(() => $app.project.path, async () => {
          await db.put('path', $app.project.path, 'value')
        }, { deep: true, immediate: true })

        watch(() => $app.project.recent, async () => {
          await db.put('recent', $app.project.recent, 'value')
        }, { deep: true, immediate: true })
      })



      
      await $app.project.init()
    }
  })
}