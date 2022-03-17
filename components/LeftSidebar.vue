<template>

  <v-navigation-drawer
  app
  clipped
  permanent
  touchless
  stateless
  :mini-variant.sync="$app.project.collapsedLeftSidebar"
  width="300">

    <v-toolbar dense>

      <v-icon style="position: relative; top: 1px">mdi-animation</v-icon>




      <v-toolbar-title v-if="!$app.project.collapsedLeftSidebar"
      style="margin-left: 23px;
      position: relative; top: 1px">
        Path
      </v-toolbar-title>




      <template v-if="!$app.project.collapsedLeftSidebar">
        <v-spacer/>



        
        <v-btn icon :width="36" :height="36"
        :disabled="$app.project.pageIndex <= 0"
        @click="$app.project.navigatePath(-1)">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>

        <v-btn icon :width="36" :height="36"
        :disabled="$app.project.pageIndex >= $app.project.pathPages.length - 1"
        @click="$app.project.navigatePath(+1)">
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>




        <Gap width="0"/>
      </template>

    </v-toolbar>

    <v-list dense>
      
      <v-tooltip right
      :disabled="!$app.project.collapsedLeftSidebar"
      v-for="pageRef in $app.page.project.pathPages" :key="pageRef.id">

        <template v-slot:activator="{ on }">

          <v-list-item v-on="on"
          :input-value="pageRef.id == $app.page.id"
          @click="$app.project.navigateTo(pageRef.id)"
          link>
            <v-list-item-icon>
              <v-icon>mdi-note</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ (pageRef.id == $app.page.id) ? $app.page.data.name : pageRef.name }}
            </v-list-item-title>
          </v-list-item>

        </template>

        <span>{{ (pageRef.id == $app.page.id) ? $app.page.data.name : pageRef.name }}</span>

      </v-tooltip>

    </v-list>

  </v-navigation-drawer>
  
</template>




<script setup lang="ts">
</script>




<style scoped>
.v-toolbar /deep/ .v-toolbar__content {
  padding-right: 9px;
}

.v-list-item__icon {
  margin-right: 24px !important;
}
</style>