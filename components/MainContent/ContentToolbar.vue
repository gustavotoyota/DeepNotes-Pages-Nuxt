<template>

  <v-toolbar dense
  style="flex: none">

    <v-btn rounded style="flex: none; min-width: 0; width: 48px; height: 48px;
    border-top-left-radius: 0; border-bottom-left-radius: 0" color="grey darken-3"
    @click="$app.project.collapsedLeftSidebar = !$app.project.collapsedLeftSidebar">
      <span style="position: relative; left: -2px; top: 1px">
        <v-icon v-if="$app.project.collapsedLeftSidebar" dense>mdi-chevron-right</v-icon>
        <v-icon v-else dense>mdi-chevron-left</v-icon>
      </span>
    </v-btn>




    <Gap width="16px"/>




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




    <v-spacer/>




    <Gap width="16px"/>




    <v-btn rounded style="flex: none; min-width: 0; width: 48px; height: 48px;
    border-top-right-radius: 0; border-bottom-right-radius: 0" color="grey darken-3"
    @click="$app.project.collapsedRightSidebar = !$app.project.collapsedRightSidebar">
      <span style="position: relative; left: 2px; top: 1px">
        <v-icon v-if="$app.project.collapsedRightSidebar" dense>mdi-chevron-left</v-icon>
        <v-icon v-else dense>mdi-chevron-right</v-icon>
      </span>
    </v-btn>

  </v-toolbar>

</template>




<style scoped>
.v-toolbar /deep/ .v-toolbar__content {
  padding-left: 0;
  padding-right: 0;
}
</style>