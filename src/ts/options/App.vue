<template>
  <v-app>
    <app-header :title="title" />
    <v-main>
      <v-container>
        <v-layout row justify-center align-center>
          <v-flex xs12 sm12 md8>
            <setting-list class="my-8" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import AppHeader from './components/AppHeader.vue'
import SettingList from './components/SettingList.vue'
import { AppConfig } from '../Config'
import { defineComponent, ref, SetupContext } from '@vue/composition-api'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    SettingList,
  },
  setup(_props, _ctx: SetupContext) {
    const title = ref<string>(AppConfig.NAME)
    return {
      title,
    }
  },
})
</script>
