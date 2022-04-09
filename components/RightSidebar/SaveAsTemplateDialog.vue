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
        background-color="#181818"
        :items="items"
        v-model="templateItem"/>

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
        :disabled="templateItem == null"
        @click="save">
          Ok
        </v-btn>

      </v-card-actions>

    </v-card>

  </v-dialog>

</template>




<script setup lang="ts">
import { computed, ref, useContext } from '@nuxtjs/composition-api';
import { isString } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ITemplate } from '~/plugins/app/templates';




const ctx = useContext()




const dialog = ref(false)

const templateItem = ref(null as any)




const items = computed(() => {
  const items = []

  for (const template of ctx.$app.templates.list) {
    items.push({
      text: template.name,
      value: template.id,
    })
  }

  return items
})




async function save() {
  dialog.value = false




  const templateNote = ctx.$app.serialization.serialize({
    noteIds: [ctx.$app.page.activeElem.id!],
    arrowIds: [],
  }).notes[0]




  let template: ITemplate

  if (isString(templateItem.value)) {
    template = {
      id: uuidv4(),
      name: templateItem.value,
      visible: true,
      data: templateNote,
    }

    ctx.$app.templates.list.push(template)
  } else {
    template = ctx.$app.templates.list.find(
      item => item.id === templateItem.value.value) as ITemplate

    template.data = templateNote
  }




  await ctx.$axios.post('/api/template/save', template)
}
</script>