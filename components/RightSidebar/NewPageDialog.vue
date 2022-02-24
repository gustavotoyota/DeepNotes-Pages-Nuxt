<template>

  <v-dialog max-width="280" v-model="active">


    <template v-slot:activator="{ on }">
      <v-btn style="width: 100%" v-on="on">
        Create new page
      </v-btn>
    </template>



    <v-form @submit.prevent="onSubmit">
    
      <v-card>

        <v-card-title>
          New Page
        </v-card-title>

        <v-card-text>

          <v-text-field ref="nameElem"
          label="Page name"
          v-model="name">
          </v-text-field>

        </v-card-text>

        <v-divider/>

        <v-card-actions>

          <v-spacer/>

          <v-btn color="primary" text type="submit">
            Ok
          </v-btn>

          <v-btn color="primary" text @click="active = false">
            Cancel
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-form>

  </v-dialog>

</template>

<script setup lang="ts">
import { ref, useContext, watch } from '@nuxtjs/composition-api';
import { SyncedText } from '@syncedstore/core';
import { Note } from '~/plugins/app/page/notes/notes';

const ctx = useContext()




const active = ref(false)
const name = ref('')
const nameElem = ref<HTMLElement>()




async function onSubmit() {
  active.value = false

  const selectedNotes = ctx.$app.page.selection.notes
  
  const pageId = await ctx.$app.page.data.create(name.value)

  for (const selectedNote of selectedNotes)
    selectedNote.collab.linkedPageId = pageId
}




watch(active, (value) => {
  if (!value)
    return

  setTimeout(() => {
    const activeNote = ctx.$app.page.activeElem.get as Note

    const text = activeNote.collab[activeNote.topSection]
    if (!text)
      return

    name.value = (text as SyncedText).toString().split('\n')[0]
    nameElem.value?.focus()
  })
})
</script>

<style>

</style>