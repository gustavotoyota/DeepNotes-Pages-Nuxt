<template>

  <div style="position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  background-color: #1e1e1e"
  @pointerdown.left="onPointerDown"
  @dblclick.left="onDoubleClick">
  </div>

</template>

<script setup lang="ts">
import { useContext } from "@nuxtjs/composition-api"
import { Vec2 } from "~/plugins/static/vec2"

const ctx = useContext()




let lastPointerDownDate = new Date()




function onPointerDown(event: PointerEvent) {
  lastPointerDownDate = new Date()

  ctx.$app.page.editing.stop()

  if (!event.ctrlKey && !event.shiftKey)
    ctx.$app.page.selection.clear(null)
    
  ctx.$app.page.boxSelection.start(event)
}

function onDoubleClick(event: MouseEvent) {
  if (new Date().getTime() - lastPointerDownDate.getTime() > 400) {
    ctx.$app.templates.showPopup(new Vec2(event.clientX, event.clientY))
    return
  }




  const clientPos = ctx.$app.page.pos.getClientPos(event)
  
  ctx.$app.page.notes.createFromTemplate(ctx.$app.templates.default, clientPos)
}
</script>

<style scoped>

</style>