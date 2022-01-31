<template>

  <div style="position: absolute;
  right: 16px; top: 16px;
  opacity: 0.9">
    
    <div style="margin-top: 1px">

      <v-btn style="min-width: 0; width: 36px; padding: 0"
      @click="$app.camera.resetZoom">
        <v-icon>mdi-magnify-remove-outline</v-icon>
      </v-btn>

    </div>

    <div style="margin-top: 1px">

      <v-btn style="min-width: 0; width: 36px; padding: 0"
      @click="$app.camera.fitToScreen">
        <v-icon>mdi-image-filter-center-focus-weak</v-icon>
      </v-btn>
      
    </div>

  </div>

</template>

<script>
export default {

}
</script>

<style>

</style>