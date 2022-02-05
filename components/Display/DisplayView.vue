<template>

  <!-- Centralizer -->
  <div v-if="$app.page.camera != null"
  style="position: absolute; left: 50%; top: 50%">

    <!-- Viewbox -->
    <div style="width: 0; height: 0; position: relative"
    :style="{
      'transform': `scale(${$app.page.camera.zoom}) ` +
        `translate(${-$app.page.camera.pos.x}px, ${-$app.page.camera.pos.y}px)`,
    }">
      
      <DisplayNote
      v-for="(_, noteId) in $app.collab.store.page.noteIds" :key="noteId"
      :elem="$app.notes.map[noteId]"/>

    </div>

  </div>
  
</template>

<script>
</script>

<style scoped>

</style>