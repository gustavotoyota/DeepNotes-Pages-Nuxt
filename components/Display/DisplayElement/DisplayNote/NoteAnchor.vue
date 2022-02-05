<template>

  <div :id="`note-${note.id}-anchor`"
  :class="{ anchor: note.parentId == null }"
  :style="{
    'left': `${note.collab.pos.x}px`,
    'top': `${note.collab.pos.y}px`,
  }">

    <slot/>

  </div>

</template>

<script>
export default {

  props: {
    note: { type: Object },
  },

}
</script>

<style scoped>
.anchor {
  position: absolute;
  
  width: 0;
  height: 0;
}
</style>