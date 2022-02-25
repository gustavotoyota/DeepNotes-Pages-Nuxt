<template>

  <v-toolbar dense
  style="flex: none">

    <ToolbarButton icon="content-duplicate"
    :disabled="!$app.page.activeElem.exists"
    @click="$app.page.cloning.perform()"/>

    <ToolbarButton icon="content-cut"
    :disabled="!$app.page.activeElem.exists"
    @click="$app.page.clipboard.cut()"/>

    <ToolbarButton icon="content-copy"
    :disabled="!$app.page.activeElem.exists"
    @click="$app.page.clipboard.copy()"/>

    <ToolbarButton icon="content-paste"
    @click="$app.page.clipboard.paste()"/>




    <v-divider vertical inset class="mx-2"/>




    <ToolbarButton icon="delete-outline"
    :disabled="!$app.page.activeElem.exists"
    @click="$app.page.deleting.perform()"
    :dense="false"/>




    <v-divider vertical inset class="mx-2"/>




    <ToolbarButton icon="format-align-left"
    :disabled="!$app.page.activeElem.exists"/>

    <ToolbarButton icon="format-align-center"
    :disabled="!$app.page.activeElem.exists"/>

    <ToolbarButton icon="format-align-right"
    :disabled="!$app.page.activeElem.exists"/>

    <ToolbarButton icon="format-align-justify"
    :disabled="!$app.page.activeElem.exists"/>

  </v-toolbar>

</template>