<template>

  <div v-if="!editing"
  class="ql-container ql-bubble">
    <div class="ql-editor facade"
    v-html="html">
    </div>
  </div>

  <NoteEditor v-else
  :text="text"/>

</template>

<script setup>
import { SyncedText } from "@syncedstore/core";
import { computed } from "@nuxtjs/composition-api";




const props = defineProps({
  text: { type: SyncedText },
  editing: { type: Boolean },
})




const html = computed(() => props.text.toString())
</script>

<style>
.ql-editor {
  padding: 9px !important;
}
</style>