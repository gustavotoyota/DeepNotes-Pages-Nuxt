<template>

  <v-dialog
  v-model="dialog"
  width="750">

    <template v-slot:activator="{ on, attrs }">
      
      <v-btn icon large
      :width="32" :height="32"
      v-bind="attrs" v-on="on">
        <v-icon>mdi-cog</v-icon>
      </v-btn>

    </template>

    <v-card
    style="display: flex; flex-direction: column"
    height="550">

      <v-card-title>
        <span class="text-h5">Settings</span>
      </v-card-title>
      
      <v-divider/>

      <div style="flex: 1; display: flex">

        <div style="flex: none; width: 180px">

          <v-list>

            <v-list-item
            :input-value="tab === 'general'"
            @click="tab = 'general'">
              <v-list-item-title>
                General
              </v-list-item-title>
            </v-list-item>

            <v-list-item
            :input-value="tab === 'templates'"
            @click="tab = 'templates'">
              <v-list-item-title>
                Templates
              </v-list-item-title>
            </v-list-item>

          </v-list>

        </div>

        <v-divider vertical/>

        <v-card-text style="flex: 1; padding-top: 20px">

          <template v-if="tab === 'general'">

            <v-checkbox hide-details
            label="Start with left sidebar expanded"
            style="margin-top: 0; padding-top: 0"/>

            <Gap height="8px"/>
            
            <v-checkbox hide-details
            label="Use finger for panning"
            style="margin-top: 0; padding-top: 0"/>

          </template>

          <template v-if="tab === 'templates'">
          </template>

        </v-card-text>

      </div>
      
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

const tab = ref('general')
</script>