<template>

  <div v-if="$app.page.dragging.active"
  class="drop-zone"
  :class="{
    'active': $app.page.dragging.dropRegionId == parentNote.id
      && $app.page.dragging.dropIndex === index
  }"
  @pointerenter="onPointerEnter"
  @pointerleave="onPointerLeave"
  @pointerup.left.stop="onPointerUp"/>
  
</template>

<script setup lang="ts">
import { useContext } from '@nuxtjs/composition-api';
import { Note } from '~/plugins/app/page/notes/notes';

const ctx = useContext()




const props = defineProps<{
  parentNote: Note
  index: number
}>()




function onPointerEnter(event: PointerEvent) {
  if (!ctx.$app.page.dragging.active)
    return

  ctx.$app.page.dragging.dropRegionId = props.parentNote.id
  ctx.$app.page.dragging.dropIndex = props.index
}

function onPointerLeave(event: PointerEvent) {
  if (!ctx.$app.page.dragging.active)
    return
  
  ctx.$app.page.dragging.dropRegionId = null
  ctx.$app.page.dragging.dropIndex = null
}

function onPointerUp(event: PointerEvent) {
  ctx.$app.page.dropping.perform(event, props.parentNote, props.index)
}
</script>

<style scoped>
.drop-zone {
  position: absolute;
  left: 0; right: 0;

  background-color: #42A5F5;
  opacity: 0;

  z-index: 2147483647;
}
.drop-zone.active {
  opacity: 0.25;
}
</style>