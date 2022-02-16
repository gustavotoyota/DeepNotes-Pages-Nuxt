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




<script setup>
import { useContext } from "@nuxtjs/composition-api"

const { $app, route } = useContext()




// Reset page

$app.page.reset(route.value.params.page_id)
</script>




<style>
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