<template>

  <v-dialog
  v-model="dialog"
  width="300">

    <template v-slot:activator="{ attrs, on }">

      <v-btn block
      :disabled="disabled"
      v-bind="attrs" v-on="on">
        Rename
      </v-btn>
      
    </template>

    <v-card>

      <v-card-title>Rename template</v-card-title>

      <v-divider/>

      <v-card-text style="padding-top: 20px">

        <v-text-field v-model="name"/>

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
        @click="$emit('rename', name); dialog = false">
          Ok
        </v-btn>

      </v-card-actions>

    </v-card>

  </v-dialog>

</template>




<script setup lang="ts">
import { ref, onMounted, watch } from '@nuxtjs/composition-api';




const props = defineProps<{
  initialName: string,
  disabled?: boolean,
}>()




const dialog = ref(false)

const name = ref('')




onMounted(() => {
  watch(dialog, () => {
    if (!dialog.value)
      return

    name.value = props.initialName
  })
})
</script>