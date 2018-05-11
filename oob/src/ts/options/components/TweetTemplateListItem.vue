<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>Status Prefix</v-list-tile-title>
      <v-list-tile-sub-title>{{ tweetTemplate.prefix }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import TweetTemplate from '../../data/TweetTemplate';
import {Getter, Action} from 'vuex-class';

@Component({
    name: 'tweet-template-list-item'
})
export default class TweetTemplateListItem extends Vue {

    @Getter('tweetTemplate') tweetTemplate: TweetTemplate
}
</script>
