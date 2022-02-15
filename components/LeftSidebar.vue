<template>

  <v-navigation-drawer
  app
  clipped
  permanent
  touchless
  mini-variant
  expand-on-hover
  width="300">

    <v-toolbar>
      <v-list-item-icon>
        <v-icon>mdi-animation</v-icon>
      </v-list-item-icon>

      <v-toolbar-title>
        Page Path
      </v-toolbar-title>
    </v-toolbar>

    <v-list dense>

      <v-list-item
      v-for="page in $app.project.path" :key="page.id"
      :input-value="page.id === $app.page.id"
      @click="$app.page.navigateTo(page.id)"
      link>
        <v-list-item-icon>
          <v-icon>mdi-note</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ (page.id === $app.page.id) ? $app.page.collab.name : page.name }}
        </v-list-item-title>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>
  
</template>

<script>
export default {

}
</script>

<style>

</style>