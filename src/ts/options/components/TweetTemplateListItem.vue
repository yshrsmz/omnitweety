<template>
  <v-list-tile
    @click.stop="onPrefixClick">
    <v-list-tile-content>
      <v-list-tile-title>Status Prefix</v-list-tile-title>
      <v-list-tile-sub-title>{{ tweetTemplate.prefix }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-dialog
      v-model="isPrefixDialogActive"
      max-width="500px">
      <v-card>
        <v-card-title class="title">Edit Status Prefix</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="prefix"
            label="Enter New Prefix"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            flat
            @click.stop="isPrefixDialogActive=false">Close</v-btn>
          <v-btn
            color="primary"
            flat
            @click.stop="onUpdatePrefixRequested">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

    isPrefixDialogActive: boolean = false;

    prefix: string = '';

    @Getter('tweetTemplate') tweetTemplate: TweetTemplate

    @Action('updateTweetTemplate') updateTweetTemplate;

    mounted() {
        this.prefix = this.tweetTemplate.prefix;
    }

    onPrefixClick() {
        this.prefix = this.tweetTemplate.prefix;
        this.isPrefixDialogActive = true;
    }

    onUpdatePrefixRequested() {
        const newTemplate = new TweetTemplate(this.prefix);
        this.updateTweetTemplate(newTemplate);
        this.isPrefixDialogActive = false;
    }
}
</script>
