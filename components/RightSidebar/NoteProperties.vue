<template>

  <v-list v-if="$app.project.collapsedRightSidebar" dense>

    <SidebarMinibutton tooltip="Head"
    icon="page-layout-header"
    :value="activeNote.collab.hasHead"
    @click="changeProp(!activeNote.collab.hasHead, (note, value) => {
      note.collab.hasHead = value
      note.collab.hasBody = note.collab.hasBody || note.numSections === 0
    })"/>

    <SidebarMinibutton tooltip="Swap head and body"
    icon="swap-vertical"
    @click="swapHeadAndBody"/>

    <SidebarMinibutton tooltip="Body"
    icon="page-layout-body"
    :value="activeNote.collab.hasBody"
    @click="changeProp(!activeNote.collab.hasBody, (note, value) => {
      note.collab.hasBody = value
      note.collab.hasHead = note.collab.hasHead || note.numSections === 0
    })"/>




    <v-divider style="border-color: rgba(255, 255, 255, 0.5)"/>




    <SidebarMinibutton tooltip="Collapsible"
    icon="minus-box"
    :value="activeNote.collab.collapsible"
    @click="changeProp(!activeNote.collab.collapsible, (note, value) => {
      note.collab.collapsible = value
    })"/>

    <SidebarMinibutton tooltip="Collapsed"
    icon="chevron-up-box-outline"
    :value="activeNote.collapsed"
    @click="changeProp(!activeNote.collapsed, (note, value) => {
      $app.page.collapsing.set(note, value)
    })"/>



    
    <v-divider style="border-color: rgba(255, 255, 255, 0.5)"/>




    <SidebarMinibutton tooltip="Container"
    icon="page-layout-footer"
    :value="activeNote.collab.container"
    @click="changeProp(!activeNote.collab.container, (note, value) => {
      note.collab.container = value
      note.collab.hasBody = note.collab.hasBody || note.numSections === 0
    })"/>

  </v-list>




  <div v-else>

    <!-- Linked page -->
    
    <div class="mx-5 mt-4">
      <div class="body-2 grey--text text--lighten-1"
      style="margin-left: 1px">
        Linked page:
      </div>

      <Gap height="2px"/>

      <v-select dense outlined hide-details
      background-color="#181818" clearable
      :items="$app.page.project.recentPages" item-text="name" item-value="id"
      :menu-props="{ top: false, offsetY: true }"
      :value="activeNote.collab.linkedPageId"
      @change="changeProp($event, (note, value) => {
        note.collab.linkedPageId = value
      })"/>

      <Gap height="10px"/>
      
      
      <NewPageDialog/>
    </div>




    <!-- Head/Body -->

    <v-divider class="mt-4"/>
      
    <div class="mx-5 mt-4"
    style="display: flex; flex-direction: column">
      <div style="display: flex">
        <v-checkbox hide-details label="Head"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="activeNote.collab.hasHead"
        @change="changeProp($event, (note, value) => {
          note.collab.hasHead = value
          note.collab.hasBody = note.collab.hasBody || note.numSections === 0
        })"/>

        <Gap width="16px" style="flex: none"/>

        <v-checkbox hide-details label="Body"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="activeNote.collab.hasBody"
        @change="changeProp($event, (note, value) => {
          note.collab.hasBody = value
          note.collab.hasHead = note.collab.hasHead || note.numSections === 0
        })"/>
      </div>

      <Gap height="12px"/>

      <v-btn @click="swapHeadAndBody">
        Swap head and body
      </v-btn>
    </div>




    <!-- Template -->

    <v-divider class="mt-4"/>

    <div class="mx-5 mt-4">
      <SaveAsTemplateDialog/>
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
          note.collab.pos.x += (value - note.collab.anchor.x) * note.worldSize.x
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
          note.collab.pos.y += (value - note.collab.anchor.y) * note.worldSize.y
          note.collab.anchor.y = value
        })"/>
      </div>
    </div>




    <!-- Collapsible/Collapsed -->

    <v-divider class="mt-4"/>
      
    <div class="mx-5 mt-4">
      <div style="display: flex">
        <v-checkbox hide-details label="Collapsible"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="activeNote.collab.collapsible"
        @change="changeProp($event, (note, value) => {
          note.collab.collapsible = value
        })"/>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Collapsed"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :disabled="!activeNote.collab.collapsible"
        :input-value="activeNote.collab.collapsed"
        @change="changeProp($event, (note, value) => {
          note.collab.collapsed = value
        })"/>
      </div>
      
      <Gap height="10px"/>

      <div style="display: flex">
        <v-checkbox hide-details label="Local collapsing"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :disabled="!activeNote.collab.collapsible"
        :input-value="activeNote.collab.localCollapsing"
        @change="changeProp($event, (note, value) => {
          note.collab.localCollapsing = value
        })"/>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Locally collapsed"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :disabled="!activeNote.collab.collapsible || !activeNote.collab.localCollapsing"
        :input-value="activeNote.locallyCollapsed"
        @change="changeProp($event, (note, value) => {
          note.locallyCollapsed = value
        })"/>
      </div>
    </div>




    <!-- Container -->

    <v-divider class="mt-4"/>
      
    <div class="mx-5 mt-4">
      <div style="display: flex">
        <v-checkbox hide-details label="Container"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="activeNote.collab.container"
        @change="changeProp($event, (note, value) => {
          note.collab.container = value
          note.collab.hasBody = note.collab.hasBody || note.numSections === 0
        })"/>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Horizontal"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :disabled="!activeNote.collab.container"
        :input-value="activeNote.collab.horizontal"
        @change="changeProp($event, (note, value) => {
          note.collab.horizontal = value
        })"/>
      </div>
      
      <Gap height="10px"/>
      
      <div style="display: flex">
        <v-checkbox hide-details label="Stretch children"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :disabled="!activeNote.collab.container || activeNote.collab.horizontal"
        :input-value="activeNote.collab.stretchChildren"
        @change="changeProp($event, (note, value) => {
          note.collab.stretchChildren = value
        })"/>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Wrap children"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :disabled="!activeNote.collab.container"
        :input-value="activeNote.collab.wrapChildren"
        @change="changeProp($event, (note, value) => {
          note.collab.wrapChildren = value
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
            ...(activeNote.collapsed ? [{ text: 'Expanded', value: 'expanded' }] : []),
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
            Head height:
          </div>

          <Gap height="2px"/>

          <v-select dense outlined hide-details
          background-color="#181818"
          :items="[
            { text: 'Auto', value: 'auto' },
            { text: 'Custom', value: 'custom' },
          ]" item-text="text" item-value="value"
          :menu-props="{ top: false, offsetY: true }"
          v-model="headHeight">
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
      <v-checkbox hide-details label="Wrap head"
      style="flex: 1; margin-top: 0; padding-top: 0"
      :input-value="activeNote.collab.wrapHead"
      @change="changeProp($event, (note, value) => {
        note.collab.wrapHead = value
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
  
