<template>
  <div>
    <v-list-item>
      <v-select :items="amazonDomains" label="Your Amazon Domain" clearable @input="onDomainChanged" :v-model="currentDomain"/>
    </v-list-item>
    <v-list-item />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component({
  name: "amazon-associate-list-item"
})
export default class AmazonAssociateListItem extends Vue {

  @Getter('amazonDomains') amazonDomains: string[]

  currentDomain: string = ''

  onDomainChanged(value: string) {
    console.log('domainChanged:', value)
  }
}
</script>
