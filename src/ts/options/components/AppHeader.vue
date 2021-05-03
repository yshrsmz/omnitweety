<template>
  <v-app-bar color="light-green" dark fixed app>
    <v-icon>settings</v-icon>
    <v-toolbar-title>
      {{ title }}
    </v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'AppHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>
