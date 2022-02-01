<template>

  <div style="position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  background-color: #1e1e1e"
  @pointerdown.left="onPointerDown"
  @dblclick.left="onDoubleClick">
  </div>

</template>

<script setup>
function onPointerDown(event) {
  $app.boxSelection.start(event)
}

function onDoubleClick(event) {
  const clientPos = $app.coords.getClientPos(event)

  const note = $app.notes.create({ clientPos })

  $app.page.addNote(note)
}
</script>

<style scoped>

</style>