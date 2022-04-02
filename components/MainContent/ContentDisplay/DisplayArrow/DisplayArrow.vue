<template>
        
    <line :x1="arrow.startPos.x" :y1="arrow.startPos.y"
    :x2="arrow.endPos.x" :y2="arrow.endPos.y"
    stroke="#b0b0b0"
    stroke-width="3.5"/>

</template>




<script setup lang="ts">
import { Arrow } from '~/plugins/app/page/arrows/arrows'





defineProps<{
  arrow: Arrow
}>()
</script>