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
  async loadAccessToken({ commit }): Promise<void> {
    commit('updateAccessToken', await accessTokenRepository.get())
  },
  async updateAccessToken({ commit }, token: AccessToken): Promise<void> {
    await accessTokenRepository.set(token)
    commit('updateAccessToken', await accessTokenRepository.get())
  },
  async clearAccessToken({ commit }): Promise<void> {
    await accessTokenRepository.clear()
    commit('updateAccessToken', AccessToken.empty())
  },
  async loadTweetTemplate({ commit }): Promise<void> {
    const template = await tweetTemplateRepository.get()
    commit('updateTweetTemplate', template)
  },
  async updateTweetTemplate(
    { commit },
    template: TweetTemplate
  ): Promise<void> {
    await tweetTemplateRepository.set(template)
    commit('updateTweetTemplate', await tweetTemplateRepository.get())
  },
  async loadAmazonAssociate({ commit }): Promise<void> {
    console.log('loadAmazonAssociate', await amazonAssociateRepository.get())
    commit('updateAmazonAssociate', await amazonAssociateRepository.get())
  },
  async updateAmazonAssociate(
    { commit },
    amazonAssociate: AmazonAssociate
  ): Promise<void> {
    await amazonAssociateRepository.set(amazonAssociate)
    console.log('updateAmazonAssociate', await amazonAssociateRepository.get())
    commit('updateAmazonAssociate', await amazonAssociateRepository.get())
  },
  async clearAmazonAssociate({ commit }): Promise<void> {
    await amazonAssociateRepository.clear()
    commit('updateAmazonAssociate', await amazonAssociateRepository.get())
  },
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
})
