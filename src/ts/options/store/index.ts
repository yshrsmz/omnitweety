import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex'
import AccessToken from '../../data/AccessToken'
import AmazonAssociate from '../../data/AmazonAssociate'
import TweetTemplate from '../../data/TweetTemplate'
import accessTokenRepository from '../../data/AccessTokenRepository'
import tweetTemplateRepository from '../../data/TweetTemplateRepository'
import amazonAssociateRepository from '../../data/AmazonAssociateRepository'
import Vue from 'vue'

Vue.use(Vuex)

const state = () => ({
  accessToken: AccessToken.empty(),
  tweetTemplate: TweetTemplate.empty(),
  amazonAssociate: AmazonAssociate.empty(),
  amazonDomains: amazonAssociateRepository.getAmazonDomains(),
})

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  updateAccessToken(state, token: AccessToken): void {
    state.accessToken = token
  },
  updateTweetTemplate(state, template: TweetTemplate): void {
    state.tweetTemplate = template
  },
  updateAmazonAssociate(state, amazonAssociate: AmazonAssociate): void {
    state.amazonAssociate = amazonAssociate
  },
}

export type RootMutations = typeof mutations

const getters: GetterTree<RootState, RootState> = {
  isAuthorized(state: RootState): boolean {
    return state.accessToken.isAuthorized()
  },
  tweetTemplate(state: RootState): TweetTemplate {
    return state.tweetTemplate
  },
  amazonAssociate(state: RootState): AmazonAssociate {
    return state.amazonAssociate
  },
  amazonDomains(state: RootState): string[] {
    return state.amazonDomains
  },
}

const actions: ActionTree<RootState, RootState> = {
  loadAccessToken({ commit }): void {
    commit('updateAccessToken', accessTokenRepository.get())
  },
  updateAccessToken({ commit }, token: AccessToken): void {
    accessTokenRepository.set(token)
    commit('updateAccessToken', accessTokenRepository.get())
  },
  clearAccessToken({ commit }): void {
    accessTokenRepository.clear()
    commit('updateAccessToken', AccessToken.empty())
  },
  loadTweetTemplate({ commit }): void {
    const template = tweetTemplateRepository.get()
    commit('updateTweetTemplate', template)
  },
  updateTweetTemplate({ commit }, template: TweetTemplate): void {
    tweetTemplateRepository.set(template)
    commit('updateTweetTemplate', tweetTemplateRepository.get())
  },
  loadAmazonAssociate({ commit }): void {
    commit('updateAmazonAssociate', amazonAssociateRepository.get())
  },
  updateAmazonAssociate({ commit }, amazonAssociate: AmazonAssociate): void {
    amazonAssociateRepository.set(amazonAssociate)
    commit('updateAmazonAssociate', amazonAssociateRepository.get())
  },
  clearAmazonAssociate({ commit }): void {
    amazonAssociateRepository.clear()
    commit('updateAmazonAssociate', amazonAssociateRepository.get())
  },
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
})
