<template>

  <v-btn text small
  :disabled="disabled"
  style="min-width: 0; width: 28px"
  @click="$emit('click', $event)">
    <v-icon :dense="dense">mdi-{{ icon }}</v-icon>
  </v-btn>

</template>




<script setup lang="ts">
const props = withDefaults(defineProps<{
  icon: string,
  disabled?: boolean,
  dense?: boolean,
}>(), {
  dense: true,
})
</script>