<template>

  <div :id="`elem-${elem.id}-frame`"
  :style="{
    'min-width': minWidth,
    'width': selfWidth,

    'position': elem.parentId == null ? 'absolute' : 'relative',
    'transform': elem.parentId == null ? `translate(${-elem.anchor.x * 100}%, ${-elem.anchor.y * 100}%)` : null,
    
    'opacity': dragging ? '0.7' : null,
    'pointer-events': dragging ? 'none' : null,
  }">

    <slot/>

  </div>
  
</template>

<script>
export default {

  props: {
    elem: { type: Object },

    minWidth: { type: String },
    selfWidth: { type: String },
    dragging: { type: Boolean },
  },

}
</script>

<style>

</style>