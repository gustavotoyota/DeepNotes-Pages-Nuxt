<template>

</template>




<script lang="ts">
import { Context } from "@nuxt/types"




export default {

  async middleware(ctx: Context) {
    const startingPageId = (await ctx.$axios.post('/api/project/starting-page-id')).data

    return ctx.redirect(`/${startingPageId}`)
  }

}
</script>




<style>

</style>