<script setup lang="ts">
import SettingsListItem from './SettingsListItem.vue'

defineProps<{ title: string }>()
</script>

<template>
  <SettingsListItem class="SettingsListHeading"
    ><p>{{ title }}</p></SettingsListItem
  >
</template>

<style lang="postcss" scoped>
.SettingsListItem.SettingsListHeading > :deep(*) {
  @apply pb-2 text-gray-400 font-semibold;
}
</style>
