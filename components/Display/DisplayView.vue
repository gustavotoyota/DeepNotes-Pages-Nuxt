<template>

  <!-- Centralizer -->
  <div v-if="$app.collab.store != null"
  style="position: absolute; left: 50%; top: 50%">

    <!-- Viewbox -->
    <div style="width: 0; height: 0; position: relative"
    :style="{
      'transform': `scale(${$app.camera.zoom}) ` +
        `translate(${-$app.camera.pos.x}px, ${-$app.camera.pos.y}px)`,
    }">

      <DisplayNote
      v-for="noteId in $app.collab.store.page.noteIds" :key="noteId"
      :note="$app.notes.map[noteId]"/>

    </div>

  </div>
  
</template>

<script>
</script>

<style scoped>

</style>