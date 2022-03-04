<template>

  <v-navigation-drawer
  app   
  clipped
  permanent
  touchless
  stateless
  right
  :value="false"
  :width="$app.project.collapsedRightSidebar ? 0 : 300">

    <div style="height: 100%;
    width: 300px;
    display: flex;
    flex-direction: column">

      <v-toolbar dense style="flex: none">
        <v-toolbar-title>
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

<style>

</style>