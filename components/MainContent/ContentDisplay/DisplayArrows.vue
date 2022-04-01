<template>

  <svg style="position: absolute; pointer-events: none"
  left="0" top="0" width="100%" height="100%">

    <svg x="50%" y="50%" style="overflow: visible">

      <g :transform="'scale(' + $app.page.camera.zoom + ') ' +
      'translate(' + -$app.page.camera.pos.x + ', ' + -$app.page.camera.pos.y + ')'">
        
        <line v-for="arrow of $app.page.data.arrows" :key="arrow.id"
        :x1="arrow.startPos.x" :y1="arrow.startPos.y"
        :x2="arrow.endPos.x" :y2="arrow.endPos.y"
        stroke="blue"/>
        
        <line v-if="$app.page.arrowCreation.active"
        :x1="$app.page.arrowCreation.arrow.startPos.x"
        :y1="$app.page.arrowCreation.arrow.startPos.y"
        :x2="$app.page.arrowCreation.arrow.endPos.x"
        :y2="$app.page.arrowCreation.arrow.endPos.y"
        stroke="#b0b0b0"
        stroke-width="3.5"/>

      </g>

    </svg>

  </svg>

</template>




<script setup lang="ts">
</script>