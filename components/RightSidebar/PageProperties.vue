<template>

  <v-list v-if="$app.project.collapsedRightSidebar" dense>

    <v-tooltip left>

      <template v-slot:activator="{ on }">

        <v-list-item v-on="on"
        :input-value="$app.page.camera.lockPos"
        @click="$app.page.camera.lockPos = !$app.page.camera.lockPos">
          <v-list-item-icon>
            <v-icon>mdi-axis-arrow-lock</v-icon>
          </v-list-item-icon>
        </v-list-item>

      </template>

      <span>Lock position</span>

    </v-tooltip>




    <v-tooltip left>

      <template v-slot:activator="{ on }">

        <v-list-item v-on="on"
        :input-value="$app.page.camera.lockZoom"
        @click="$app.page.camera.lockZoom = !$app.page.camera.lockZoom">
          <v-list-item-icon>
            <v-icon>mdi-arrow-vertical-lock</v-icon>
          </v-list-item-icon>
        </v-list-item>

      </template>

      <span>Lock zoom</span>

    </v-tooltip>

  </v-list>




  <div v-else>

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
  
</template>

<script setup lang="ts">
</script>

<style>

</style>