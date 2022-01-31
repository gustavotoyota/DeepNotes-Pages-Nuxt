<template>

  <div id="display"
  style="height: 100%;
  overflow: hidden"
  @wheel="onWheel"
  @pointerdown.middle.prevent="onPointerDown">

    <DisplayBackground/>
    <DisplayView/>
    <DisplayBoxSelection/>
    <DisplayButtons/>

  </div>

</template>

<script setup>
function onWheel(event) {
  $app.zooming.perform(event)
}

function onPointerDown(event) {
  $app.panning.start(event)
}
</script>

<style scoped>
#display {
  user-select: none;
}

#display * {
  touch-action: none;
}
</style>