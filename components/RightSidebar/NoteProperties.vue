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
    overflow-y: auto"
    class="pb-4">

      <!-- Linked page -->
      
      <div class="mx-5 mt-4">
        <div class="body-2 grey--text text--lighten-1"
        style="margin-left: 1px">
          Linked page:
        </div>

        <Gap height="2px"/>

        <v-select dense outlined hide-details
        background-color="#181818" clearable
        :items="ctx.$app.project.recent" item-text="name" item-value="id"
        :menu-props="{ top: false, offsetY: true }"
        :value="activeNote.collab.linkedPageId"
        @change="changeProp($event, (note, value) => {
          note.collab.linkedPageId = value
        })"/>

        <Gap height="10px"/>
        
        
        <NewPageDialog/>
      </div>




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




      <!-- Container -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Container"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="activeNote.collab.container"
        @change="changeProp($event, (note, value) => {
          note.collab.container = value
          note.collab.hasBody = note.collab.hasBody || note.numSections === 0
        })"/>
      </div>




      <!-- Collapsible/Collapsed -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Collapsible"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="activeNote.collab.collapsible"
        @change="changeProp($event, (note, value) => {
          note.collab.collapsible = value
          note.collab.collapsed = note.collab.collapsed && value
        })">
        </v-checkbox>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Collapsed"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :disabled="!activeNote.collab.collapsible"
        :input-value="activeNote.collab.collapsed"
        @change="changeProp($event, (note, value) => {
          ctx.$app.collapsing.set(note, value)
        })">
        </v-checkbox>
      </div>




      <!-- Anchor -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4" style="display: flex">
        <div style="flex: 1">
          <div class="body-2 grey--text text--lighten-1"
          style="margin-left: 1px">
            X anchor:
          </div>

          <Gap height="2px"/>

          <v-select dense outlined hide-details
          background-color="#181818"
          :items="[
            { text: 'Left', value: 0 },
            { text: 'Center', value: 0.5 },
            { text: 'Right', value: 1 },
          ]" item-text="text" item-value="value"
          :menu-props="{ top: false, offsetY: true }"
          :value="activeNote.collab.anchor.x"
          @change="changeProp($event, (note, value) => {
            note.collab.anchor.x = value
          })"/>
        </div>

        <Gap width="16px" style="flex: none"/>

        <div style="flex: 1">
          <div class="body-2 grey--text text--lighten-1"
          style="margin-left: 1px">
            Y anchor:
          </div>

          <Gap height="2px"/>

          <v-select dense outlined hide-details
          background-color="#181818"
          :items="[
            { text: 'Top', value: 0 },
            { text: 'Center', value: 0.5 },
            { text: 'Bottom', value: 1 },
          ]" item-text="text" item-value="value"
          :menu-props="{ top: false, offsetY: true }"
          :value="activeNote.collab.anchor.y"
          @change="changeProp($event, (note, value) => {
            note.collab.anchor.y = value
          })"/>
        </div>
      </div>




      <!-- Width -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4" style="display: flex">
        
        <div style="flex: 1; width: 0">
          <div>
            <div class="body-2 grey--text text--lighten-1"
            style="margin-left: 1px">
              Width:
            </div>

            <Gap height="2px"/>

            <v-select dense outlined hide-details
            background-color="#181818"
            :items="[
              { text: 'Auto', value: 'auto' },
              ...(activeNote.collab.collapsed ? [{ text: 'Expanded', value: 'expanded' }] : []),
              { text: 'Custom', value: 'custom' },
            ]" item-text="text" item-value="value"
            :menu-props="{ top: false, offsetY: true }"
            v-model="width">
            </v-select>
          </div>

          <Gap height="12px"/>

          <div>
            <div class="body-2 grey--text text--lighten-1"
            style="margin-left: 1px">
              Body height:
            </div>

            <Gap height="2px"/>

            <v-select dense outlined hide-details
            background-color="#181818"
            :items="[
              { text: 'Auto', value: 'auto' },
              { text: 'Custom', value: 'custom' },
            ]" item-text="text" item-value="value"
            :menu-props="{ top: false, offsetY: true }"
            v-model="bodyHeight">
            </v-select>
          </div>
        </div>

        <Gap width="16px" style="flex: none"/>
        
        <div style="flex: 1; width: 0">
          <div>
            <div class="body-2 grey--text text--lighten-1"
            style="margin-left: 1px">
              Title height:
            </div>

            <Gap height="2px"/>

            <v-select dense outlined hide-details
            background-color="#181818"
            :items="[
              { text: 'Auto', value: 'auto' },
              { text: 'Custom', value: 'custom' },
            ]" item-text="text" item-value="value"
            :menu-props="{ top: false, offsetY: true }"
            v-model="titleHeight">
            </v-select>
          </div>

          <Gap height="12px"/>

          <div>
            <div class="body-2 grey--text text--lighten-1"
            style="margin-left: 1px">
              Container height:
            </div>

            <Gap height="2px"/>

            <v-select dense outlined hide-details
            background-color="#181818"
            :items="[
              { text: 'Auto', value: 'auto' },
              { text: 'Custom', value: 'custom' },
            ]" item-text="text" item-value="value"
            :menu-props="{ top: false, offsetY: true }"
            v-model="containerHeight">
            </v-select>
          </div>
        </div>
        
      </div>




      <!-- Movable/Resizable -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Movable"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="activeNote.collab.movable"
        @change="changeProp($event, (note, value) => {
          note.collab.movable = value
        })"/>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Resizable"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="activeNote.collab.resizable"
        @change="changeProp($event, (note, value) => {
          note.collab.resizable = value
        })"/>
      </div>




      <!-- Wrapping -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Wrap title"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="activeNote.collab.wrapTitle"
        @change="changeProp($event, (note, value) => {
          note.collab.wrapTitle = value
        })"/>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Wrap body"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="activeNote.collab.wrapBody"
        @change="changeProp($event, (note, value) => {
          note.collab.wrapBody = value
        })"/>
      </div>




      <!-- Read-only -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Read-only"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="activeNote.collab.readOnly"
        @change="changeProp($event, (note, value) => {
          note.collab.readOnly = value
        })"/>
      </div>

    </div>

  </div>
  
</template>

<script setup>
import { computed, useContext } from "@nuxtjs/composition-api"
import { getYjsValue } from "@syncedstore/core"

const ctx = useContext()




function changeProp(value, func) {
  getYjsValue(ctx.$app.collab.store).transact(() => {
    for (const note of ctx.$app.selection.notes)
      func(note, value)
  })
}




// Active note

const activeNote = computed(() => ctx.$app.activeElem.get)




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
    if (activeNote.value.size.x.endsWith('px'))
      return 'custom'
    else
      return activeNote.value.size.x
  },
  set(value) {
    for (const note of ctx.$app.selection.notes) {
      if (value === 'custom') {
        const clientRect = ctx.$app.notes.getClientRect(note, 'frame')

        note.size.x = `${ctx.$app.sizes.screenToWorld1D(clientRect.size.x)}px`
      } else
        note.size.x = value
    }
  },
})




// Section heights

function sectionHeight(section) {
  return computed({
    get() {
      if (activeNote.value.size.y[section].endsWith('px'))
        return 'custom'
      else
        return activeNote.value.size.y[section]
    },
    set(value) {
      changeProp(value, (note, value) => {
        if (value === 'custom') {
          const node = ctx.$app.notes.getNode(note, `${section}-section`)
          const clientRect = node.getBoundingClientRect()

          note.size.y[section] = `${ctx.$app.sizes.screenToWorld1D(clientRect.height)}px`
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