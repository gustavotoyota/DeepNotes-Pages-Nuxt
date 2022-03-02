<template>

  <div style="position: absolute;
  right: 16px; top: 16px;
  opacity: 0.9">
    
    <div style="margin-top: 1px">

      <DisplayButton
      tooltip="Reset zoom"
      icon="magnify-remove-outline"
      @click="$app.page.camera.resetZoom()"/>

    </div>

    <div style="margin-top: 1px">

      <DisplayButton
      tooltip="Fit to screen"
      icon="image-filter-center-focus-weak"
      @click="$app.page.camera.fitToScreen()"/>
      
    </div>

  </div>

</template>

<script setup lang="ts">
</script>

<style>

</style>