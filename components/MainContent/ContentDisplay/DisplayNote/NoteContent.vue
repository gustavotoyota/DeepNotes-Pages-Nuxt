<template>

  <div class="note-content"
  :style="{
    'cursor': (note.collab.linkedPageId == null || note.selected) ? undefined : 'pointer',
    'background-color': backgroundColor,
  }"
  @touchstart="onTouchStart"
  @pointerdown.left.stop="onPointerDown"
  @pointerup.left="onPointerUp"
  @click="onClick">

    <slot/>

  </div>
  
</template>

<script setup lang="ts">
import { computed, useContext } from '@nuxtjs/composition-api'
import { Note } from '~/plugins/app/page/notes/notes';

const ctx = useContext()




const props = defineProps<{
  note: Note
}>()





const backgroundColor = computed(() => {
  if (props.note.active)
    return `#757575`
  else if (props.note.selected)
    return `#616161`
  else
    return `#424242`
})




function onTouchStart(event: TouchEvent) {
  const hasScrollbar = $static.utils.hasScrollbar(event.target as HTMLElement)

  if (getComputedStyle(event.target as Element).touchAction !== 'none'
  && (!hasScrollbar || (hasScrollbar
  && !$static.utils.isTouchOverScrollbar(event, ctx.$app.page.camera.zoom))))
    event.preventDefault()
}




function onPointerDown(event: PointerEvent) {
  if ($static.utils.isMouseOverScrollbar(event))
    return

  if (props.note.collab.linkedPageId != null
  && !event.ctrlKey && !event.altKey && !event.shiftKey
  && !props.note.selected)
    return

  if (props.note.editing)
    return

  ctx.$app.page.editing.stop()

  ctx.$app.page.clickSelection.perform(props.note, event)

  if (event.button === 0
  && props.note.selected)
    ctx.$app.page.dragging.start(event)
}




function onPointerUp(event: PointerEvent) {
  if (ctx.$app.page.arrowCreation.active) {
    event.stopPropagation()
    ctx.$app.page.arrowCreation.finish(event, props.note)
    return
  }
}




function onClick(event: MouseEvent) {
  if (props.note.collab.linkedPageId == null
  || event.ctrlKey || event.shiftKey || props.note.selected)
    return

  ctx.$app.project.navigateTo(props.note.collab.linkedPageId, true)
}
</script>

<style scoped>
.note-content {
  border-radius: 7px;
  border: 1px solid #212121;
  border-left-color: #757575;
  border-top-color: #757575;

  height: 100%;

  box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)!important;
}
</style>