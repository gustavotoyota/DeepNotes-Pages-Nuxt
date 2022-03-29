<template>

  <v-app
  spellcheck="false">

    <LeftSidebar/>

    <MainContent>
      <Nuxt/>
    </MainContent>

    <RightSidebar/>

    <TemplatesPopup/>

    <Snackbar/>
  


  
    <v-overlay
    v-if="!$app.loaded"
    :opacity="1"
    color="#1e1e1e">

      <v-progress-circular
      indeterminate
      size="44"/>

    </v-overlay>

  </v-app>

</template>




<script lang="ts">
export default {
  head() {
    return {
      title: this.$app.page.data.name +
        (this.$app.page.data.name ? ' - ' : '') + 'DeepNotes'
    }
  },
}
</script>




<script setup lang="ts">
</script>




<style>
* {
  touch-action: pan-x pan-y;
}
*:not(input) {
  user-select: none;
}




html {
  overflow: hidden;
}

a {
  text-decoration: none;
}




/* Scrollbars */

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background: #202020;
}

::-webkit-scrollbar-thumb {
  background: #303030;
  border: solid 1px #404040;
}

::-webkit-scrollbar-thumb:hover {
  background: #404040;
}
</style>