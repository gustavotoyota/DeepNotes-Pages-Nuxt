<template>

  <div :id="`elem-${elem.id}-anchor`"
  :class="{ anchor: elem.parentId == null }"
  :style="{
    'left': `${elem.pos.x}px`,
    'top': `${elem.pos.y}px`,
  }">

  </div>

</template>

<script>
export default {
  
  props: {
    elem: { type: Object },

    targetWidth: { type: String },
  },

}
</script>

<style>

</style>