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

            <div style="color: #a0a0a0">
              Drag and drop templates to change their order.
            </div>
                
            <Gap height="16px"/>

            <div style="display: flex">
              <v-btn @click="selectedTemplates = Array.from(Array(10)).map((e, i) => i)">
                Select all
              </v-btn>

              <Gap width="16px"/>

              <v-btn
              @click="selectedTemplates = []">
                Clear all
              </v-btn>
            </div>

            <Gap height="16px"/>

            <div style="flex: 1; height: 0; display: flex">

              <div style="flex: 1">

                <v-list color="#303030"
                style="border-radius: 10px;
                max-height: 100%;
                padding: 0;
                overflow-y: auto">

                  <v-list-item-group
                  multiple
                  v-model="selectedTemplates">

                    <draggable v-model="templates"
                    animation="200">
                    
                      <v-list-item
                      v-for="template of templates" :key="template.id">
                        <v-list-item-content>
                          <v-list-item-title>{{ template.name }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon v-if="template.id === defaultId">
                          <v-icon>mdi-check-circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-icon>
                          <v-icon>mdi-{{ template.visible ? 'eye' : 'eye-off' }}</v-icon>
                        </v-list-item-icon>
                      </v-list-item>
                      
                    </draggable>

                  </v-list-item-group>

                </v-list>

              </div>

              <div style="flex: none; 
              margin-left: 16px;
              width: 200px">

                <v-btn block
                :disabled="selectedTemplates.length !== 1
                || defaultId === templates[selectedTemplates[0]].id"
                @click="defaultId = templates[selectedTemplates[0]].id">
                  Set as default
                </v-btn>
                
                <Gap height="16px"/>

                <v-btn block
                :disabled="selectedTemplates.length !== 1"
                @click="">
                  Rename
                </v-btn>
                
                <Gap height="16px"/>

                <v-btn block
                :disabled="selectedTemplates.length === 0"
                @click="toggleVisibility()">
                  Toggle visibility
                </v-btn>
                
                <Gap height="16px"/>

                <v-btn block
                :disabled="selectedTemplates.length === 0"
                @click="deleteSelection()">
                  Delete
                </v-btn>

              </div>

            </div>

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
        @click="save()">
          Ok
        </v-btn>

      </v-card-actions>

    </v-card>

  </v-dialog>


</template>




<script setup lang="ts">
import { ref, useContext, watch } from '@nuxtjs/composition-api';
import { cloneDeep } from 'lodash';
import Vue from 'vue';
import { ITemplate } from '~/plugins/app/templates';

const ctx = useContext()




const dialog = ref(false)
const tab = ref('' as string)




const templates = ref([] as ITemplate[])
const defaultId = ref('')

const selectedTemplates = ref([] as number[])




watch(dialog, () => {
  if (!dialog.value)
    return

  tab.value = 'general'

  templates.value = cloneDeep(ctx.$app.templates.list)
  defaultId.value = ctx.$app.templates.defaultId

  selectedTemplates.value = []
})

function save() {
  dialog.value = false

  ctx.$app.templates.list = templates.value
  ctx.$app.templates.defaultId = defaultId.value
}




function toggleVisibility() {
  let allVisible = true
  for (const index of selectedTemplates.value) {
    const template = templates.value[index]

    if (template.visible)
      continue

    allVisible = false
    break
  }

  for (const index of selectedTemplates.value)
    templates.value[index].visible = !allVisible
}




function deleteSelection() {
  // Check if default template is selected

  for (const index of selectedTemplates.value) {
    if (defaultId.value !== templates.value[index].id)
      continue

    ctx.$app.snackbar.show('Cannot delete default template', 'red')
    return
  }




  for (let i = selectedTemplates.value.length - 1; i >= 0; --i)
    Vue.delete(templates.value, selectedTemplates.value[i])

  selectedTemplates.value = []
}
</script>