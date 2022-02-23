<template>
  
  <v-app
  spellcheck="false">

    <MainMenu/>
    <LeftSidebar/>

    <v-main>
      <Display/>
    </v-main>
    
    <RightSidebar/>

  </v-app>

</template>




<script setup lang="ts">
import { useContext } from "@nuxtjs/composition-api"

const ctx = useContext()




// Reset page

ctx.$app.page.reset(ctx.route.value.params.page_id)
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