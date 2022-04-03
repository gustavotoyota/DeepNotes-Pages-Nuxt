<template>
        
    <line :id="`arrow-${arrow.id}`"
    class="arrow"
    :style="{
      'pointer-events': creating ? 'none' : 'auto',
      'stroke': arrow.active ? 'rgb(3, 155, 229)' : (arrow.selected ? 'rgb(1, 87, 155)' : undefined)
    }"
    :x1="arrow.startPos.x" :y1="arrow.startPos.y"
    :x2="arrow.endPos.x" :y2="arrow.endPos.y"
    @pointerdown.left="onPointerDown"/>

</template>




<script setup lang="ts">
import { useContext, watchEffect } from '@nuxtjs/composition-api';
import { Arrow } from '~/plugins/app/page/arrows/arrows'




const ctx = useContext()




const props = defineProps<{
  arrow: Arrow,
  creating?: boolean,
  index?: number,
}>()




function onPointerDown(event: PointerEvent) {
  ctx.$app.page.clickSelection.perform(props.arrow, event)
}




watchEffect(() => {
  props.arrow.index = props.index ?? 0
})
</script>




<style scoped>
.arrow {
  stroke: #b0b0b0;
  stroke-width: 3.5;
}
</style>