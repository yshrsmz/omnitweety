<template>
    <v-list-tile>
        <v-list-tile-content>
            <v-list-tile-title>Auth Status: {{ isAuthorized ? "Authorized" : "Not Authorized" }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <!-- Auth Dialog -->
            <v-dialog
                v-if="!isAuthorized"
                v-model="isPinCodeDialogActive"
                persistent
                max-width="500px">
                <v-btn
                    slot="activator"
                    color="blue lighten-1 white--text"
                    @click.stop="beginAuthFlow">Login with Twitter</v-btn>
                <v-card>
                    <v-card-title class="title">Enter Pin Code</v-card-title>
                    <v-card-text>
                        <v-text-field
                            id="authPinCode"
                            name="authPinCodeInput"
                            label="Enter Pin Code(Number only)"
                            type="number"
                            required
                            @input="updatePinCode"/>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        color="primary"
                        flat
                        @click.stop="isPinCodeDialogActive=false">Close</v-btn>
                    <v-btn
                        :disabled="!isValidPinCode"
                        color="primary"
                        flat
                        @click.stop="onPinCodeEntered">Authorize</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Logout Dialog -->
            <v-dialog
                v-else
                v-model="isLogoutDialogActive"
                max-width="500px">
                <v-btn
                    slot="activator"
                    color="red lighten-1 white--text">Logout from Twitter</v-btn>
                <v-card>
                    <v-card-title class="title">Confirm</v-card-title>
                    <v-card-text class="body-1">Are you sure to Logout?</v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            color="primary"
                            flat
                            @click.stop="isLogoutDialogActive=false">Close</v-btn>
                        <v-btn
                            color="primary"
                            flat
                            @click.stop="onLogoutRequested">Logout</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-list-tile-action>
  </v-list-tile>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { Component, Prop } from 'vue-property-decorator';
import accessTokenRepository from '../../data/AccessTokenRepository';
import AccessToken from '../../data/AccessToken';
import authFlow from '../../oauth/AuthFlow';
import {Getter, Action} from 'vuex-class';

@Component({
    name: 'auth-list-item'
})
export default class AuthListItem extends Vue {

    isPinCodeDialogActive: boolean = false;
    isLogoutDialogActive: boolean = false;

    pinCode: string = '';

    @Getter('isAuthorized') isAuthorized;

    @Action('updateAccessToken') updateAccessToken;

    @Action('clearAccessToken') clearAccessToken;

    get isValidPinCode():boolean {
        return !!this.pinCode && this.pinCode.length == 7;
    }

    beginAuthFlow(){
        this.isPinCodeDialogActive = true;
        authFlow.request()
            .then(((url) => {
                this.isPinCodeDialogActive = true;
                chrome.tabs.create({ url: url, active: false });
            }));
    }

    updatePinCode(value: string) {
        this.pinCode = value;
    }

    onPinCodeEntered() {
        authFlow.accept(this.pinCode)
            .then((token: AccessToken) => {
                this.updateAccessToken(token);
                this.isPinCodeDialogActive = false;
            });
    }

    onLogoutRequested() {
        this.clearAccessToken();
        this.isLogoutDialogActive = false;
    }
}
</script>
