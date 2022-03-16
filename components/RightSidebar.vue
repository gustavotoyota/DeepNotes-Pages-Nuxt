<template>

  <v-navigation-drawer
  app   
  clipped
  permanent
  touchless
  stateless
  :mini-variant.sync="$app.project.collapsedRightSidebar"
  width="300"
  right>

    <div style="height: 100%;
    width: 300px;
    display: flex;
    flex-direction: column">

      <v-toolbar dense style="flex: none">
      
        <v-toolbar-title>

          <v-icon style="position: relative; left: 1px; top: -1px">mdi-chart-box</v-icon>

          <span v-if="!$app.project.collapsedRightSidebar"
          style="position: relative; top: 1px">
            {{ $static.utils.capitalizeFirst($app.page.activeElem.type) }} Properties
          </span>

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