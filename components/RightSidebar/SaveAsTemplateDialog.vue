<template>

  <v-dialog
  v-model="dialog"
  width="300">

    <template v-slot:activator="{ attrs, on }">

      <v-btn block
      v-bind="attrs" v-on="on">
        Save as template
      </v-btn>
      
    </template>

    <v-card>

      <v-card-title>Save as template</v-card-title>

      <v-divider/>

      <v-card-text style="padding-top: 20px">

        <v-combobox dense outlined hide-details
        label="Name"
        background-color="#181818"/>

      </v-card-text>

      <v-divider/>

      <v-card-actions>

        <v-spacer/>

        <v-btn
        color="blue darken-1"
        text
        @click="dialog = false">
          Cancel
        </v-btn>

        <v-btn
        color="blue darken-1"
        text
        @click="dialog = false">
          Ok
        </v-btn>

      </v-card-actions>

    </v-card>

  </v-dialog>

</template>




<script setup lang="ts">
import { ref } from '@nuxtjs/composition-api';




const dialog = ref(false)
</script>