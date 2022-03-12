<template>

  <v-menu bottom offset-y
  :min-width="150">

    <template v-slot:activator="{ on, attrs }">

      <v-btn icon x-large
      :width="32" :height="32"
      v-bind="attrs" v-on="on"
      style="margin-right: 0">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

    </template>

    <v-list dense>

      <v-list-item
      :href="$ctx.isDev ? 'http://192.168.1.3:60379/account' : 'https://deepnotes.app/account'">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Account</v-list-item-title>
      </v-list-item>

      <v-list-item @click="$auth.logout()">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>

    </v-list>

  </v-menu>
  
</template>




<style scoped>
.v-menu__content {
  left: auto !important;
  right: 5px;
}




.v-list {
  padding: 0 !important;
}
</style>