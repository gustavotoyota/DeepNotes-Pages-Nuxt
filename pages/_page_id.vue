<template>

  <NuxtChild/>

</template>

<script>
export default {
}
</script>

<script setup>
import { onMounted, useContext, watch } from '@nuxtjs/composition-api'
import { openDB } from 'idb'

const { $app, $auth } = useContext()




onMounted(async () => {
  const db = await openDB(`user-${$auth.user.userId}`, 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      db.createObjectStore('path')
      db.createObjectStore('recent')
    },
  })

  watch(() => $app.project.path, async () => {
    await db.put('path', $app.project.path, 'value')
  }, { deep: true, immediate: true })

  watch(() => $app.project.recent, async () => {
    await db.put('recent', $app.project.recent, 'value')
  }, { deep: true, immediate: true })
})
</script>

<style>

</style>