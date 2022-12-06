<script setup lang="ts">
import SettingsListItem from './SettingsListItem.vue'
import TextInputDialog from '../TextInputDialog.vue'
import { computed, ref } from 'vue'

const props = defineProps<{ prefix: string }>()

const emit = defineEmits<{
  (event: 'update:prefix', value: string): void
}>()

const isDialogOpenRef = ref(false)

const prefixRef = computed({
  get: () => props.prefix,
  set: (value) => emit('update:prefix', value),
})

const onClick = () => {
  isDialogOpenRef.value = true
}
</script>

<template>
  <SettingsListItem as="a" href="#" @click.prevent="onClick">
    <p>Status Prefix</p>
    <template #subtext>{{ prefix }}</template>
    <TextInputDialog
      v-model:show="isDialogOpenRef"
      v-model:text="prefixRef"
      title="Edit Status Prefix"
      label="Prefix"
      placeholder="ex. Watching"
    />
  </SettingsListItem>
</template>
