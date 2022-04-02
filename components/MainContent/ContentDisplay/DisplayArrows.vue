<template>

  <svg style="position: absolute; pointer-events: none"
  left="0" top="0" width="100%" height="100%">

    <svg x="50%" y="50%" style="overflow: visible">

      <g :transform="'scale(' + $app.page.camera.zoom + ') ' +
      'translate(' + -$app.page.camera.pos.x + ', ' + -$app.page.camera.pos.y + ')'">
        
        <DisplayArrow v-for="arrow of $app.page.data.arrows" :key="arrow.id"
        :arrow="arrow"/>
        
        <DisplayArrow v-if="$app.page.arrowCreation.active"
        :arrow="$app.page.arrowCreation.arrow"
        :creating="true"/>

      </g>

    </svg>

  </svg>

</template>




<script setup lang="ts">
</script>