<template>
  <v-list-item @click.stop="onPrefixClick">
    <v-list-item-content>
      <v-list-item-title>Status Prefix</v-list-item-title>
      <v-list-item-subtitle>{{ tweetTemplate.prefix }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-dialog v-model="isPrefixDialogActive" max-width="500px">
      <v-card>
        <v-card-title class="title">
          Edit Status Prefix
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="prefix" label="Enter New Prefix" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click.stop="isPrefixDialogActive = false"
          >
            Close
          </v-btn>
          <v-btn color="primary" text @click.stop="onUpdatePrefixRequested">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import TweetTemplate from '../../data/TweetTemplate'
import { Getter, Action } from 'vuex-class'

@Component({
  name: 'tweet-template-list-item',
})
export default class TweetTemplateListItem extends Vue {
  isPrefixDialogActive = false

  prefix = ''

  @Getter('tweetTemplate') tweetTemplate: TweetTemplate

  @Action('updateTweetTemplate') updateTweetTemplate

  mounted(): void {
    this.prefix = this.tweetTemplate.prefix
  }

  onPrefixClick(): void {
    this.prefix = this.tweetTemplate.prefix
    this.isPrefixDialogActive = true
  }

  onUpdatePrefixRequested(): void {
    const newTemplate = new TweetTemplate(this.prefix)
    this.updateTweetTemplate(newTemplate)
    this.isPrefixDialogActive = false
  }
}
</script>
