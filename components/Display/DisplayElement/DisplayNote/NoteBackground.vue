<template>

  <div style="height: 100%"
  :style="{
    'background-color': '#424242',
    'border-radius': '7px',
  }"
  @pointerdown.left.stop="onPointerDown">

  </div>
  
</template>

<script>
export default {

  props: {
    note: { type: Object },
  },

}
</script>

<script setup>
import { useContext } from '@nuxtjs/composition-api'

const { $app } = useContext()




function onPointerDown(event) {
  $app.dragging.start(event)
}
</script>

<style>

</style>