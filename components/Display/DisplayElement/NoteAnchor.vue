<template>

  <div :id="`elem-${elem.id}-anchor`"
  :class="{ anchor: elem.parentId == null }"
  :style="{
    'left': `${collab.pos.x}px`,
    'top': `${collab.pos.y}px`,
  }">

    <slot/>

  </div>

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
.anchor {
  position: absolute;
  
  width: 0;
  height: 0;
}
</style>