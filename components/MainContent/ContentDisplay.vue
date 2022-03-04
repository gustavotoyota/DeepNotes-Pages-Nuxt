<template>

  <div id="display"
  style="flex: 1;
  position: relative;
  overflow: hidden;"
  @wheel="onWheel"
  @pointerdown.left="onLeftPointerDown"
  @pointerdown.middle.prevent="onMiddlePointerDown">

    <DisplayBackground/>
    <DisplayView/>
    <DisplayBoxSelection/>
    <DisplayButtons/>


    

    <v-overlay :value="!$app.page.loaded"
    absolute :z-index="0" :opacity="1">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

  </div>

</template>




<script setup lang="ts">
import { useContext } from "@nuxtjs/composition-api"
import Vue from "vue";

const ctx = useContext()




function onWheel(event: WheelEvent) {
  ctx.$app.page.zooming.perform(event)
}

function onLeftPointerDown(event: PointerEvent) {
  ctx.$app.page.pinching.addPointer(event)

  if (ctx.$app.page.pinching.active)
    event.stopPropagation()
}

function onMiddlePointerDown(event: PointerEvent) {
  ctx.$app.page.panning.start(event)
}
</script>




<style scoped>
#display /deep/ * {
  touch-action: none;
}
</style>