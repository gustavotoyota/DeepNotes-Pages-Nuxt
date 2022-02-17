<template>

  <div class="drop-zone"
  :class="{
    'active': $app.dragging.dropRegionId == parentNote.id
      && $app.dragging.dropIndex === index
  }"
  @pointerenter="onPointerEnter($event)"
  @pointerleave="onPointerLeave($event)"
  @pointerup.left.stop="onPointerUp($event)"/>
  
</template>

<script setup lang="ts">
import { useContext } from '@nuxtjs/composition-api';
import { INote } from '~/plugins/app/notes/notes';

const { $app } = useContext()




const props = defineProps<{
  note: INote
  parentNote: INote
  index: number
}>()




function onPointerEnter(event: PointerEvent) {
  if (!$app.dragging.active)
    return

  $app.dragging.dropRegionId = props.parentNote.id
  $app.dragging.dropIndex = props.index
}

function onPointerLeave(event: PointerEvent) {
  if (!$app.dragging.active)
    return
  
  $app.dragging.dropRegionId = null
  $app.dragging.dropIndex = null
}

function onPointerUp(event: PointerEvent) {
  $app.dropping.perform(event, props.parentNote, props.index)
}
</script>

<style scoped>
.drop-zone {
  position: absolute;
  left: 0; right: 0;

  background-color: #42A5F5;
  opacity: 0;

  /* z-index: 1000;*/
}
.drop-zone.active {
  opacity: 0.25;
}
</style>