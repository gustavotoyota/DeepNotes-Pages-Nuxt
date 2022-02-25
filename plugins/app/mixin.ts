import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"
import { onBeforeUnmount, onMounted, watch } from "@nuxtjs/composition-api"
import { openDB } from 'idb'
import { Note } from "./page/notes/notes"





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
        ctx.$app.page.panning.update(event)
        
        ctx.$app.page.boxSelection.update(event)

        ctx.$app.page.dragging.update(event)
        ctx.$app.page.resizing.update(event)
      }
  
      onBeforeUnmount(() => {
        document.removeEventListener('pointermove', onPointerMove)
      })
  
  
  
  
  
      // Pointer up
  
      onMounted(() => {
        document.addEventListener('pointerup', onPointerUp)
      })
  
      function onPointerUp(event: PointerEvent) {
        if (event.button === 1 || event.pointerType !== 'mouse')
          ctx.$app.page.panning.finish(event)
        
        if (event.button === 0 || event.pointerType !== 'mouse')
          ctx.$app.page.boxSelection.finish(event)

        if (event.button === 0 || event.pointerType !== 'mouse')
          ctx.$app.page.dragging.finish(event)

        if (event.button === 0 || event.pointerType !== 'mouse')
          ctx.$app.page.resizing.finish(event)
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
          ctx.$app.page.editing.stop()

        if (event.ctrlKey && event.code === 'KeyD')
          event.preventDefault()

        if ((event.target as HTMLElement).nodeName === 'INPUT'
        || (event.target as HTMLElement).nodeName === 'TEXTAREA'
        || (event.target as HTMLElement).isContentEditable)
          return
        
        if (event.code === 'Delete')
          ctx.$app.page.deleting.perform()

        if (event.ctrlKey && event.code === 'KeyA')
          ctx.$app.page.selection.selectAll()

        if (event.ctrlKey && event.code === 'KeyD')
          ctx.$app.page.cloning.perform()

        if (event.ctrlKey && event.code === 'KeyC')
          ctx.$app.page.clipboard.copy()
        if (event.ctrlKey && event.code === 'KeyV' && window.clipboardData)
          ctx.$app.page.clipboard.paste()
        if (event.ctrlKey && event.code === 'KeyX')
          ctx.$app.page.clipboard.cut()

        if (event.code === 'F2' && ctx.$app.page.activeElem.exists)
          ctx.$app.page.editing.start(ctx.$app.page.activeElem.get as Note)

        if (event.code === 'ArrowLeft')
          ctx.$app.page.selection.shift(-1, 0)
        if (event.code === 'ArrowRight')
          ctx.$app.page.selection.shift(1, 0)
        if (event.code === 'ArrowUp')
          ctx.$app.page.selection.shift(0, -1)
        if (event.code === 'ArrowDown')
          ctx.$app.page.selection.shift(0, 1)
      }
      function onKeyPress(event: KeyboardEvent) {
        if ((event.target as HTMLElement).nodeName === 'INPUT'
        || (event.target as HTMLElement).nodeName === 'TEXTAREA'
        || (event.target as HTMLElement).isContentEditable)
          return
          
        if (ctx.$app.page.activeElem.exists)
          ctx.$app.page.editing.start(ctx.$app.page.activeElem.get as Note)
      }

      onBeforeUnmount(() => {
        document.removeEventListener('keypress', onKeyPress)
        document.removeEventListener('keydown', onKeyDown)
      })




      // Clipboard pasting

      onMounted(() => {
        document.addEventListener('paste', onPaste)
      })

      function onPaste(event: ClipboardEvent) {
        if ((event.target as HTMLElement).nodeName === 'INPUT'
        || (event.target as HTMLElement).nodeName === 'TEXTAREA'
        || (event.target as HTMLElement).isContentEditable)
          return

        const text = (event.clipboardData || window.clipboardData).getData('text')

        ctx.$app.page.clipboard.paste(text)
      }

      onBeforeUnmount(() => {
        document.removeEventListener('paste', onPaste)
      })




      // Maintain IndexedDB
      
      onMounted(async () => {
        const db = await openDB(`user-${ctx.$auth.user?.userId}-1`, 1, {
          upgrade(db, oldVersion, newVersion, transaction) {
            db.createObjectStore('pathPages')
            db.createObjectStore('recentPages')
          },
        })

        watch(() => ctx.$app.project.pathPages, async () => {
          await db.put('pathPages', ctx.$app.project.pathPages, 'value')
        }, { deep: true, immediate: true })

        watch(() => ctx.$app.project.recentPages, async () => {
          await db.put('recentPages', ctx.$app.project.recentPages, 'value')
        }, { deep: true, immediate: true })
      })



      
      await ctx.$app.project.init()
    }
  })
}