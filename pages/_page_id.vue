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




// Create page

if (ctx.$app.page.id !== ctx.route.value.params.page_id)
  ctx.$app.page = new AppPage(ctx.$app.project, ctx.route.value.params.page_id)




// Synchronize page

if (process.client) {
  (async () => {
    const [pageData] = await Promise.all([
      ctx.$app.page.init(),
      ctx.$app.page.collab.startSync(),
    ])

    ctx.$app.page.collab.postSync(pageData)
  })()
}
</script>




<style>
</style>