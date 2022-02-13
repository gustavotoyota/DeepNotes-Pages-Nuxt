<template>

  <v-sheet class="note-background"
  elevation="6"
  :style="{
    'cursor': (note.collab.linkedPageId == null || note.selected) ? null : 'pointer',
    'background-color': backgroundColor,
  }"
  @pointerdown.left.stop="onPointerDown"
  @click="onClick">

    <slot/>

  </v-sheet>
  
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




function onPointerDown(event) {
  if (props.note.collab.linkedPageId != null
  && !event.ctrlKey && !event.altKey && !event.shiftKey
  && !props.note.selected)
    return

  if ($app.editing.active && $app.activeElem.is(props.note))
    return

  $app.editing.stop()

  $app.clickSelection.perform(props.note, event)

  if ($app.selection.has(props.note))
    $app.dragging.start(event)
}




function onClick(event) {
  if (props.note.collab.linkedPageId == null
  || event.ctrlKey || event.shiftKey || props.note.selected)
    return

  $app.page.navigateTo({
    id: props.note.collab.linkedPageId,
    fromParent: true,
  })
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