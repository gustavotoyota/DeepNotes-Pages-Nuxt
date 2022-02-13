<template>

</template>

<script>
export default {

  async middleware(context) {
    const startingPageId = (await context.$axios.post('/api/project/starting-page-id')).data

    return context.redirect(`/${startingPageId}`)
  }

}
</script>

<style>

</style>