<template>

  <v-navigation-drawer
  app   
  clipped
  permanent
  touchless
  mini-variant
  expand-on-hover
  right
  width="300">

    <NoteProperties v-if="$app.page.activeElem.exists"/>
    <PageProperties v-else/>

  </v-navigation-drawer>
  
</template>

<script setup lang="ts">
</script>

<style>

</style>