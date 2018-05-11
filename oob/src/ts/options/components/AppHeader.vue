<template>
  <v-toolbar
    color="light-green"
    dark
    fixed
    app>
    <v-icon>settings</v-icon>
    <v-toolbar-title>
      {{ title }}
    </v-toolbar-title>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'app-header'
})
export default class AppHeader extends Vue {

    @Prop() title: string;
}
</script>

