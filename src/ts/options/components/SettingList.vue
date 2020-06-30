<template>
  <v-card>
    <v-list two-line>
      <v-subheader>Auth</v-subheader>
      <auth-list-item />
      <v-divider />
      <v-subheader>General</v-subheader>
      <tweet-template-list-item />
      <v-divider />
      <v-subheader>Amazon Associate</v-subheader>
      <amazon-associate-list-item />
      <v-divider />
      <v-subheader>Others</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>App Version</v-list-item-title>
          <v-list-item-subtitle>{{ appVersion }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :href="developerUrl" target="_blank">
        <v-list-item-content>
          <v-list-item-title>Developer</v-list-item-title>
          <v-list-item-subtitle>{{ developerName }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :href="webstoreUrl" target="_blank">
        <v-list-item-content>
          <v-list-item-title>Rate on Chrome Webstore</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Component } from 'vue-property-decorator'
import AuthListItem from './AuthListItem'
import TweetTemplateListItem from './TweetTemplateListItem'
import AmazonAssociateListItem from './AmazonAssociateListItem'
import { AppConfig } from '../../Config'

@Component({
  name: 'setting-list',
  computed: {
    ...mapGetters(['tweetTemplate']),
  },
  components: {
    AuthListItem,
    TweetTemplateListItem,
    AmazonAssociateListItem,
  },
})
export default class SettingList extends Vue {
  isPrefixDialogActive = false

  developerName: string = AppConfig.DEVELOPER_NAME
  developerUrl: string = AppConfig.URL_DEVELOPER

  webstoreUrl: string = AppConfig.URL_CHROME_WEBSTORE

  appVersion: string = chrome.runtime.getManifest().version
}
</script>
