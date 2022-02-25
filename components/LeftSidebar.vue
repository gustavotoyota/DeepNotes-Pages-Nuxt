<template>

  <v-navigation-drawer
  app
  clipped
  permanent
  touchless
  :mini-variant.sync="$app.project.collapsedLeftSidebar"
  width="300">

    <v-toolbar>
      <v-list-item-icon v-if="!$app.project.collapsedLeftSidebar">
        <v-icon>mdi-animation</v-icon>
      </v-list-item-icon>

      <v-toolbar-title v-if="!$app.project.collapsedLeftSidebar">
        Page Path
      </v-toolbar-title>

      <v-spacer v-if="!$app.project.collapsedLeftSidebar"/>

      <v-btn icon @click="$app.project.collapsedLeftSidebar = true">
        <v-icon v-if="$app.project.collapsedLeftSidebar">mdi-chevron-right</v-icon>
        <v-icon v-else>mdi-chevron-left</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list dense>

      <v-list-item
      v-for="page in $app.page.project.pathPages" :key="page.id"
      :input-value="page.id == $app.page.id"
      @click="$app.page.navigateTo(page.id)"
      link>
        <v-list-item-icon>
          <v-icon>mdi-note</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ (page.id == $app.page.id) ? $app.page.data.collab.name : page.name }}
        </v-list-item-title>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>
  
</template>

<script setup lang="ts">
</script>

<style>

</style>