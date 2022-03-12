<template>

  <div v-if="note.parentId == null && note.selected"
  class="note-arrow-handles">

    <img class="note-arrow-handle"
    draggable="false"
    style="top: 50%; left: -35px;
    transform: translate(0, -50%)"
    src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOHB4IiBoZWlnaHQ9IjE4cHgiIHZlcnNpb249IjEuMSI+PHBhdGggZD0ibSAxIDkgTCAxMiAxIEwgMTIgNiBMIDI2IDYgTCAyNiAxMiBMIDEyIDEyIEwgMTIgMTggeiIgc3Ryb2tlPSIjZmZmIiBmaWxsPSIjMjliNmYyIi8+PC9zdmc+"/>

    <img class="note-arrow-handle"
    draggable="false"
    style="top: 50%; right: -35px;
    transform: translate(0, -50%)"
    src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyNnB4IiBoZWlnaHQ9IjE4cHgiIHZlcnNpb249IjEuMSI+PHBhdGggZD0ibSAxIDYgTCAxNCA2IEwgMTQgMSBMIDI2IDkgTCAxNCAxOCBMIDE0IDEyIEwgMSAxMiB6IiBzdHJva2U9IiNmZmYiIGZpbGw9IiMyOWI2ZjIiLz48L3N2Zz4="/>

    <img class="note-arrow-handle"
    draggable="false"
    style="top: -35px; left: 50%;
    transform: translate(-50%, 0)"
    src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjI4cHgiIHZlcnNpb249IjEuMSI+PHBhdGggZD0ibSA2IDI2IEwgMTIgMjYgTCAxMiAxMiBMIDE4IDEyIEwgOSAxIEwgMSAxMiBMIDYgMTIgeiIgc3Ryb2tlPSIjZmZmIiBmaWxsPSIjMjliNmYyIi8+PC9zdmc+"/>
  
    <img class="note-arrow-handle"
    draggable="false"
    style="bottom: -35px; left: 50%;
    transform: translate(-50%, 0)"
    src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjI2cHgiIHZlcnNpb249IjEuMSI+PHBhdGggZD0ibSA2IDEgTCA2IDE0IEwgMSAxNCBMIDkgMjYgTCAxOCAxNCBMIDEyIDE0IEwgMTIgMSB6IiBzdHJva2U9IiNmZmYiIGZpbGw9IiMyOWI2ZjIiLz48L3N2Zz4="/>
  
  </div>

</template>




<script setup lang="ts">
import { Note } from '~/plugins/app/page/notes/notes';




defineProps<{
  note: Note
}>()
</script>




<style scoped>
.note-arrow-handles {
  position: absolute;

  left: 0; top: 0;
  bottom: 0; right: 0;

  z-index: -100;
  
  pointer-events: none;
}




.note-arrow-handle {
  position: absolute;

  opacity: 0.15;
  
  cursor: copy;

  pointer-events: auto;
}
.note-arrow-handle:hover {
  opacity: 1;
}
</style>