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
import { computed, onBeforeUnmount, onMounted, ref, useContext, watch } from "@nuxtjs/composition-api";
import { SyncedText } from "@syncedstore/core";
import Quill from "quill";
import { QuillBinding } from 'y-quill'
import { Note } from "~/plugins/app/notes/notes";




const ctx = useContext()




const props = defineProps<{
  note: Note
  section: string
  wrap: boolean
}>()




// Quill setup

const text = computed(() => 
  props.note.collab[props.section] as SyncedText)

const editor = ref(null)

let quill: Quill

onMounted(() => {
  const Quill = require('quill')

  quill = new Quill(editor.value, {
    theme: 'bubble',

    placeholder: '',

    modules: {
      syntax: true,

      cursors: true,

      keyboard: {
        bindings: {
          'indent code-block': null,
          'outdent code-block': null,
        },
      },

      toolbar: [
        [
          'bold',
          'italic',
          'underline',
          'strike',
          { 'header': 1 },
          { 'header': 2 },
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' },
        ],
        [
          { 'indent': '-1' },
          { 'indent': '+1' },
          { 'script': 'sub' },
          { 'script': 'super' },
          'blockquote',
          'code-block',
          'link',
          'image',
          'formula',
          'clean',
        ],
      ],
    },
  })

  quill.enable(false)

  new QuillBinding(text.value, quill,
    ctx.$app.collab.websocketProvider.awareness)
})

onBeforeUnmount(() => {
  // @ts-ignore
  document.body.removeChild(quill.theme.tooltip.root.parentNode)
})




// Padding fix

const fixPadding = computed(() =>
  props.note.collab.collapsible
  && props.section === props.note.topSection)




// Enable on editing

function onEditToggle() {
  quill.enable(props.note.editing)
  
  if (props.note.editing) {
    if (props.section !== ctx.$app.editing.section)
      return

    // @ts-ignore
    quill.history.clear()

    quill.focus()
    quill.setSelection(0, 0)
    quill.setSelection(0, Infinity, 'user')
  } else {
    // @ts-ignore
    quill.setSelection(null)
    // @ts-ignore
    quill.theme.tooltip.hide()
    return
  }
}

onMounted(() => {
  if (props.note.editing)
    onEditToggle()
})

watch(() => props.note.editing, onEditToggle)
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