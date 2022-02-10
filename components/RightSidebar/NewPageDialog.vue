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

      const selectedElems = $app.selection.getElems()
      
      const page = $app.pages.create(this.name)

      for (const selectedElem of selectedElems)
        selectedElem.linkedPageId = page.id
    },

  },



  watch: {

    active(value) {
      if (!value)
        return

      setTimeout(() => {
        let editorNode
        if ($getters.elem.hasTitle)
          editorNode = $app.elems.getNode($getters.elem, 'title-editor')
        else if ($getters.elem.hasBody)
          editorNode = $app.elems.getNode($getters.elem, 'body-editor')
        else
          return

        this.name = editorNode.innerText.split('\n')[0]
        this.$refs.name.focus()
      })
    }

  },

}
</script>

<style>

</style>