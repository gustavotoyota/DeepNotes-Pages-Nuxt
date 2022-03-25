<template>

  <div class="note-editor"
  :class="{
    'padding-fix': fixPadding,
    'wrap': wrap,
  }">
    <div ref="editor"/>
  </div>

</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useContext } from "@nuxtjs/composition-api";
import type { SyncedText } from "@syncedstore/core";
import type { Quill } from 'quill';
import { QuillBinding } from 'y-quill';
import type { Note, NoteTextSection } from "~/plugins/app/page/notes/notes";
import { quillOptions } from "~/plugins/static/quill";
import { Nullable } from '~/types/deep-notes';




const ctx = useContext()




const props = defineProps<{
  note: Note
  section: NoteTextSection
  wrap: boolean
}>()




// Quill setup

const text = computed(() => 
  props.note.collab[props.section] as SyncedText)

const editor = ref<Nullable<Element>>(null)

let quill: Quill
let quillBinding: Nullable<QuillBinding> = null

onMounted(() => {
  const Quill = require('quill')

  quill = new Quill(editor.value ?? '', quillOptions)

  props.note[`${props.section}Quill` as `${NoteTextSection}Quill`] = quill

  quill.enable(props.note.editing)

  quillBinding = new QuillBinding(text.value, quill,
    ctx.$app.page.collab.websocketProvider.awareness)
})

onBeforeUnmount(() => {
  if (quillBinding != null)
    quillBinding.destroy()

  props.note[`${props.section}Quill` as `${NoteTextSection}Quill`] = null

  // @ts-ignore
  document.body.removeChild(quill.theme.tooltip.root.parentNode)
})




// Padding fix

const fixPadding = computed(() =>
  props.note.collab.collapsible
  && props.section === props.note.topSection)
</script>




<style scoped>
.note-editor {
  height: 100%;
}

.note-editor /deep/ .ql-editor {
  padding: 9px !important;
  
  min-width: 100%;
  max-width: 100%;

  min-height: 100%;
  max-height: 100%;
  
  width: max-content;
  height: max-content;

  font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;

  overflow: auto;
  
  white-space: nowrap;

  touch-action: pan-x pan-y !important;
}

.note-editor /deep/ .ql-editor > * {
  cursor: inherit;
}

.note-editor.padding-fix /deep/ .ql-editor {
  padding-right: 0 !important;
}

.note-editor.wrap /deep/ .ql-editor {
  white-space: normal;
}




/* Lists */

.note-editor /deep/ ul {
  padding-left: 0 !important;
}
.note-editor /deep/ li {
  padding-left: 1em !important;
}
.note-editor /deep/ li.ql-indent-1 {
  padding-left: 2em !important;
}
.note-editor /deep/ li.ql-indent-2 {
  padding-left: 3em !important;
}
.note-editor /deep/ li.ql-indent-3 {
  padding-left: 4em !important;
}
.note-editor /deep/ li.ql-indent-4 {
  padding-left: 5em !important;
}
.note-editor /deep/ li.ql-indent-5 {
  padding-left: 6em !important;
}
.note-editor /deep/ li.ql-indent-6 {
  padding-left: 7em !important;
}
.note-editor /deep/ li.ql-indent-7 {
  padding-left: 8em !important;
}
.note-editor /deep/ li.ql-indent-8 {
  padding-left: 9em !important;
}
.note-editor /deep/ li.ql-indent-9 {
  padding-left: 10em !important;
}




/* Indentation */

.note-editor /deep/ p.ql-indent-1 {
  padding-left: 1em !important;
}
.note-editor /deep/ p.ql-indent-2 {
  padding-left: 2em !important;
}
.note-editor /deep/ p.ql-indent-3 {
  padding-left: 3em !important;
}
.note-editor /deep/ p.ql-indent-4 {
  padding-left: 4em !important;
}
.note-editor /deep/ p.ql-indent-5 {
  padding-left: 5em !important;
}
.note-editor /deep/ p.ql-indent-6 {
  padding-left: 6em !important;
}
.note-editor /deep/ p.ql-indent-7 {
  padding-left: 7em !important;
}
.note-editor /deep/ p.ql-indent-8 {
  padding-left: 8em !important;
}
.note-editor /deep/ p.ql-indent-9 {
  padding-left: 9em !important;
}





/* Anchor links */

.note-editor /deep/ a {
  text-decoration: none !important;

  color: #64B5F6;
}

.note-editor /deep/ a::before {
  display: none;
}
.note-editor /deep/ a::after {
  display: none;
}




/* Code blocks */

.note-editor /deep/ pre.ql-syntax {
  min-width: 100%;
  width: fit-content;

  white-space: pre;
}

.note-editor.wrap /deep/ pre.ql-syntax {
  white-space: pre-wrap;
  max-width: 100%;
}

.note-editor /deep/ pre.ql-syntax:empty {
  display: none;
}
</style>




<style>
/* Tooltip */

.ql-tooltip {
  z-index: 2147483647;

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