<template>

  <v-app-bar app
  clipped-left clipped-right
  dense>

    <a style="display: flex"
    :href="$ctx.isDev ? 'http://localhost:60379' : 'https://deepnotes.app/'">
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

    <v-app-bar-title v-if="$app.page.collab.store != null">
      {{ $app.page.data.collab.name }}
    </v-app-bar-title>

    <v-spacer/>

    <v-btn depressed
    :href="$ctx.isDev ? 'http://localhost:60379/' : 'https://deepnotes.app/'">
      Home
    </v-btn>

    <v-btn depressed
    :href="$ctx.isDev ? 'http://localhost:60379/account' : 'https://deepnotes.app/account'">
      Account
    </v-btn>

    <v-btn depressed
    @click="$auth.logout()">
      Logout
    </v-btn>
    
  </v-app-bar>
  
</template>

<script setup lang="ts">
</script>

<style>

</style>