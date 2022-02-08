<template>

  <div v-if="!note.collab.editing"
  class="ql-container ql-bubble"
  :class="{ collapsible: note.collab.collapsible }">
    <div class="ql-editor facade"
    v-html="html">
    </div>
  </div>

  <NoteEditor v-else
  :class="{ collapsible: note.collab.collapsible }"
  :text="text"/>

</template>

<script setup>
import { SyncedText } from "@syncedstore/core";
import { computed } from "@nuxtjs/composition-api";




const props = defineProps({
  note: { type: Object },
  text: { type: SyncedText },
})




const html = computed(() => props.text.toString())
</script>

<style scoped>
.collapsible .ql-editor {
  padding-right: 0 !important;
}
</style>

<style>
.ql-editor {
  padding: 9px !important;
}
</style>