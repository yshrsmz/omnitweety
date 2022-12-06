<script setup lang="ts">
import SettingsListItem from './SettingsListItem.vue'
import TextInputDialog from '../TextInputDialog.vue'
import { computed, ref } from 'vue'

const props = defineProps<{ associateId: string }>()

const emit = defineEmits<{
  (event: 'update:associateId', value: string): void
}>()

const isDialogOpenRef = ref(false)
const associateIdRef = computed({
  get: () => props.associateId,
  set: (value) => emit('update:associateId', value),
})

const onClick = () => {
  isDialogOpenRef.value = true
}
</script>

<template>
  <SettingsListItem
    class="AmazonAssociateIdItem"
    as="a"
    href="#"
    @click.prevent="onClick"
  >
    <p>Amazon Associate ID</p>
    <template #subtext>{{ associateId }}</template>
    <TextInputDialog
      v-model:show="isDialogOpenRef"
      v-model:text="associateIdRef"
      title="Edit Amazon Associate ID"
      label="Associate ID"
      placeholder="ex. xxxxxxxx-22"
    />
  </SettingsListItem>
</template>
