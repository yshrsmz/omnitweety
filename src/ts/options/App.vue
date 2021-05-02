<template>
  <v-app>
    <app-header :title="title" />
    <v-main>
      <v-container>
        <v-layout row justify-center align-center>
          <v-flex xs12 sm12 md8>
            <setting-list />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from './components/AppHeader.vue'
import SettingList from './components/SettingList.vue'
import { AppConfig } from '../Config'

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    SettingList,
  },
  data() {
    return {
      title: AppConfig.NAME,
    }
  },
})
</script>
