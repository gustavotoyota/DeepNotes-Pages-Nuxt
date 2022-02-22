import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"
import { onBeforeUnmount, onMounted, watch } from "@nuxtjs/composition-api"
import { openDB } from 'idb'
import { Note } from "./notes/notes"





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
  
      onBeforeUnmount(() => {
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
  
      onBeforeUnmount(() => {
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
  
      onBeforeUnmount(() => {
        document.removeEventListener('pointerup', onPointerUp)
      })




      // Shortcuts

      onMounted(() => {
        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('keypress', onKeyPress)
      })

      function onKeyDown(event: KeyboardEvent) {
        if ((event.target as HTMLElement).isContentEditable
        && event.code === 'Escape')
          ctx.$app.editing.stop()

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

        if (event.code === 'F2' && ctx.$app.activeElem.exists)
          ctx.$app.editing.start(ctx.$app.activeElem.get as Note)

        if (event.code === 'ArrowLeft')
          ctx.$app.selection.shift(-1, 0)
        if (event.code === 'ArrowRight')
          ctx.$app.selection.shift(1, 0)
        if (event.code === 'ArrowUp')
          ctx.$app.selection.shift(0, -1)
        if (event.code === 'ArrowDown')
          ctx.$app.selection.shift(0, 1)
      }
      function onKeyPress(event: KeyboardEvent) {
        if ((event.target as HTMLElement).nodeName === 'INPUT'
        || (event.target as HTMLElement).nodeName === 'TEXTAREA'
        || (event.target as HTMLElement).isContentEditable)
          return
          
        if (ctx.$app.activeElem.exists)
          ctx.$app.editing.start(ctx.$app.activeElem.get as Note)
      }

      onBeforeUnmount(() => {
        document.removeEventListener('keypress', onKeyPress)
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