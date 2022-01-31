<template>

  <!-- Centralizer -->
  <div style="position: absolute; left: 50%; top: 50%">

    <!-- Viewbox -->
    <div style="width: 0; height: 0; position: relative"
    :style="{
      'transform': `scale(${$state.page.camera.zoom}) ` +
        `translate(${-$state.page.camera.pos.x}px, ${-$state.page.camera.pos.y}px)`,
    }">
      
      <DisplayBlock
      v-for="block in $state.page.elems.blocks" :key="block.id"
      :block="block"/>

    </div>

  </div>
  
</template>

<script>
</script>

<style scoped>

</style>