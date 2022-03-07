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

    <Gap width="16px" inline-block/>

    <v-spacer/>

    <v-app-bar-title>
      {{ $app.page.data.name }}
    </v-app-bar-title>

    <v-spacer/>
    
    <v-menu bottom offset-y
    :min-width="140">

      <template v-slot:activator="{ on, attrs }">

        <v-btn icon x-large
        :width="36" :height="36"
        v-bind="attrs" v-on="on"
        style="margin-right: 0">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>

      </template>

      <v-list dense>

        <v-list-item
        :href="$ctx.isDev ? 'http://192.168.1.3:60379/account' : 'https://deepnotes.app/account'">
          <v-list-item-title>Account</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$auth.logout()">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>

      </v-list>

    </v-menu>
    
  </v-app-bar>
  
</template>

<script setup lang="ts">
</script>

<style scoped>
.v-app-bar /deep/ .v-toolbar__content {
  padding-right: 8px;
}




.v-menu__content {
  left: auto !important;
  right: 5px;
}




.v-list {
  padding: 0 !important;
}
</style>