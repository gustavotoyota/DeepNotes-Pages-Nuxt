import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"
import {
  onMounted,
  onUnmounted,
  watch,
} from "@nuxtjs/composition-api"

import { openDB } from 'idb'




export default async function (ctx: Context, inject: Inject) {
  inject('ctx', ctx)




	ctx.app.mixins = (ctx.app.mixins ?? []).concat({
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
        ctx.$app.panning.update(event)
        
        ctx.$app.boxSelection.update(event)

        ctx.$app.dragging.update(event)
        ctx.$app.resizing.update(event)
      }
  
      onUnmounted(() => {
        document.removeEventListener('pointermove', onPointerMove)
      })
  
  
  
  
  
      // Pointer up
  
      onMounted(() => {
        document.addEventListener('pointerup', onPointerUp)
      })
  
      function onPointerUp(event: PointerEvent) {
        ctx.$app.panning.finish(event)
        
        ctx.$app.boxSelection.finish(event)

        ctx.$app.dragging.finish(event)
        ctx.$app.resizing.finish(event)
      }
  
      onUnmounted(() => {
        document.removeEventListener('pointerup', onPointerUp)
      })




      // Shortcuts

      onMounted(() => {
        document.addEventListener('keydown', onKeyDown)
      })

      function onKeyDown(event: KeyboardEvent) {
        if (event.ctrlKey && event.code === 'KeyD')
          event.preventDefault()

        if ((event.target as HTMLElement).nodeName === 'INPUT'
        || (event.target as HTMLElement).nodeName === 'TEXTAREA'
        || (event.target as HTMLElement).isContentEditable)
          return
        
        if (event.code === 'Delete')
          ctx.$app.deleting.perform()

        if (event.ctrlKey && event.code === 'KeyA')
          ctx.$app.selection.selectAll()

        if (event.ctrlKey && event.code === 'KeyD')
          ctx.$app.cloning.perform()
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

        watch(() => ctx.$app.project.path, async () => {
          await db.put('path', ctx.$app.project.path, 'value')
        }, { deep: true, immediate: true })

        watch(() => ctx.$app.project.recent, async () => {
          await db.put('recent', ctx.$app.project.recent, 'value')
        }, { deep: true, immediate: true })
      })



      
      await ctx.$app.project.init()
    }
  })
}