<template>

  <v-app-bar app
  clipped-left clipped-right
  dense>

    <a style="display: flex"
    :href="$ctx.isDev ? 'http://192.168.1.3:60379' : 'https://deepnotes.app/'">
      <img src="/icon.png"
      style="width: 24px; height: 24px;
      position: relative; top: 4px"/>

      <Gap width="7px" inline-block/>
        
      <v-app-bar-title
      style="display: flex;
      color: white">
        DeepNotes
      </v-app-bar-title>
    </a>

    <Gap width="16px"/>

    <v-spacer/>

    <v-app-bar-title>
      {{ $app.page.data.name }}
    </v-app-bar-title>

    <v-spacer/>

    <v-btn icon large
    :width="32" :height="32">
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <Gap width="8px"/>
    
    <MainMenuPopup/>
    
  </v-app-bar>
  
</template>




<script setup lang="ts">
</script>




<style scoped>
.v-app-bar /deep/ .v-toolbar__content {
  padding-right: 8px;
}
</style>