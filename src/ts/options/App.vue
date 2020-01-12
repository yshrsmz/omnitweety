<template>
  <v-app>
    <app-header :title="title" />
    <v-content>
      <v-container>
        <v-layout
          row
          justify-center
          align-center
        >
          <v-flex
            xs12
            sm12
            md8
          >
            <setting-list />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component} from 'vue-property-decorator';
import AppHeader from './components/AppHeader';
import SettingList from './components/SettingList';
import { AppConfig } from '../Config';

@Component({
  name: "app",
  components: {
    AppHeader,
    SettingList
  }
})
export default class App extends Vue {
  title: string = AppConfig.NAME;
}
</script>
