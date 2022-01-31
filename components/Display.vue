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
}

function onPointerDown(event) {
}
</script>

<style>
#display * {
  touch-action: none;
}
</style>