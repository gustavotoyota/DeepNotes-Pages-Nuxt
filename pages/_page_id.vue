<template>
  
  <ContentDisplay/>

</template>




<script setup lang="ts">
import { useContext } from "@nuxtjs/composition-api"
import { AppPage } from "~/plugins/app/page/page";

const ctx = useContext()




// Reset page

if (ctx.$app.page.id !== ctx.route.value.params.page_id)
  ctx.$app.page = new AppPage(ctx.$app.project, ctx.route.value.params.page_id)
</script>




<style>
</style>