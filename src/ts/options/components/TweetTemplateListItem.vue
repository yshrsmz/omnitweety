<template>
  <v-list-item @click.stop="onPrefixClick">
    <v-list-item-content>
      <v-list-item-title>Status Prefix</v-list-item-title>
      <v-list-item-subtitle>{{ tweetTemplate.prefix }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-dialog v-model="isPrefixDialogActive" max-width="500px">
      <v-card>
        <v-card-title class="text-h6"> Edit Status Prefix </v-card-title>
        <v-card-text>
          <v-text-field v-model="prefix" label="Enter New Prefix" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click.stop="isPrefixDialogActive = false"
          >
            Close
          </v-btn>
          <v-btn color="primary" text @click.stop="onUpdatePrefixRequested">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  SetupContext,
} from '@vue/composition-api'
import TweetTemplate from '../../data/TweetTemplate'
import { useStore } from '../store/utils'

export default defineComponent({
  name: 'TweetTemplateListItem',
  setup(_props, _ctx: SetupContext) {
    const store = useStore()

    const isPrefixDialogActive = ref<boolean>(false)
    const prefix = ref<string>('')

    const tweetTemplate = computed<TweetTemplate>(
      () => store.getters.tweetTemplate
    )

    const updateTweetTemplate = (template: TweetTemplate) => {
      store.dispatch('updateTweetTemplate', template)
    }
    const onPrefixClick = (): void => {
      prefix.value = tweetTemplate.value.prefix
      isPrefixDialogActive.value = true
    }
    const onUpdatePrefixRequested = (): void => {
      const newTemplate = new TweetTemplate(prefix.value)
      updateTweetTemplate(newTemplate)
      isPrefixDialogActive.value = false
    }

    onMounted(() => {
      prefix.value = tweetTemplate.value.prefix
    })

    return {
      isPrefixDialogActive,
      prefix,
      tweetTemplate,
      onPrefixClick,
      onUpdatePrefixRequested,
    }
  },
})
</script>
