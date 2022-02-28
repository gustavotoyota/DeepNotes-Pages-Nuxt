<template>
  
  <ContentDisplay/>

</template>




<script lang="ts">
export default {
  async fetch(ctx: Context) {
    await ctx.$app.project.init()
  }
}
</script>




<script setup lang="ts">
import { Context } from "@nuxt/types";
import { useContext } from "@nuxtjs/composition-api"
import { AppPage } from "~/plugins/app/page/page";

const ctx = useContext()




// Reset page

if (ctx.$app.page.id !== ctx.route.value.params.page_id)
  ctx.$app.page = new AppPage(ctx.$app.project, ctx.route.value.params.page_id)
</script>




<style>
</style>