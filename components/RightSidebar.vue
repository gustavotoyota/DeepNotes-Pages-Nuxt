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

    <PageProperties v-if="!$app.activeElem.exists"/>
    <NoteProperties v-else/>

  </v-navigation-drawer>
  
</template>

<script>
export default {

}
</script>

<style>

</style>