<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import SettingsListItem from './SettingsListItem.vue'
import TwitterPinCodeDialog from './TwitterPinCodeDialog.vue'
import TwitterLogoutDialog from './TwitterLogoutDialog.vue'

const props = defineProps<{ isAuthorized: boolean }>()

const { isAuthorized } = toRefs(props)

const emit = defineEmits<{
  (event: 'update:pincode', value: string): void
  (event: 'login:start'): void
  (event: 'login:cancel'): void
  (event: 'logout'): void
}>()

const isDialogOpenRef = ref(false)
const isLogoutDialogOpenRef = ref(false)

watch(isAuthorized, (newValue) => {
  if (newValue) {
    isDialogOpenRef.value = false
  }
})

const onLoginClick = async () => {
  isDialogOpenRef.value = true
  emit('login:start')
}

const onTwitterPinCodeUpdate = (value: string) => {
  emit('update:pincode', value)
}

const onLoginCancel = () => {
  emit('login:cancel')
}

const onLogoutClick = () => {
  isLogoutDialogOpenRef.value = true
}
const onLogout = () => {
  emit('logout')
}
</script>

<template>
  <SettingsListItem>
    <div class="flex flex-row justify-between items-center">
      <p>Auth Status: {{ isAuthorized ? 'Authorized' : 'Not Authorized' }}</p>
      <button v-if="!isAuthorized" class="AuthButton" @click="onLoginClick">
        Login with Twitter
      </button>
      <button
        v-else
        class="AuthButton AuthButton--authorized"
        @click="onLogoutClick"
      >
        Logout from Twitter
      </button>
    </div>
    <TwitterPinCodeDialog
      v-model:show="isDialogOpenRef"
      @update:pincode="onTwitterPinCodeUpdate"
      @login:cancel="onLoginCancel"
    />
    <TwitterLogoutDialog
      v-model:show="isLogoutDialogOpenRef"
      @logout="onLogout"
    />
  </SettingsListItem>
</template>

<style lang="postcss" scoped>
.AuthButton {
  @apply inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
}

.AuthButton.AuthButton--authorized {
  @apply bg-red-600 hover:bg-red-700 focus:ring-red-500;
}
</style>
