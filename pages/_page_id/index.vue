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
import { ref, onMounted, useContext } from "@nuxtjs/composition-api"




// Loading

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})




// Reset page

onMounted(() => {
  const { $app, route } = useContext()

  $app.collab.reset()
  $app.page.reset({ id: route.value.params.page_id })
  $app.collab.startSync()
})
</script>




<style>
html {
  overflow: hidden;
}

a {
  text-decoration: none;
}
</style>