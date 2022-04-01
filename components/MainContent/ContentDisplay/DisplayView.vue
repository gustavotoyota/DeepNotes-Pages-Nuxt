<template>

  <!-- Centralizer -->
  <div class="display-centralizer"
  style="position: absolute; left: 50%; top: 50%">

    <!-- Viewbox -->
    <div class="display-viewbox"
    style="width: 0; height: 0; position: relative"
    :style="{
      'transform': `scale(${$app.page.camera.zoom}) ` +
        `translate(${-$app.page.camera.pos.x}px, ${-$app.page.camera.pos.y}px)`,
    }">

      <DisplayNote
      v-for="(note, index) in $app.page.data.notes" :key="note.id"
      :note="note"
      :index="index"/>

    </div>

  </div>
  
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>