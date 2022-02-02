<template>

  <div :id="`elem-${elem.id}-anchor`"
  :class="{ anchor: elem.parentId == null }"
  :style="{
    'left': `${elem.collab.pos.x}px`,
    'top': `${elem.collab.pos.y}px`,
  }">

    <slot/>

  </div>

</template>

<script>
export default {

  props: {
    elem: { type: Object },
  },

}
</script>

<style scoped>
.anchor {
  position: absolute;
  
  width: 0;
  height: 0;
}
</style>