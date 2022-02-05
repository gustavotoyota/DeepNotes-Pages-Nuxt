<template>

  <NoteAnchor
  v-if="elem != null"
  :elem="elem"
  :collab="collab">

    <div style="width: 100px; height: 100px; background-color: white">
    </div>

  </NoteAnchor>

</template>

<script>
export default {

  props: {
    elem: { type: Object },
    collab: { type: Object },
  },

}
</script>

<style scoped>
</style>