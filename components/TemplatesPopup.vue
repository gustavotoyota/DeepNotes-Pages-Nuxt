<template>

  <v-menu
  absolute
  v-model="$app.templates.popupVisible"
  :position-x="$app.templates.popupPos.x"
  :position-y="$app.templates.popupPos.y">
    
    <v-list dense
    style="padding: 0">
      <v-list-item
      v-for="template in $app.templates.list.filter(item => item.visible)" :key="template.id"
      @click="$app.page.notes.createFromTemplate(template, $app.templates.popupPos)">
        <v-list-item-content>
          <v-list-item-title>{{ template.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-menu>

</template>