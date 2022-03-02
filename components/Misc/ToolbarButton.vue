<template>
      
  <v-tooltip bottom>

    <template v-slot:activator="{ on }">

      <v-btn text small
      :disabled="disabled"
      style="min-width: 0; width: 28px"
      @click="$emit('click', $event)"
      v-on="on">
        <v-icon :dense="dense">mdi-{{ icon }}</v-icon>
      </v-btn>

    </template>

    <span>{{ tooltip }}</span>

  </v-tooltip>

</template>




<script setup lang="ts">
withDefaults(defineProps<{
  icon: string,
  disabled?: boolean,
  dense?: boolean,
  tooltip: string,
}>(), {
  dense: true,
})
</script>