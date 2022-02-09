<template>

  <NuxtChild/>

</template>

<script>
export default {

  async fetch({ $app }) {
    await $app.project.init()
  },

}
</script>

<style>

</style>