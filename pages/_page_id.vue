<template>
  
  <v-app spellcheck="false">

    <v-app-bar app height="56"
    clipped-left clipped-right>

      <a style="display: flex"
      :href="$root.context.isDev ? 'http://localhost:60379' : 'https://deepnotes.app/'">
        <img src="/icon.png"
        style="width: 24px; height: 24px;
        position: relative; top: 4px"/>

        <Gap width="7px" display="inline-block"/>
          
        <v-app-bar-title style="flex: none; display: flex">
          DeepNotes
        </v-app-bar-title>
      </a>

      <v-spacer/>

      <v-app-bar-title>
        Main Page
      </v-app-bar-title>

      <v-spacer/>

      <v-btn depressed
      :href="$root.context.isDev ? 'http://localhost:60379/account' : 'https://deepnotes.app/account'">
        Account
      </v-btn>
      
    </v-app-bar>

    

    <v-navigation-drawer
    app clipped permanent touchless
    mini-variant
    expand-on-hover
    width="300">

      <v-toolbar>
        <v-btn icon rounded plain
        :ripple="false" style="cursor: inherit">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-toolbar-title>
          Page Path
        </v-toolbar-title>
      </v-toolbar>

      <v-list dense>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-note</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Main Page
          </v-list-item-title>
        </v-list-item>
        
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-note</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Page 1
          </v-list-item-title>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>



    <v-main>

    </v-main>

    

    <v-navigation-drawer
    app clipped permanent touchless right
    mini-variant
    expand-on-hover
    width="300">

      <v-toolbar>
        <v-btn icon rounded plain
        :ripple="false" style="cursor: inherit">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-toolbar-title>
          Page Path
        </v-toolbar-title>
      </v-toolbar>

      <v-list dense>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-note</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Main Page
          </v-list-item-title>
        </v-list-item>
        
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-note</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Page 1
          </v-list-item-title>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>

  </v-app>

</template>

<script>
export default {

}
</script>

<style>
a {
  text-decoration: none;
}
</style>