</template>

<script setup lang="ts">
import { computed, useContext } from "@nuxtjs/composition-api"
import { Note, NoteSection } from "~/plugins/app/page/notes/notes";
import { Op } from "~/plugins/static/types"

const ctx = useContext()




function changeProp(value: any, func: (note: Note, value: any) => void) {
  ctx.$app.page.collab.doc.transact(() => {
    for (const note of ctx.$app.page.selection.notes)
      func(note, value)
  })
}




// Active note

const activeNote = computed(() => ctx.$app.page.activeElem.get as Note)




// Swap head and body

function swapHeadAndBody() {
  changeProp(null, (note: Note, value: any) => {
    const headDelta: Op[] = note.collab.head.toDelta()
    const bodyDelta: Op[] = note.collab.body.toDelta()

    note.collab.head.delete(0, note.collab.head.length)
    note.collab.body.delete(0, note.collab.body.length)

    note.collab.head.applyDelta(bodyDelta)
    note.collab.body.applyDelta(headDelta)
  })
}




// Note width

const width = computed({
  get(): string {
    if (activeNote.value.domSize.x.endsWith('px'))
      return 'custom'
    else
      return activeNote.value.domSize.x
  },
  set(value: string) {
    for (const note of ctx.$app.page.selection.notes) {
      if (value === 'custom')
        note.domSize.x = `${note.worldSize.x}px`
      else
        note.domSize.x = value
    }
  },
})




// Section heights

function sectionHeight(section: NoteSection) {
  return computed({
    get(): string {
      if (activeNote.value.domSize.y[section].endsWith('px'))
        return 'custom'
      else
        return activeNote.value.domSize.y[section]
    },
    set(value: string) {
      changeProp(value, (note, value) => {
        if (value === 'custom') {
          const worldRect = note.getWorldRect(`note-${section}-section`)

          note.domSize.y[section] = `${worldRect.size.y}px`
        } else
          note.domSize.y[section] = value
      })
    },
  })
}

const headHeight = sectionHeight(NoteSection.HEAD)
const bodyHeight = sectionHeight(NoteSection.BODY)
const containerHeight = sectionHeight(NoteSection.CONTAINER)
</script>

<style>

</style>