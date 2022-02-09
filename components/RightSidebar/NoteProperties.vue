<template>

  <div style="height: 100%;
  display: flex;
  flex-direction: column">

    <v-toolbar style="flex: none">
      <v-list-item-icon>
        <v-icon>mdi-chart-box</v-icon>
      </v-list-item-icon>

      <v-toolbar-title>
        Note Properties
      </v-toolbar-title>
    </v-toolbar>




    <div style="flex: 1;
    overflow-y: auto">

      <!-- Title/Body -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex; flex-direction: column">
        <div style="display: flex">
          <v-checkbox hide-details label="Has title"
          style="flex: 1; margin-top: 0; padding-top: 0"
          :input-value="activeNote.collab.hasTitle"
          @change="changeProp($event, (note, value) => {
            note.collab.hasTitle = value
            note.collab.hasBody = note.collab.hasBody || note.numSections === 0
          })"/>

          <Gap width="16px" style="flex: none"/>

          <v-checkbox hide-details label="Has body"
          style="flex: 1; margin-top: 0; padding-top: 0"
          :input-value="activeNote.collab.hasBody"
          @change="changeProp($event, (note, value) => {
            note.collab.hasBody = value
            note.collab.hasTitle = note.collab.hasTitle || note.numSections === 0
          })"/>
        </div>

        <Gap height="12px"/>

        <v-btn @click="swapTitleAndBody">
          Swap title and body
        </v-btn>
      </div>

    </div>

  </div>
  
</template>

<script setup>
import { computed, useContext } from "@nuxtjs/composition-api"
import { getYjsValue } from "@syncedstore/core"

const { $app } = useContext()




function changeProp(value, func) {
  getYjsValue($app.collab.store).transact(() => {
    for (const note of $app.selection.notes)
      func(note, value)
  })
}




// Active note

const activeNote = computed(() => $app.activeElem.get)




// Swap title and body

function swapTitleAndBody() {
  changeProp(null, (note, value) => {
    const titleDelta = note.collab.title.toDelta()
    const bodyDelta = note.collab.body.toDelta()

    note.collab.title.delete(0, note.collab.title.length)
    note.collab.body.delete(0, note.collab.body.length)

    note.collab.title.applyDelta(bodyDelta)
    note.collab.body.applyDelta(titleDelta)
  })
}




// Note width

const width = computed({
  get() {
    if (activeNote.size.x.endsWith('px'))
      return 'custom'
    else
      return activeNote.size.x
  },
  set(value) {
    for (const note of $app.selection.notes) {
      if (value === 'custom') {
        const clientRect = $app.notes.getClientRect(note, 'frame')

        note.size.x = `${$app.sizes.screenToWorld1D(clientRect.size.x)}px`
      } else
        note.size.x = value
    }
  },
})




// Section heights

function sectionHeight(section) {
  return computed({
    get() {
      if (note.size.y[section].endsWith('px'))
        return 'custom'
      else
        return note.size.y[section]
    },
    set(value) {
      changeProp(value, (note, value) => {
        if (value === 'custom') {
          const node = $app.notes.getNode(note, `${section}-section`)
          const clientRect = node.getBoundingClientRect()

          note.size.y[section] = `${$app.sizes.screenToWorld1D(clientRect.height)}px`
        } else
          note.size.y[section] = value
      })
    },
  })
}

const titleHeight = sectionHeight('title')
const bodyHeight = sectionHeight('body')
const containerHeight = sectionHeight('container')
</script>

<style>

</style>