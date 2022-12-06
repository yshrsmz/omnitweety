<script setup lang="ts">
import { computed } from 'vue'
import AccessToken from '../data/AccessToken'
import AmazonAssociate from '../data/AmazonAssociate'
import TweetTemplate from '../data/TweetTemplate'
import { AppConfig } from '../Config'
import SettingsListHeading from './SettingsList/SettingsListHeading.vue'
import SettingsListItem from './SettingsList/SettingsListItem.vue'
import AmazonAssociateDomainItem from './SettingsList/AmazonAssociateDomainItem.vue'
import AmazonAssociateIdItem from './SettingsList/AmazonAssociateIdItem.vue'
import StatusPrefixItem from './SettingsList/StatusPrefixItem.vue'
import TwitterAuthItem from './SettingsList/TwitterAuthItem.vue'

const props = defineProps<{
  accessToken: AccessToken
  tweetTemplate: TweetTemplate
  amazonAssociate: AmazonAssociate
  amazonDomains: string[]
  appVersion: string
}>()

const emit = defineEmits<{
  (event: 'update:accessToken', value: AccessToken): void
  (event: 'update:tweetTemplate', value: TweetTemplate): void
  (event: 'update:amazonAssociate', value: AmazonAssociate): void
  (event: 'login:start'): void
  (event: 'login:cancel'): void
  (event: 'logout'): void
  (event: 'update:pincode', value: string): void
}>()

const isAuthorized = computed(() => props.accessToken.isAuthorized())

const {
  URL_DEVELOPER: developerUrl,
  DEVELOPER_NAME: developerName,
  URL_CHROME_WEBSTORE: chromeWebstoreUrl,
} = AppConfig

const onLogin = () => {
  emit('login:start')
}
const onLoginCancel = () => {
  emit('login:cancel')
}
const onTwitterPinCodeUpdate = (value: string) => {
  emit('update:pincode', value)
}
const onLogout = () => {
  emit('logout')
}

const onStatusPrefixUpdate = (value: string) => {
  const newTemplate = new TweetTemplate(value)
  emit('update:tweetTemplate', newTemplate)
}

const onAmazonAssociateDomainUpdate = (value: string) => {
  const newAssociate = new AmazonAssociate(
    value,
    props.amazonAssociate.associateId
  )
  emit('update:amazonAssociate', newAssociate)
}

const onAmazonAssociateIdUpdate = (value: string) => {
  const newAssociate = new AmazonAssociate(props.amazonAssociate.domain, value)
  emit('update:amazonAssociate', newAssociate)
}
</script>

<template>
  <div class="SettingsList overflow-hidden rounded-md bg-white shadow">
    <ul role="list" class="divide-y divide-gray-200">
      <SettingsListHeading title="Auth" />
      <TwitterAuthItem
        class="!border-t-0"
        :is-authorized="isAuthorized"
        @update:pincode="onTwitterPinCodeUpdate"
        @login:start="onLogin"
        @login:cancel="onLoginCancel"
        @logout="onLogout"
      />
      <SettingsListHeading title="General" />
      <StatusPrefixItem
        class="!border-t-0"
        :prefix="tweetTemplate.prefix"
        @update:prefix="onStatusPrefixUpdate"
      />
      <SettingsListHeading title="Amazon Associate" />
      <AmazonAssociateDomainItem
        class="!border-t-0"
        :amazon-domains="amazonDomains"
        :current-domain="amazonAssociate.domain"
        @update:current-domain="onAmazonAssociateDomainUpdate"
      />
      <AmazonAssociateIdItem
        :associate-id="amazonAssociate.associateId"
        @update:associate-id="onAmazonAssociateIdUpdate"
      />
      <SettingsListHeading title="Others" />
      <SettingsListItem class="!border-t-0">
        <p>App Version</p>
        <template #subtext>{{ appVersion }}</template>
      </SettingsListItem>
      <SettingsListItem as="a" :href="developerUrl" target="_blank">
        <p>Developer</p>
        <template #subtext>{{ developerName }}</template>
      </SettingsListItem>
      <SettingsListItem as="a" :href="chromeWebstoreUrl" target="_blank">
        <p>Rate on Chrome Webstore</p>
      </SettingsListItem>
    </ul>
  </div>
</template>
