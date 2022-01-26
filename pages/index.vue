<template>

</template>

<script>
export default {

  middleware(context) {
    console.log(context.$auth.loggedIn)

    return context.redirect('/0')
  }

}
</script>

<style>

</style>