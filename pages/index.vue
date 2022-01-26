<template>

</template>

<script>
export default {

  async middleware(context) {
    const lastPageId = (await context.$axios.post('/api/users/last-page-id')).data

    return context.redirect(`/${lastPageId}`)
  }

}
</script>

<style>

</style>