<template>

  <div :id="`note-${note.id}`"
  :class="{ anchor: note.parentId == null }"
  :style="{
    'left': `${note.collab.pos.x}px`,
    'top': `${note.collab.pos.y}px`,
    'z-index': note.zIndex,
  }">

    <slot/>

  </div>

</template>

<script setup>
const props = defineProps({
  note: { type: Object },
})
</script>

<style scoped>
.anchor {
  position: absolute;
  
  width: 0;
  height: 0;
}
</style>