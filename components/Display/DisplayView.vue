<template>

  <!-- Centralizer -->
  <div style="position: absolute; left: 50%; top: 50%">

    <!-- Viewbox -->
    <div style="width: 0; height: 0; position: relative"
    :style="{
      'transform': `scale(${$state.page.camera.zoom}) ` +
        `translate(${-$state.page.camera.pos.x}px, ${-$state.page.camera.pos.y}px)`,
    }">
      
      <DisplayNote
      v-for="elem in $state.page.elems.notes" :key="elem.id"
      :elem="elem"/>

    </div>

  </div>
  
</template>

<script>
</script>

<style scoped>

</style>