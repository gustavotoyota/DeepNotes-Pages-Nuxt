<template>
  
  <v-app spellcheck="false">

    <v-app-bar app clipped-left clipped-right>

      <a href="/" style="display: flex">
        <img src="/icon.png"
        style="width: 24px; height: 24px;
        position: relative; top: 4px"/>

        <Gap width="7px" display="inline-block"/>
          
        <v-app-bar-title style="flex: none; display: flex">
          DeepNotes
        </v-app-bar-title>
      </a>

      <Gap width="16px"/>

      <v-btn text
      :href="$root.context.isDev ? 'http://localhost:60379' : 'https://deepnotes.app/'">
        Home
      </v-btn>
      
    </v-app-bar>

    

    <v-navigation-drawer
    app clipped permanent touchless mini-variant
    width="300">

      <v-toolbar>

        <v-toolbar-title>
          
          <v-btn rounded icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>

        </v-toolbar-title>
        
      </v-toolbar>

    </v-navigation-drawer>



    <v-main>

    </v-main>

    

    <v-navigation-drawer
    app clipped permanent touchless mini-variant right
    width="300">

    </v-navigation-drawer>

  </v-app>

</template>

<script>
export default {

}
</script>

<style>

</style>