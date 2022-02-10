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

const { $app, route } = useContext()




// Loading

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})




// Reset page

onMounted(() => {
  $app.page.reset({ id: route.value.params.page_id })
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