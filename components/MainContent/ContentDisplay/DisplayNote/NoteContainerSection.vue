<template>
  
  <div class="container-section"
  style="display: flex; min-height: 56.453px"
  :style="{ height: note.containerHeight }">
    
    <div class="container-content"
    :style="{
      'width': note.targetWidth,
      'flex-direction': note.collab.horizontal ? 'row' : 'column',
    }">

      <!-- Placeholder -->

      <div v-if="note.children.length === 0"
      class="container-placeholder">

        Drop notes here
        
        <NoteDropZone
        :parent-note="note"
        :index="0"
        style="top: 0; bottom: 0"/>

      </div>




      <!-- Children -->

      <div v-for="(child, index) in note.children" :key="child.id"
      style="flex: none; display: flex; flex-direction: column"
      :style="{
        'flex-direction': note.collab.horizontal ? 'row' : 'column',
      }">

        <DisplayNote
        :note="child"
        :index="index"/>
        
        <NoteDropZone
        always-visible
        v-if="index < note.children.length - 1"
        :parent-note="note"
        :index="index + 1"
        style="position: static;
        min-width: 5px; min-height: 5px"/>

      </div>
        
      <NoteDropZone
      always-visible
      :parent-note="note"
      :index="note.children.length"
      style="position: static; flex: 1"/>
      
    </div>

    

    <NoteCollapseButton
    :note="note"
    section="container"/>

  </div>
  
</template>

<script setup lang="ts">
import { Note } from '~/plugins/app/page/notes/notes';




defineProps<{
  note: Note
}>()
</script>




<style scoped>
.container-content {
  flex: 1;

  padding: 9px;

  display: flex;
  
  overflow: auto;

  touch-action: pan-x pan-y !important;
}



.container-placeholder {
  position: relative;

  height: 100%;

  border-radius: 4px;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  
  color: #e0e0e0;
  font-size: 13px;
}




.container-drop-zone {
  background-color: #42A5F5;

  opacity: 0;
}
.container-drop-zone.active {
  opacity: 0.25;
}
</style>