<template>
  <div v-if="$app.page.boxSelection.active" class="selection"
  :style="{
    'left': `${Math.min($app.page.boxSelection.startPos.x, $app.page.boxSelection.endPos.x)}px`,
    'top': `${Math.min($app.page.boxSelection.startPos.y, $app.page.boxSelection.endPos.y)}px`,
    'width': `${Math.abs($app.page.boxSelection.endPos.x - $app.page.boxSelection.startPos.x)}px`,
    'height': `${Math.abs($app.page.boxSelection.endPos.y - $app.page.boxSelection.startPos.y)}px`,
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