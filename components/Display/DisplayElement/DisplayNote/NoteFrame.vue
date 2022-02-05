<template>

  <div :id="`elem-${note.id}-frame`"
  :style="{
    'width': '100px',
    'height': '100px',

    'position': note.parentId == null ? 'absolute' : 'relative',
    'transform': note.parentId == null ? `translate(` +
      `${-note.collab.anchor.x * 100}%, ${-note.collab.anchor.y * 100}%)` : null,
  }">
    
    <NoteBackground
    :note="note"/>

  </div>
  
</template>

<script>
export default {

  props: {
    note: { type: Object },
  },

}
</script>

<style>

</style>