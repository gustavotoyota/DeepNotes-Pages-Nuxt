<template>

  <v-navigation-drawer
  app
  clipped
  permanent
  touchless
  stateless
  :mini-variant.sync="$app.project.collapsedLeftSidebar"
  width="300">

    <v-toolbar dense>

      <v-list-item-icon>
        <v-icon>mdi-animation</v-icon>
      </v-list-item-icon>

      <v-toolbar-title>
        Page Path
      </v-toolbar-title>

    </v-toolbar>

    <v-list dense>

      <v-list-item
      v-for="pageRef in $app.page.project.pathPages" :key="pageRef.id"
      :input-value="pageRef.id == $app.page.id"
      @click="$app.page.navigateTo(pageRef.id)"
      link>
        <v-list-item-icon>
          <v-icon>mdi-note</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ (pageRef.id == $app.page.id) ? 
            $app.page.data.name : pageRef.name }}
        </v-list-item-title>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>
  
</template>

<script setup lang="ts">
</script>

<style>

</style>