<template>

</template>

<script>
export default {

  async middleware(ctx) {
    const startingPageId = (await ctx.$axios.post('/api/project/starting-page-id')).data

    return ctx.redirect(`/${startingPageId}`)
  }

}
</script>

<style>

</style>