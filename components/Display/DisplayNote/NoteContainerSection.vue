<template>
  
  <div class="container-section"
  style="display: flex; min-height: 56.453px"
  :style="{ height: note[`containerHeight`] }">
    
    <div class="container-content">

    </div>

    

    <NoteCollapseButton
    :note="note"
    section="container"/>

  </div>
  
</template>

<script setup lang="ts">
import { INote } from '~/plugins/app/notes/notes';



const props = defineProps<{
  note: INote
}>()
</script>

<style>
.container-content {
  flex: 1;

  padding: 9px;

  display: flex;
  flex-direction: column;
  
  overflow: auto;
}
</style>