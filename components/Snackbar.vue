<template>

  <v-snackbar :timeout="-1"
  v-model="$app.snackbar.active">

    {{ $app.snackbar.text }}

    <template v-slot:action="{ attrs }">

      <v-btn text v-bind="attrs"
      :color="$app.snackbar.color"
      @click="$app.snackbar.active = false">
        Close
      </v-btn>

    </template>

  </v-snackbar>


</template>