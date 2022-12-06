<script setup lang="ts">
import { computed, defineComponent, useAttrs } from 'vue'

withDefaults(defineProps<{ as?: string }>(), { as: 'div' })

const attrs = useAttrs()

const excludedAttrs = computed(() => {
  const { ['class']: c, ...excluded } = attrs
  return excluded
})
</script>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
})
</script>

<template>
  <li class="SettingsListItem" :class="$attrs.class">
    <component :is="as" v-bind="excludedAttrs" class="block">
      <slot />
      <div v-if="$slots.subtext" class="SettingsListItem__subtext">
        <slot name="subtext"></slot>
      </div>
    </component>
  </li>
</template>
<style lang="postcss" scoped>
.SettingsListItem > :deep(*) {
  @apply px-6 py-4 text-base;
}

.SettingsListItem__subtext {
  @apply text-gray-600 text-sm;
}
</style>
