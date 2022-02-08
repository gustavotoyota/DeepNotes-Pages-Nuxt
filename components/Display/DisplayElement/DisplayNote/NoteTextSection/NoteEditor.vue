<template>
  <div ref="editor"/>
</template>

<script setup>
import { onMounted, onUnmounted, ref, useContext } from "@nuxtjs/composition-api";
import { SyncedText } from "@syncedstore/core";

import { QuillBinding } from 'y-quill'




const { $app } = useContext()




const props = defineProps({
  text: { type: SyncedText },
})




const editor = ref(null)




const quillOptions = {
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
}




let quill = null

onMounted(() => {
  const Quill = require('quill')

  quill = new Quill(editor.value, quillOptions)

  const binding = new QuillBinding(props.text, quill,
    $app.collab.websocketProvider.awareness)
})

onUnmounted(() => {
  document.body.removeChild(quill.theme.tooltip.root.parentNode)
})

defineExpose({ quill })
</script>

<style>

</style>