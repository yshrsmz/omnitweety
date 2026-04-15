<script setup lang="ts">
import SettingsListItem from './SettingsListItem.vue'

defineProps<{ title: string }>()
</script>

<template>
  <SettingsListItem class="SettingsListHeading"
    ><p class="pb-2 text-gray-400 font-semibold">{{ title }}</p></SettingsListItem
  >
</template>
