<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title
        >Auth Status:
        {{ isAuthorized ? 'Authorized' : 'Not Authorized' }}</v-list-item-title
      >
    </v-list-item-content>
    <v-list-item-action>
      <!-- Auth Dialog -->
      <v-dialog
        v-if="!isAuthorized"
        v-model="isPinCodeDialogActive"
        persistent
        max-width="500px"
      >
        <template #activator="{ on }">
          <v-btn
            color="blue lighten-1 white--text"
            v-on="on"
            @click.stop="beginAuthFlow"
          >
            Login with Twitter
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h6"> Enter Pin Code </v-card-title>
          <v-card-text>
            <v-text-field
              id="authPinCode"
              name="authPinCodeInput"
              label="Enter Pin Code(Number only)"
              type="number"
              required
              @input="updatePinCode"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click.stop="isPinCodeDialogActive = false"
            >
              Close
            </v-btn>
            <v-btn
              :disabled="!isValidPinCode"
              color="primary"
              text
              @click.stop="onPinCodeEntered"
            >
              Authorize
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Logout Dialog -->
      <v-dialog v-else v-model="isLogoutDialogActive" max-width="500px">
        <template #activator="{ on }">
          <v-btn color="red lighten-1 white--text" v-on="on">
            Logout from Twitter
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h6"> Confirm </v-card-title>
          <v-card-text class="text-body-1">
            Are you sure to Logout?
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click.stop="isLogoutDialogActive = false"
            >
              Close
            </v-btn>
            <v-btn color="primary" text @click.stop="onLogoutRequested">
              Logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import AccessToken from '../../data/AccessToken'
import authFlow from '../../oauth/AuthFlow'
import { Getter, Action } from 'vuex-class'
import { openNewTab } from '../../Util'

@Component({
  name: 'auth-list-item',
})
export default class AuthListItem extends Vue {
  isPinCodeDialogActive = false
  isLogoutDialogActive = false

  pinCode = ''

  @Getter('isAuthorized') isAuthorized

  @Action('updateAccessToken') updateAccessToken

  @Action('clearAccessToken') clearAccessToken

  get isValidPinCode(): boolean {
    return !!this.pinCode && this.pinCode.length == 7
  }

  beginAuthFlow(): void {
    this.isPinCodeDialogActive = true
    authFlow.request().then((url) => {
      this.isPinCodeDialogActive = true
      openNewTab(url, true)
    })
  }

  updatePinCode(value: string): void {
    this.pinCode = value
  }

  onPinCodeEntered(): void {
    authFlow.accept(this.pinCode).then((token: AccessToken) => {
      this.updateAccessToken(token)
      this.isPinCodeDialogActive = false
    })
  }

  onLogoutRequested(): void {
    this.clearAccessToken()
    this.isLogoutDialogActive = false
  }
}
</script>
