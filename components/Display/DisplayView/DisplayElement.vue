<template>

  <DisplayNote v-if="elem.type === 'note'"
  :elem="elem" :target-width="targetWidth"/>
  
  <DisplayArrow v-else-if="elem.type === 'arrow'"
  :elem="elem"/>
    
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