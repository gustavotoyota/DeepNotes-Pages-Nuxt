<template>

  <v-dialog max-width="280" v-model="active">


    <template v-slot:activator="{ on }">
      <v-btn style="width: 100%" v-on="on">
        Create new page
      </v-btn>
    </template>



    <v-form @submit.prevent="onSubmit">
    
      <v-card>

        <v-card-title>
          New Page
        </v-card-title>

        <v-card-text>

          <v-text-field ref="name"
          label="Page name"
          v-model="name">
          </v-text-field>

        </v-card-text>

        <v-divider/>

        <v-card-actions>

          <v-spacer/>

          <v-btn color="primary" text type="submit">
            Ok
          </v-btn>

          <v-btn color="primary" text @click="active = false">
            Cancel
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-form>

  </v-dialog>

</template>

<script>
export default {
  
  data() {
    return {
      active: false,
      name: '',
    }
  },



  methods: {

    onSubmit() {
      this.active = false

      const selectedNotes = this.$app.selection.notes
      
      this.$app.page.reset({ name: this.name })

      for (const selectedNote of selectedNotes)
        selectedNote.linkedPageId = this.$app.page.id
    },

  },



  watch: {

    active(value) {
      if (!value)
        return

      setTimeout(() => {
        const activeNote = this.$app.activeElem.get

        const text = activeNote.collab[activeNote.topSection]
        if (!text)
          return

        this.name = text.toString().split('\n')[0]
        this.$refs.name.focus()
      })
    }

  },

}
</script>

<style>

</style>