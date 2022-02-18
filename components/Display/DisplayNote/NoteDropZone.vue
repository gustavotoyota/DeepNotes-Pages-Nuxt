<template>

  <div v-if="$app.dragging.active"
  class="drop-zone"
  :class="{
    'active': $app.dragging.dropRegionId === parentNote.id
      && $app.dragging.dropIndex === index
  }"
  @pointerenter="onPointerEnter"
  @pointerleave="onPointerLeave"
  @pointerup.left.stop="onPointerUp"/>
  
</template>

<script setup lang="ts">
import { useContext } from '@nuxtjs/composition-api';
import { INote } from '~/plugins/app/notes/notes';

const ctx = useContext()




const props = defineProps<{
  parentNote: INote
  index: number
}>()




function onPointerEnter(event: PointerEvent) {
  if (!ctx.$app.dragging.active)
    return

  ctx.$app.dragging.dropRegionId = props.parentNote.id
  ctx.$app.dragging.dropIndex = props.index
}

function onPointerLeave(event: PointerEvent) {
  if (!ctx.$app.dragging.active)
    return
  
  ctx.$app.dragging.dropRegionId = null
  ctx.$app.dragging.dropIndex = null
}

function onPointerUp(event: PointerEvent) {
  ctx.$app.dropping.perform(event, props.parentNote, props.index)
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