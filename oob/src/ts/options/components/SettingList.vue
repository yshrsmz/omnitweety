<template>
  <v-card>
    <v-list two-line>
      <v-subheader>Auth</v-subheader>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Auth Status: {{ isAuthorized ? "Authorized" : "Not Authorized" }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-btn v-if="!isAuthorized" color="blue lighten-1 white--text" @click="beginAuthFlow">Login with Twitter</v-btn>
            <v-btn v-else color="red lighten-1 white--text" @click="logout">Logout from Twitter</v-btn>
        </v-list-tile-action>
        <!-- Auth Dialog -->
        <v-dialog
            v-model="isPinCodeDialogActive"
            max-width="500px">
            <v-card>
                <v-card-title>Enter Pin Code</v-card-title>
                <v-card-text>
                    <v-text-field
                        id="authPinCode"
                        name="authPinCodeInput"
                        label="Enter Pin Code"
                        required></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary" flat @click.stop="isPinCodeDialogActive=false">Close</v-btn>
                    <v-btn color="primary" flat @click.stop="onPinCodeEntered">Authorize</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      </v-list-tile>
      <v-divider/>
      <v-subheader>General</v-subheader>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Status Prefix</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
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
import accessTokenRepository from '../../data/AccessTokenRepository';
import AccessToken from '../../data/AccessToken';
import authFlow from '../../oauth/AuthFlow';

@Component({
    name: 'setting-list',
    computed: {
        ...mapState(['accessToken']),
        ...mapGetters(['isAuthorized'])
        }
})
export default class SettingList extends Vue {

    accessToken: AccessToken;

    isPinCodeDialogActive: boolean = false;

    mounted() {
    }

    beginAuthFlow(){
        console.log("beginAuthFlow");
        authFlow.request()
            .then(((url) => {
                console.log(`authUrl: ${url}`);
                this.isPinCodeDialogActive = true;
                chrome.tabs.create({ url: 'https://twitter.com', active: false });
            }));
    }

    onPinCodeEntered() {

    }

    logout(){
        console.log("logout");
    }

}
</script>
