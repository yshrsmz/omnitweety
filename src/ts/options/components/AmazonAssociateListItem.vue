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
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import AmazonAssociate from '../../data/AmazonAssociate'

@Component({
  name: 'amazon-associate-list-item',
})
export default class AmazonAssociateListItem extends Vue {
  @Getter('amazonDomains') amazonDomains: string[]

  @Getter('amazonAssociate') amazonAssociate: AmazonAssociate

  @Action('updateAmazonAssociate') updateAmazonAssociate

  isAssociateIdDialogActive = false

  currentDomain = ''
  associateId = ''

  get associateIdOrEmpty(): string {
    if (this.amazonAssociate.associateId === '') {
      return '-'
    } else {
      return this.amazonAssociate.associateId
    }
  }

  mounted(): void {
    this.currentDomain = this.amazonAssociate.domain
    this.associateId = this.amazonAssociate.associateId
  }

  onDomainChanged(_value: string): void {
    this.doUpdateAmazonAssociate()
  }

  onAssociateIdClick(): void {
    this.associateId = this.amazonAssociate.associateId
    this.isAssociateIdDialogActive = true
  }

  onUpdateAssociateIdRequested(): void {
    this.doUpdateAmazonAssociate()
    this.isAssociateIdDialogActive = false
  }

  doUpdateAmazonAssociate(): void {
    const newAmazonAssociate = new AmazonAssociate(
      this.currentDomain || '',
      this.associateId || ''
    )
    this.updateAmazonAssociate(newAmazonAssociate)
  }
}
</script>
