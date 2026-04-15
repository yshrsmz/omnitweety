<script lang="ts" setup>
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import SettingsListItem from './SettingsListItem.vue'

const props = defineProps<{
  isLoggingActive: boolean
}>()

const emit = defineEmits<{
  (event: 'update:isLoggingActive', value: boolean): void
}>()

// click event should be handled by SettingListItem
const onItemClick = () => {
  emit('update:isLoggingActive', !props.isLoggingActive)
}
</script>

<template>
  <SettingsListItem
    as="a"
    href="#"
    class="LoggingStateItem"
    @click.prevent="onItemClick"
  >
    <SwitchGroup as="div" class="flex flex-row justify-between items-center">
      <SwitchLabel class="mr-4 cursor-pointer" passive
        >Debug Logging:
        {{ isLoggingActive ? 'Active' : 'Inactive' }}</SwitchLabel
      >
      <Switch
        value="isLoggingActive"
        class="LoggingStateItem__Switch relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        :class="{
          'LoggingStateItem__Switch--enabled bg-teal-900': isLoggingActive,
          'LoggingStateItem__Switch--disabled bg-teal-700': !isLoggingActive,
        }"
      >
        <span
          aria-hidden="true"
          :class="isLoggingActive ? 'translate-x-9' : 'translate-x-0'"
          class="LoggingStateItem__SwitchIcon pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        />
      </Switch>
    </SwitchGroup>
  </SettingsListItem>
</template>
