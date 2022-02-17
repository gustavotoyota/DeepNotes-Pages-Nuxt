<template>
  <div v-if="$app.boxSelection.active" class="selection"
  :style="{
    'left': `${Math.min($app.boxSelection.startPos.x, $app.boxSelection.endPos.x)}px`,
    'top': `${Math.min($app.boxSelection.startPos.y, $app.boxSelection.endPos.y)}px`,
    'width': `${Math.abs($app.boxSelection.endPos.x - $app.boxSelection.startPos.x)}px`,
    'height': `${Math.abs($app.boxSelection.endPos.y - $app.boxSelection.startPos.y)}px`,
  }">
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.selection {
  position: absolute;

  border: 1px solid rgba(66, 165, 245, 0.8);

  background-color: rgba(33, 150, 243, 0.4);

  pointer-events: none;
}
</style>