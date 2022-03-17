<template>

  <v-navigation-drawer
  class="right-sidebar"
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

        <v-icon style="position: relative; left: 1px; top: 1px">mdi-chart-box</v-icon>
      
        <v-toolbar-title v-if="!$app.project.collapsedRightSidebar"
        style="margin-left: 23px;
        position: relative; top: 1px">
          {{ $static.utils.capitalizeFirst($app.page.activeElem.type) }} Properties
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




<style scoped>
/* List item icon ripple bug fix */

.right-sidebar /deep/ .v-list-item__icon {
  margin-left: 0 !important;
}
</style>