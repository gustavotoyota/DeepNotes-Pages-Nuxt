<template>
  <div v-if="$state.boxSelection.active" class="selection"
  :style="{
    'left': `${Math.min($state.boxSelection.startPos.x, $state.boxSelection.endPos.x)}px`,
    'top': `${Math.min($state.boxSelection.startPos.y, $state.boxSelection.endPos.y)}px`,
    'width': `${Math.abs($state.boxSelection.endPos.x - $state.boxSelection.startPos.x)}px`,
    'height': `${Math.abs($state.boxSelection.endPos.y - $state.boxSelection.startPos.y)}px`,
  }">
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.selection {
  position: absolute;

  border: 1px solid rgba(66, 165, 245, 0.8);

  background-color: rgba(33, 150, 243, 0.4);

  pointer-events: none;
}
</style>