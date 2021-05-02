<template>
  <v-app-bar color="light-green" dark fixed app>
    <v-icon>settings</v-icon>
    <v-toolbar-title>
      {{ title }}
    </v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>
