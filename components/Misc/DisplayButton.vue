<template>
      
  <v-tooltip left>

    <template v-slot:activator="{ on }">

      <v-btn style="min-width: 0; width: 36px; padding: 0"
      @click="$emit('click', $event)"
      v-on="on">
        <v-icon>mdi-{{ icon }}</v-icon>
      </v-btn>

    </template>

    <span>{{ tooltip }}</span>

  </v-tooltip>

</template>




<script setup lang="ts">
defineProps<{
  tooltip: string,
  icon: string,
}>()
</script>