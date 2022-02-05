<template>

</template>

<script>
export default {

  async middleware(context) {
    const startingData = (await context.$axios.post('/api/projects/data')).data

    return context.redirect(`/${startingData.startingPageId}`)
  }

}
</script>

<style>

</style>