<template>

  <DisplayNote v-if="elem.type === 'note'"
  :elem="elem" :target-width="targetWidth"/>
    
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    
    targetWidth: { type: String },
  },

}
</script>

<style scoped>
</style>