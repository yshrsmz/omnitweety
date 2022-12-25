<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import SettingsList from './components/SettingsList.vue'
import accessTokenRepository from './data/AccessTokenRepository'
import tweetTemplateRepository from './data/TweetTemplateRepository'
import amazonAssociateRepository from './data/AmazonAssociateRepository'
import { computed, onMounted, ref } from 'vue'
import AccessToken from './data/AccessToken'
import AmazonAssociate from './data/AmazonAssociate'
import TweetTemplate from './data/TweetTemplate'
import { AuthFlow } from './auth/AuthFlow'
import { OAuthConfig } from './auth/OAuthConfig'
import { TwitterConfig } from './Config'
import ConsumerKeys from './data/ConsumerKeys'
import { openNewTab } from './utils'
import { DefaultChromeDelegate } from './ChromeDelegate'
import debugRepository from './data/DebugRepository'

const _accessTokenRef = ref<AccessToken>(AccessToken.empty())
const _amazonAssociateRef = ref<AmazonAssociate>(AmazonAssociate.empty())
const _tweetTemplateRef = ref<TweetTemplate>(TweetTemplate.empty())
const _isLoggingActiveRef = ref(false)

const authFlowRef = ref<AuthFlow | null>(null)

const chromeDelegate = new DefaultChromeDelegate(window.chrome)

const accessToken = computed<AccessToken>({
  get: () => _accessTokenRef.value,
  set: (value: AccessToken) => {
    _accessTokenRef.value = value
    accessTokenRepository.set(value)
  },
})

const amazonAssociate = computed<AmazonAssociate>({
  get: () => _amazonAssociateRef.value,
  set: (value: AmazonAssociate) => {
    _amazonAssociateRef.value = value
    amazonAssociateRepository.set(value)
  },
})

const amazonDomains = amazonAssociateRepository.getAmazonDomains()

const tweetTemplate = computed({
  get: () => _tweetTemplateRef.value,
  set: (value: TweetTemplate) => {
    _tweetTemplateRef.value = value
    tweetTemplateRepository.set(value)
  },
})

const isLoggingActive = computed({
  get: () => _isLoggingActiveRef.value,
  set: (value: boolean) => {
    _isLoggingActiveRef.value = value
    debugRepository.setLoggingActive(value)
  },
})

const appVersion = chromeDelegate.appVersion()

onMounted(async () => {
  _accessTokenRef.value = await accessTokenRepository.get()
  _amazonAssociateRef.value = await amazonAssociateRepository.get()
  _tweetTemplateRef.value = await tweetTemplateRepository.get()
  _isLoggingActiveRef.value = await debugRepository.isLoggingActive()
})

const onLoginStart = async () => {
  authFlowRef.value = new AuthFlow(
    new ConsumerKeys(TwitterConfig.API_KEY, TwitterConfig.API_SECRET),
    new OAuthConfig()
  )
  const oauthToken = await authFlowRef.value.fetchRequestToken()
  openNewTab(`${TwitterConfig.URL_AUTHORIZE}?oauth_token=${oauthToken}`, true)
}
const onLoginCancel = () => {
  authFlowRef.value = null
}
const onPinCodeUpdate = async (value: string) => {
  if (authFlowRef.value) {
    const newAccessToken = await authFlowRef.value.fetchAccessToken(value)
    accessToken.value = newAccessToken
  }
}

const onLogout = () => {
  accessToken.value = AccessToken.empty()
}
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-50 pb-10">
    <TheHeader />
    <SettingsList
      v-model:access-token="accessToken"
      v-model:amazon-associate="amazonAssociate"
      v-model:tweet-template="tweetTemplate"
      v-model:is-logging-active="isLoggingActive"
      class="max-w-4xl w-full"
      :amazon-domains="amazonDomains"
      :app-version="appVersion"
      @login:start="onLoginStart"
      @login:cancel="onLoginCancel"
      @logout="onLogout"
      @update:pincode="onPinCodeUpdate"
    />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
