<template>

  <v-tooltip left>

    <template v-slot:activator="{ on }">

      <v-list-item v-on="on"
      :disabled="!$app.page.loaded || disabled"
      :input-value="value"
      @click="$emit('click', $event)">
        <v-list-item-icon>
          <v-icon :color="$app.page.loaded ? undefined : 'rgb(255, 255, 255, 0.3)'">
            mdi-{{icon}}
          </v-icon>
        </v-list-item-icon>
      </v-list-item>

    </template>

    <span>{{tooltip}}</span>

  </v-tooltip>

</template>




<script setup lang="ts">
defineProps<{
  tooltip: string,
  icon: string,
  value?: boolean,
  disabled?: boolean,
}>()
</script>