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
        :note="child"/>
        
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

  border: 1px solid;
  border-radius: 4px;
  border-color: rgb(33, 33, 33) #888888 #888888 rgb(33, 33, 33);

  padding: 8px;

  color: #e0e0e0;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  
  font-size: 13px;
  background-color: #686868;
}




.container-drop-zone {
  background-color: #42A5F5;

  opacity: 0;
}
.container-drop-zone.active {
  opacity: 0.25;
}
</style>