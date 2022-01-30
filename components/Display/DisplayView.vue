<template>

  <!-- Centralizer -->
  <div style="position: absolute; left: 50%; top: 50%">

    <!-- Viewbox -->
    <div style="width: 0; height: 0; position: relative"
    :style="{
      'transform': `scale(${$getters.page.camera.zoom}) ` +
        `translate(${-$getters.page.camera.pos.x}px, ${-$getters.page.camera.pos.y}px)`,
    }">
      
      <DisplayElement
      v-for="elem in $getters.page.elems.blocks" :key="elem.id"
      :elem="elem"/>

    </div>

  </div>
  
</template>

<script>
</script>

<style scoped>

</style>