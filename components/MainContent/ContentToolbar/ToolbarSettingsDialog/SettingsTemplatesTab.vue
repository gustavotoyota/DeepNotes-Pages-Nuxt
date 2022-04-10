<template>

  <div style="display: contents">

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
                <v-list-item-icon v-if="template.id === defaultTemplateId">
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
        || defaultTemplateId === templates[selectedTemplates[0]].id"
        @click="defaultTemplateId = templates[selectedTemplates[0]].id">
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

  </div>

</template>




<script setup lang="ts">
import { ref, useContext } from '@nuxtjs/composition-api';
import Vue from 'vue';
import { ITemplate } from '~/plugins/app/templates';

const ctx = useContext()




const templates = ref([] as ITemplate[])
const defaultTemplateId = ref('')

const selectedTemplates = ref([] as number[])




defineExpose({
  templates,
  defaultTemplateId,
  selectedTemplates,
})




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
    if (defaultTemplateId.value !== templates.value[index].id)
      continue

    ctx.$app.snackbar.show('Cannot delete default template', 'red')
    return
  }




  for (let i = selectedTemplates.value.length - 1; i >= 0; --i)
    Vue.delete(templates, selectedTemplates.value[i])

  selectedTemplates.value = []
}
</script>