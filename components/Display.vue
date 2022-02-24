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

    <v-overlay :value="!$app.page.loaded"
    absolute :z-index="0">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

  </div>

</template>




<script setup lang="ts">
import { useContext } from "@nuxtjs/composition-api"

const ctx = useContext()




function onWheel(event: WheelEvent) {
  ctx.$app.page.zooming.perform(event)
}

function onPointerDown(event: PointerEvent) {
  if (event.button === 1)
    ctx.$app.page.panning.start(event)
}
</script>




<style scoped>
#display /deep/ * {
  touch-action: none;
}
</style>