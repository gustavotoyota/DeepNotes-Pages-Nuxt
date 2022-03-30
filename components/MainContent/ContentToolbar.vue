<template>

  <v-toolbar dense
  style="flex: none">

    <v-btn rounded style="flex: none; min-width: 0; width: 48px; height: 48px;
    border-top-left-radius: 0; border-bottom-left-radius: 0" color="grey darken-3"
    @click="$app.project.toggleLeftSidebar()">
      <span style="position: relative; left: -2px; top: 1px">
        <v-icon v-if="$app.project.collapsedLeftSidebar" dense>mdi-chevron-right</v-icon>
        <v-icon v-else dense>mdi-chevron-left</v-icon>
      </span>
    </v-btn>



    <div style="flex: 1;
    display: flex;
    width: 0;
    overflow: hidden">
      <Gap width="10px"/>




      <ToolbarButton
      tooltip="Cut"
      icon="content-cut"
      :disabled="!$app.page.activeElem.exists"
      @click="$app.page.clipboard.cut()"/>

      <ToolbarButton
      tooltip="Copy"
      icon="content-copy"
      :disabled="!$app.page.activeElem.exists"
      @click="$app.page.clipboard.copy()"/>

      <ToolbarButton
      tooltip="Paste"
      icon="content-paste"
      @click="$app.page.clipboard.paste()"/>

      <ToolbarButton
      tooltip="Duplicate"
      icon="content-duplicate"
      :disabled="!$app.page.activeElem.exists"
      @click="$app.page.cloning.perform()"/>
      



      <v-divider vertical class="mx-2"/>




      <ToolbarButton
      tooltip="Undo"
      icon="undo"
      :disabled="!$app.page.undoRedo.canUndo"
      @click="$app.page.undoRedo.undo()"/>

      <ToolbarButton
      tooltip="Redo"
      icon="redo"
      :disabled="!$app.page.undoRedo.canRedo"
      @click="$app.page.undoRedo.redo()"/>




      <v-divider vertical class="mx-2"/>




      <ToolbarButton
      tooltip="Select all"
      icon="select-all"
      @click="$app.page.selection.selectAll()"
      :dense="false"/>

      <ToolbarButton
      tooltip="Delete"
      icon="delete-outline"
      :disabled="!$app.page.activeElem.exists"
      @click="$app.page.deleting.perform()"
      :dense="false"/>




      <v-divider vertical class="mx-2"/>




      <ToolbarButton
      tooltip="Align left"
      icon="format-align-left"
      :disabled="!$app.page.activeElem.exists"
      @click="format('formatLine', 'align', '')"/>

      <ToolbarButton
      tooltip="Align center"
      icon="format-align-center"
      :disabled="!$app.page.activeElem.exists"
      @click="format('formatLine', 'align', 'center')"/>

      <ToolbarButton
      tooltip="Align right"
      icon="format-align-right"
      :disabled="!$app.page.activeElem.exists"
      @click="format('formatLine', 'align', 'right')"/>

      <ToolbarButton
      tooltip="Justify"
      icon="format-align-justify"
      :disabled="!$app.page.activeElem.exists"
      @click="format('formatLine', 'align', 'justify')"/>




      <v-divider vertical class="mx-2"/>




      <ToolbarButton
      tooltip="Header 1"
      icon="format-header-1"
      :dense="false"
      :disabled="!$app.page.activeElem.exists"
      @click="format('formatLine', 'header', 1)"/>

      <ToolbarButton
      tooltip="Header 2"
      icon="format-header-2"
      :dense="false"
      :disabled="!$app.page.activeElem.exists"
      @click="format('formatLine', 'header', 2)"/>




      <v-divider vertical class="mx-2"/>




      <ToolbarButton
      tooltip="Clear format"
      icon="format-clear"
      :disabled="!$app.page.activeElem.exists"
      @click="format('removeFormat')"/>




      <v-spacer/>
    </div>



    
    <Gap width="8px"/>




    <v-btn icon large
    :width="32" :height="32"
    :href="$ctx.isDev ? 'http://192.168.1.3:60379/' : 'https://deepnotes.app/'">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <Gap width="4px"/>
    
    <ContentToolbarSettings/>

    <Gap width="4px"/>
    
    <ContentToolbarPopup/>




    <Gap width="12px"/>




    <v-btn rounded style="flex: none; min-width: 0; width: 48px; height: 48px;
    border-top-right-radius: 0; border-bottom-right-radius: 0" color="grey darken-3"
    @click="$app.project.toggleRightSidebar()">
      <span style="position: relative; left: 2px; top: 1px">
        <v-icon v-if="$app.project.collapsedRightSidebar" dense>mdi-chevron-left</v-icon>
        <v-icon v-else dense>mdi-chevron-right</v-icon>
      </span>
    </v-btn>

  </v-toolbar>

</template>




<script setup lang="ts">
import { useContext } from '@nuxtjs/composition-api';
import type { Quill } from 'quill'
import { NoteTextSection } from '~/plugins/app/page/notes/notes';




const ctx = useContext()




function format(funcName: 'formatLine' | 'removeFormat', ...args: any[]) {
  ctx.$app.page.collab.doc.transact(() => {
    for (const selectedNote of ctx.$app.page.selection.notes) {
      for (const section of ['head', 'body']) {
        const quill = selectedNote[`${section}Quill` as `${NoteTextSection}Quill`] as Quill

        if (quill == null)
          continue

        const selection = quill.getSelection()

        if (quill.isEnabled()) {
          if (selection != null)
            quill[funcName](selection.index, selection.length, ...args)
        } else
          quill[funcName](0, Infinity, ...args)
      }
    }
  })
}
</script>




<style scoped>
.v-toolbar /deep/ .v-toolbar__content {
  padding-left: 0;
  padding-right: 0;

  justify-content: center;
}
</style>