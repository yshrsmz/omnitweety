<script setup lang="ts">
import SettingsListItem from './SettingsListItem.vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'

const DEFAULT_VALUE = 'Select your Amazon domain'

const props = defineProps<{
  currentDomain: string
  amazonDomains: string[]
}>()

const emit = defineEmits<{
  (event: 'update:currentDomain', value: string): void
}>()

const currentDomain = computed({
  get: () => props.currentDomain || DEFAULT_VALUE,
  set: (value: string) => {
    if (value === DEFAULT_VALUE) {
      emit('update:currentDomain', '')
    } else {
      emit('update:currentDomain', value)
    }
  },
})

const domains = computed(() => {
  return [DEFAULT_VALUE, ...props.amazonDomains]
})
</script>

<template>
  <SettingsListItem>
    <p>Amazon Domain</p>
    <template #subtext>
      <Listbox v-model="currentDomain" class="w-72">
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span class="block truncate">{{ currentDomain }}</span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-for="domain in domains"
                v-slot="{ active, selected }"
                :key="domain"
                :value="domain"
                as="template"
              >
                <li
                  :class="[
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]"
                    >{{ domain }}</span
                  >
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </template>
  </SettingsListItem>
</template>
