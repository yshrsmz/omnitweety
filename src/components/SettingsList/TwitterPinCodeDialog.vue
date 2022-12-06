<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import { computed, ref } from 'vue'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (event: 'update:show', value: boolean): void
  (event: 'update:pincode', value: string): void
  (event: 'login:cancel'): void
}>()

const pinCodeRef = ref('')

const isValidPinCode = computed(() => {
  return pinCodeRef.value.length === 7 && /^[0-9]{7}$/.test(pinCodeRef.value)
})

const onAuthorizeClick = async () => {
  if (isValidPinCode.value) {
    emit('update:pincode', pinCodeRef.value)
    emit('update:show', false)
  }
}

const onLoginCloseClick = () => {
  emit('login:cancel')
  emit('update:show', false)
}
</script>

<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" :static="true" class="TwitterPinCodeDialog relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Enter Pin code
              </DialogTitle>
              <div class="mt-2">
                <div class="relative mt-1 rounded-md shadow-sm">
                  <input
                    id="text"
                    v-model="pinCodeRef"
                    type="text"
                    name="text"
                    class="TwitterPinCodeDialog__input"
                    :class="{
                      'TwitterPinCodeDialog__input--error': !isValidPinCode,
                    }"
                    placeholder="7-digit number"
                  />
                  <div
                    v-if="!isValidPinCode"
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <ExclamationCircleIcon
                      class="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <p
                  v-if="!isValidPinCode"
                  id="pincode-error"
                  class="mt-2 text-sm text-red-600"
                >
                  Your Pincode must be 7-digit numbers
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
                  @click="onLoginCloseClick"
                >
                  CLOSE
                </button>
                <button
                  type="button"
                  class="TwitterPinCodeDialog__AuthButton"
                  :class="{
                    'TwitterPinCodeDialog__AuthButton--disabled':
                      !isValidPinCode,
                  }"
                  :disabled="!isValidPinCode"
                  @click="onAuthorizeClick"
                >
                  AUTHORIZE
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="postcss" scoped>
.TwitterPinCodeDialog__input {
  @apply block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
}

.TwitterPinCodeDialog__input.TwitterPinCodeDialog__input--error {
  @apply border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500;
}

.TwitterPinCodeDialog__AuthButton {
  @apply inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2;
}
.TwitterPinCodeDialog__AuthButton.TwitterPinCodeDialog__AuthButton--disabled {
  @apply bg-blue-50 text-blue-200;
}
</style>
