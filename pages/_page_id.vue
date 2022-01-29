<template>
  
  <v-app v-show="mounted"
  spellcheck="false">

    <v-app-bar app height="56"
    clipped-left clipped-right>

      <a style="display: flex"
      :href="$root.context.isDev ? 'http://localhost:60379' : 'https://deepnotes.app/'">
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
        Main Page
      </v-app-bar-title>

      <v-spacer/>

      <v-btn depressed
      :href="$root.context.isDev ? 'http://localhost:60379/' : 'https://deepnotes.app/'">
        Home
      </v-btn>

      <v-btn depressed
      :href="$root.context.isDev ? 'http://localhost:60379/account' : 'https://deepnotes.app/account'">
        Account
      </v-btn>

      <v-btn depressed
      @click="$auth.logout()">
        Logout
      </v-btn>
      
    </v-app-bar>

    

    <v-navigation-drawer
    app
    clipped
    permanent
    touchless
    mini-variant
    expand-on-hover
    width="300">

      <v-toolbar>
        <v-list-item-icon>
          <v-icon>mdi-animation</v-icon>
        </v-list-item-icon>

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
    app   
    clipped
    permanent
    touchless
    mini-variant
    expand-on-hover
    right
    width="300">

      <v-toolbar>
        <v-list-item-icon>
          <v-icon>mdi-chart-box</v-icon>
        </v-list-item-icon>

        <v-toolbar-title>
          Properties
        </v-toolbar-title>
      </v-toolbar>

    </v-navigation-drawer>

  </v-app>

</template>

<script setup>
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})




const collapsedLeft = ref(true)
const collapsedRight = ref(true)
</script>

<style>
html {
  overflow: auto;
}

a {
  text-decoration: none;
}
</style>