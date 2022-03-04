<template>

  <div>
  
    <v-app v-show="$app.loaded"
    spellcheck="false">

      <MainMenu/>

      <LeftSidebar/>

      <MainContent>
        <Nuxt/>
      </MainContent>

      <RightSidebar/>

    </v-app>
    


    
    <v-overlay :value="!$app.loaded"
    :opacity="1">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

  </div>

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