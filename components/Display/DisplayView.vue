<template>

  <!-- Centralizer -->
  <div v-if="$app.collab.store != null
  && $app.page.collab.name != null"
  style="position: absolute; left: 50%; top: 50%">

    <!-- Viewbox -->
    <div style="width: 0; height: 0; position: relative"
    :style="{
      'transform': `scale(${$app.camera.zoom}) ` +
        `translate(${-$app.camera.pos.x}px, ${-$app.camera.pos.y}px)`,
    }">

      <DisplayNote
      v-for="note in $app.page.notes" :key="note.id"
      :note="note"/>

    </div>

  </div>
  
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>