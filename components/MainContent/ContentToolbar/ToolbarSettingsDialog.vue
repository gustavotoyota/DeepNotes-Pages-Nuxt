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

      <div style="flex: 1; height: 0; display: flex">

        <div style="flex: none; width: 180px">

          <v-list>

            <v-list-item
            :input-value="tab === 'general'"
            @click="tab = 'general'">
              <v-list-item-content>
                <v-list-item-title>
                  General
                </v-list-item-title>
              </v-list-item-content>  
            </v-list-item>

            <v-list-item
            :input-value="tab === 'templates'"
            @click="tab = 'templates'">
              <v-list-item-content>
                <v-list-item-title>
                  Templates
                </v-list-item-title>
              </v-list-item-content>  
            </v-list-item>

          </v-list>

        </div>

        <v-divider vertical/>

        <v-card-text style="flex: 1;
        padding: 32px;
        display: flex; flex-direction: column">

          <SettingsGeneralTab ref="generalTab" v-show="tab === 'general'"/>
          <SettingsTemplatesTab ref="templatesTab" v-show="tab === 'templates'"/>

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
        @click="save()">
          Ok
        </v-btn>

      </v-card-actions>

    </v-card>

  </v-dialog>


</template>




<script setup lang="ts">
import { onMounted, ref, useContext, watch } from '@nuxtjs/composition-api';
import { cloneDeep } from 'lodash';

const ctx = useContext()




const dialog = ref(false)
const tab = ref('' as string)




const generalTab = ref()
const templatesTab = ref()




onMounted(() => {
  watch(dialog, () => {
    if (!dialog.value)
      return

    tab.value = 'general'

    templatesTab.value.templates = cloneDeep(ctx.$app.templates.list)
    templatesTab.value.defaultTemplateId = ctx.$app.templates.defaultId

    templatesTab.value.selectedTemplates = []
  }, { immediate: true })
})




function save() {
  dialog.value = false

  ctx.$app.templates.list = templatesTab.value.templates
  ctx.$app.templates.defaultId = templatesTab.value.defaultTemplateId
}
</script>