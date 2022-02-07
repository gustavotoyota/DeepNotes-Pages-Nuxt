<template>

  <div class="note-background"
  :style="{
    'background-color': backgroundColor,
  }"
  @pointerdown.left.stop="onPointerDown">

    <slot/>

  </div>
  
</template>

<script setup>
import { computed, useContext } from '@nuxtjs/composition-api'

const { $app } = useContext()




const props = defineProps({
  note: { type: Object },
})





const backgroundColor = computed(() => {
  if (props.note.active)
    return `#757575`
  else if (props.note.selected)
    return `#616161`
  else
    return `#424242`
})




// Pointer down

function onPointerDown(event) {
  $app.clickSelection.perform(props.note, event)

  if ($app.selection.has(props.note))
    $app.dragging.start(event)
}
</script>

<style scoped>
.note-background {
  border-radius: 7px;
  border: 1px solid #212121;
  border-left-color: #757575;
  border-top-color: #757575;

  height: 100%;

  overflow: hidden;
}
</style>