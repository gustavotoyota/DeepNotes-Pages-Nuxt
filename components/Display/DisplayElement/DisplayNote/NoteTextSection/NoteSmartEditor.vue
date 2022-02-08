<template>

  <div v-if="!note.editing"
  class="ql-container ql-bubble"
  :class="{ collapsible: note.collab.collapsible }">
    <div class="ql-editor" v-html="html"/>
  </div>

  <NoteEditor v-else
  :class="{ collapsible: note.collab.collapsible }"
  :text="text"/>

</template>

<script setup>
import { SyncedText } from "@syncedstore/core";
import { ref } from "@nuxtjs/composition-api";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'




const props = defineProps({
  note: { type: Object },
  text: { type: SyncedText },
})




const html = ref(null)

function updateHTML() {
  const delta = props.text.toDelta()

  const converter = new QuillDeltaToHtmlConverter(delta, {})

  html.value = converter.convert()

  if (html.value === '<p><br/></p>')
    html.value = ''

  html.value = html.value.replaceAll('<br/></p>', '<br/><br/></p>')
}

updateHTML()

props.text.observe(updateHTML)
</script>

<style>
.ql-editor {
  padding: 9px !important;
}

.collapsible .ql-editor {
  padding-right: 0 !important;
}




/* Tooltip */

.ql-tooltip {
  z-index: 9999;

  background-color: #303030 !important;
  border-radius: 12px !important;
}

.ql-toolbar {
  display: flex;

  flex-direction: column;
}

.ql-formats {
  margin: 8px !important;
}
.ql-formats:not(:first-child) {
  margin-top: 0 !important;
}
</style>