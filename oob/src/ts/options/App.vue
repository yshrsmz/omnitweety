<template>
  <v-app>
      <app-header :title="'omnitweety'"/>
      <v-content>
          <v-container>Hello World</v-container>
      </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import AppHeader from './components/AppHeader';

@Component({
    name: 'app',
    components: {
        AppHeader
    }
})
export default class App extends Vue {

}
</script>
