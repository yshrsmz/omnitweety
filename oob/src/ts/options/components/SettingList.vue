<template>
  <v-card>
    <v-list two-line>
      <v-subheader>Auth</v-subheader>
      <auth-list-item/>
      <v-divider/>
      <v-subheader>General</v-subheader>
      <tweet-template-list-item/>
      <v-divider/>
      <v-subheader>Others</v-subheader>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>App Version</v-list-tile-title>
          <v-list-tile-sub-title>hoge</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Developer</v-list-tile-title>
          <v-list-tile-sub-title>hoge</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Rate on Chrome Webstore</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';
import { Component, Prop } from 'vue-property-decorator';
import AuthListItem from './AuthListItem';
import TweetTemplateListItem from './TweetTemplateListItem';

@Component({
    name: 'setting-list',
    computed: {
        ...mapGetters(['tweetTemplate'])
        },
        components: {
            AuthListItem,
            TweetTemplateListItem
        }
})
export default class SettingList extends Vue {

    isPrefixDialogActive: boolean = false;

    mounted() {
    }
}
</script>
