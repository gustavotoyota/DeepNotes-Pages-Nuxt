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
}
</script>

<style scoped>

</style>