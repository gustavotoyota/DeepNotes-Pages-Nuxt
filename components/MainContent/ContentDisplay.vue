<template>

  <div id="display"
  style="flex: 1;
  position: relative;
  overflow: hidden"
  @wheel="onWheel"
  @pointerdown.left="onLeftPointerDown"
  @pointerdown.middle.prevent="onMiddlePointerDown">

    <template v-if="$app.page.loaded">
    
      <DisplayBackground/>

      <DisplayArrows/>
      <DisplayView/>

      <DisplayBoxSelection/>

    </template>


    

    <v-overlay
    :value="!$app.page.loaded"
    absolute
    :z-index="0"
    :opacity="1"
    color="#1e1e1e">

      <v-progress-circular
      indeterminate
      size="44"/>

    </v-overlay>
    


    
    <DisplayButtons/>

  </div>

</template>




<script setup lang="ts">
import { useContext } from "@nuxtjs/composition-api"




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