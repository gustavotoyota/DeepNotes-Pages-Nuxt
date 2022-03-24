<template>

  <v-navigation-drawer
  app
  clipped
  permanent
  touchless
  stateless
  :width="$app.project.collapsedLeftSidebar ? 56 : 300">

    <div style="height: 100%;
    width: 300px;
    display: flex;
    flex-direction: column">

      <v-toolbar dense style="flex: none">

        <v-icon style="position: relative; top: 1px">mdi-animation</v-icon>




        <v-toolbar-title style="margin-left: 23px;
        position: relative; top: 1px">
          Path
        </v-toolbar-title>




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

      </v-toolbar>




      <v-list dense style="flex: 1">
        
        <v-tooltip right
        :nudge-left="243"
        :max-width="300"
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

              <v-list-item-content>
                <v-list-item-title>
                  {{ (pageRef.id == $app.page.id) ? $app.page.data.name : pageRef.name }}
                </v-list-item-title>
              </v-list-item-content>

            </v-list-item>

          </template>

          <span>{{ (pageRef.id == $app.page.id) ? $app.page.data.name : pageRef.name }}</span>

        </v-tooltip>

      </v-list>

    </div>

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

.v-list-item__title {
  white-space: normal;
}
</style>