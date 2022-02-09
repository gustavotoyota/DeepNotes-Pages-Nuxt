<template>
  <div ref="editor"
  class="note-editor"
  :class="{ 'padding-fix': fixPadding }"/>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, useContext, watch } from "@nuxtjs/composition-api";
import { QuillBinding } from 'y-quill'




const { $app } = useContext()




const props = defineProps({
  note: { type: Object },
  section: { type: String },
})




// Quill setup

const text = computed(() => 
  props.note.collab[props.section])

const editor = ref(null)

let quill

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

  const binding = new QuillBinding(text.value, quill,
    $app.collab.websocketProvider.awareness)
})

onUnmounted(() => {
  document.body.removeChild(quill.theme.tooltip.root.parentNode)
})




// Padding fix

const fixPadding = computed(() =>
  props.note.collab.collapsible
  && props.section === props.note.topSection)




// Enable on editing

function onEditToggle() {
  quill.enable(props.note.editing)
  
  if (!props.note.editing) {
    quill.setSelection(null)
    return
  }

  if (props.section !== $app.editing.section)
    return

  quill.focus()
  quill.setSelection(0, 0)
  quill.setSelection(0, Infinity, 'user')
}

onMounted(() => {
  if (props.note.editing)
    onEditToggle()
})

watch(() => props.note.editing, onEditToggle)
</script>




<style scoped>
.note-editor /deep/ .ql-editor {
  padding: 9px !important;
  
  min-width: 100%;
  
  width: max-content;
  height: max-content;

  font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;

  overflow: visible;
}

.note-editor.padding-fix /deep/ .ql-editor {
  padding-right: 0 !important;
}
</style>




<style>
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