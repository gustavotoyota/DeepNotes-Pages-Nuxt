<template>

  <div style="height: 100%;
  display: flex;
  flex-direction: column">

    <v-toolbar style="flex: none">
      <v-list-item-icon>
        <v-icon>mdi-chart-box</v-icon>
      </v-list-item-icon>

      <v-toolbar-title>
        Page Properties
      </v-toolbar-title>
    </v-toolbar>



    
    <div style="flex: 1;
    overflow-y: auto"
    class="pb-4">
      
      <div class="mx-5 mt-4">
        <div class="body-2 grey--text text--lighten-1">
          Name:
        </div>

        <v-text-field dense solo hide-details style="clear: right"
        class="mt-1 body-2" v-model="$app.page.data.collab.name">
        </v-text-field>
      </div>

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4">
        <v-checkbox hide-details label="Lock position"
        style="flex: 1; margin-top: 0; padding-top: 0"
        v-model="$app.page.camera.lockPos"/>

        <Gap height="10px"/>

        <v-checkbox hide-details label="Lock zoom"
        style="flex: 1; margin-top: 0; padding-top: 0"
        v-model="$app.page.camera.lockZoom"/>
      </div>

    </div>

  </div>
  
</template>

<script setup lang="ts">
</script>

<style>

</style>