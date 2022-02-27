<template>
  
  <v-app
  spellcheck="false">

    <MainMenu/>

    <LeftSidebar/>

    <MainContent>
      <Nuxt/>
    </MainContent>

    <RightSidebar/>

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