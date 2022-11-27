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
import { computed, defineComponent, ref } from '@vue/composition-api'
import authFlow from '../../oauth/AuthFlow'
import { openNewTab } from '../../Util'
import { useStore } from '../store/utils'

export default defineComponent({
  name: 'AuthListItem',
  setup(_props, _ctx) {
    const store = useStore()

    const isPinCodeDialogActive = ref<boolean>(false)
    const isLogoutDialogActive = ref<boolean>(false)
    const pinCode = ref<string>('')

    const isAuthorized = computed<boolean>(() => store.getters.isAuthorized)
    const isValidPinCode = computed<boolean>(
      () => !!pinCode.value && pinCode.value.length === 7
    )

    const beginAuthFlow = async (): Promise<void> => {
      const url = await authFlow.request()

      isPinCodeDialogActive.value = true
      openNewTab(url, true)
    }

    const updatePinCode = (value: string): void => {
      pinCode.value = value
    }

    const onPinCodeEntered = async (): Promise<void> => {
      const token = await authFlow.accept(pinCode.value)

      await store.dispatch('updateAccessToken', token)
      isPinCodeDialogActive.value = false
    }

    const onLogoutRequested = async (): Promise<void> => {
      await store.dispatch('clearAccessToken')
      isLogoutDialogActive.value = false
    }

    return {
      // data ---
      isPinCodeDialogActive,
      isLogoutDialogActive,
      pinCode,
      // computed ---
      isAuthorized,
      isValidPinCode,
      // methods ---
      beginAuthFlow,
      updatePinCode,
      onPinCodeEntered,
      onLogoutRequested,
    }
  },
})
</script>
