<template>

  <v-navigation-drawer
  app   
  clipped
  permanent
  touchless
  :mini-variant.sync="$app.project.collapsedRightSidebar"
  right
  width="300">

    <div style="height: 100%;
    display: flex;
    flex-direction: column">

      <v-toolbar style="flex: none">
        <v-btn icon @click="$app.project.collapsedRightSidebar = !$app.project.collapsedRightSidebar">
          <v-icon v-if="$app.project.collapsedRightSidebar">mdi-chevron-left</v-icon>
          <v-icon v-else>mdi-chevron-right</v-icon>
        </v-btn>

        <v-toolbar-title>
          Properties
        </v-toolbar-title>
      </v-toolbar>




      <div style="flex: 1;
      overflow-y: auto"
      class="pb-4">

        <NoteProperties v-if="$app.page.activeElem.exists"/>
        <PageProperties v-else/>

      </div>

    </div>

  </v-navigation-drawer>
  
</template>

<script setup lang="ts">
</script>

<style>

</style>