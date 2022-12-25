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
        class="LoggingStateItem__Switch"
        :class="{
          'LoggingStateItem__Switch--enabled': isLoggingActive,
          'LoggingStateItem__Switch--disabled': !isLoggingActive,
        }"
      >
        <span
          aria-hidden="true"
          :class="isLoggingActive ? 'translate-x-9' : 'translate-x-0'"
          class="LoggingStateItem__SwitchIcon"
        />
      </Switch>
    </SwitchGroup>
  </SettingsListItem>
</template>

<style lang="postcss">
.LoggingStateItem__Switch {
  @apply relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75;
}

.LoggingStateItem__Switch--enabled {
  @apply bg-teal-900;
}
.LoggingStateItem__Switch--disabled {
  @apply bg-teal-700;
}

.LoggingStateItem__SwitchIcon {
  @apply pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out;
}
</style>
