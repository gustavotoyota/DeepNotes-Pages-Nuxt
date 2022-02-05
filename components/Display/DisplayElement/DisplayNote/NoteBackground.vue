<template>

  <div style="height: 100%">

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
  $app.dragging.start(event, this.note)
}
</script>

<style>

</style>