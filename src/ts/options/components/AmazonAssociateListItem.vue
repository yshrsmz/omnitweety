<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-select
          v-model="currentDomain"
          :items="amazonDomains"
          label="Your Amazon Domain"
          clearable
          value="currentDomain"
          @input="onDomainChanged"
        />
      </v-list-item-content>
    </v-list-item>
    <v-list-item @click.stop="onAssociateIdClick">
      <v-list-item-content>
        <v-list-item-title>Amazon Associate ID</v-list-item-title>
        <v-list-item-subtitle>{{ associateIdOrEmpty }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-dialog v-model="isAssociateIdDialogActive" max-width="500px">
      <v-card>
        <v-card-title>Edit Associate ID</v-card-title>
        <v-card-text>
          <v-text-field v-model="associateId" label="Enter New Associate ID" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click.stop="isAssociateIdDialogActive = false"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            text
            @click.stop="onUpdateAssociateIdRequested"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from '@vue/composition-api'
import AmazonAssociate from '../../data/AmazonAssociate'
import { useStore } from '../store/utils'

export default defineComponent({
  name: 'AmazonAssociateListItem',
  setup(_props, _ctx) {
    const store = useStore()

    const isAssociateIdDialogActive = ref<boolean>(false)
    const currentDomain = ref<string>('')
    const associateId = ref<string>('')

    const amazonDomains = computed<string[]>(() => store.getters.amazonDomains)
    const amazonAssociate = computed<AmazonAssociate>(
      () => store.getters.amazonAssociate
    )
    const associateIdOrEmpty = computed<string>(() => {
      const id = amazonAssociate.value.associateId
      return id === '' ? '-' : id
    })

    const doUpdateAmazonAssociate = (): void => {
      const newValue = new AmazonAssociate(
        currentDomain.value || '',
        associateId.value || ''
      )
      store.dispatch('updateAmazonAssociate', newValue)
    }

    const onDomainChanged = (_value: string): void => {
      doUpdateAmazonAssociate()
    }

    const onAssociateIdClick = (): void => {
      associateId.value = amazonAssociate.value.associateId
      isAssociateIdDialogActive.value = true
    }

    const onUpdateAssociateIdRequested = (): void => {
      doUpdateAmazonAssociate()
      isAssociateIdDialogActive.value = false
    }

    onMounted(() => {
      currentDomain.value = amazonAssociate.value.domain
      associateId.value = amazonAssociate.value.associateId
    })

    return {
      isAssociateIdDialogActive,
      currentDomain,
      associateId,
      amazonDomains,
      amazonAssociate,
      associateIdOrEmpty,
      // methods ---
      onDomainChanged,
      onAssociateIdClick,
      onUpdateAssociateIdRequested,
    }
  },
})
</script>
