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

<script setup lang="ts">
import { useContext } from "@nuxtjs/composition-api"

const ctx = useContext()




function onWheel(event: WheelEvent) {
  ctx.$app.zooming.perform(event)
}

function onPointerDown(event: PointerEvent) {
  ctx.$app.panning.start(event)
}
</script>

<style scoped>
#display * {
  touch-action: none;
}
</style>