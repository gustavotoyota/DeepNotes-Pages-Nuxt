<template>
  
  <div class="note-container-section"
  style="display: flex; min-height: 56.453px"
  :style="{ height: note.containerHeight }">
    
    <div class="note-container-content"
    :style="{
      'width': note.targetWidth,
      'flex-direction': note.collab.horizontal ? 'row' : 'column',
      'flex-wrap': note.collab.wrapChildren ? 'wrap': undefined,
    }">

      <!-- Placeholder -->

      <div v-if="note.notes.length === 0"
      class="note-container-placeholder">

        Drop notes here
        
        <NoteDropZone
        :parent-note="note"
        :index="0"
        style="top: 0; bottom: 0"/>

      </div>




      <!-- Children -->

      <div v-for="(child, index) in note.notes" :key="child.id"
      class="note-container-child"
      :style="{
        'flex-direction': note.collab.horizontal ? 'row' : 'column',
        'width': !note.collab.horizontal && note.collab.stretchChildren ? 'calc(100% - 6px)' : undefined,
      }">

        <DisplayNote
        :note="child"
        :index="index"/>
        
        <div style="position: relative">

          <NoteDropZone
          v-if="index < note.notes.length - 1"
          :parent-note="note"
          :index="index + 1"
          style="position: absolute;
          min-width: 6px; min-height: 6px"/>

        </div>

      </div>
        


        
      <div style="flex: 1;
      position: relative">

        <NoteDropZone
        :parent-note="note"
        :index="note.notes.length"
        style="right: 3px; bottom: 3px"
        :style="{
          left: note.collab.horizontal ? '-3px' : '3px',
          top: note.collab.horizontal ? '3px' : '-3px',
        }"/>

      </div>
      
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
.note-container-content {
  flex: 1;

  padding: 6px;

  display: flex;
  align-content: flex-start;
  
  overflow: auto;

  touch-action: pan-x pan-y !important;
}



.note-container-placeholder {
  position: relative;

  width: 100%;
  height: 100%;

  border-radius: 4px;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  
  color: #e0e0e0;
  font-size: 13px;
}




.note-container-drop-zone {
  background-color: #42A5F5;

  opacity: 0;
}
.note-container-drop-zone.active {
  opacity: 0.25;
}




.note-container-child {
  flex: none;
  
  display: flex;

  margin: 3px;
}
</style>