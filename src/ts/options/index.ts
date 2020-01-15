import Vue, { ComponentOptions } from 'vue';
import Vuex from 'vuex';
import App from './App';
import AccessToken from '../data/AccessToken';
import accessTokenRepository from '../data/AccessTokenRepository';
import tweetTemplateRepository from '../data/TweetTemplateRepository';
import amazonAssociateRepository from '../data/AmazonAssociateRepository'
import TweetTemplate from '../data/TweetTemplate';
import vuetify from './vuetify';
import AmazonAssociate from '../data/AmazonAssociate';

Vue.use(Vuex);

interface State {
  accessToken: AccessToken;
  tweetTemplate: TweetTemplate;
  amazonAssociate: AmazonAssociate;
  amazonDomains: string[];
}

interface UpdatePrefixActionPayload {
  prefix: string;
}

const store = new Vuex.Store<State>({
  state: {
    accessToken: AccessToken.empty(),
    tweetTemplate: TweetTemplate.empty(),
    amazonAssociate: AmazonAssociate.empty(),
    amazonDomains: amazonAssociateRepository.getAmazonDomains(),
  },
  mutations: {
    updateAccessToken(state: State, token: AccessToken): void {
      state.accessToken = token;
    },
    updateTweetTemplate(state, template: TweetTemplate): void {
      state.tweetTemplate = template;
    },
    updateAmazonAssociate(state, amazonAssociate: AmazonAssociate): void {
      state.amazonAssociate = amazonAssociate
    }
  },
  getters: {
    isAuthorized(state: State): boolean {
      return state.accessToken.isAuthorized();
    },
    tweetTemplate(state: State): TweetTemplate {
      return state.tweetTemplate;
    },
    amazonAssociate(state: State): AmazonAssociate {
      return state.amazonAssociate
    },
    amazonDomains(state: State): string[] {
      return state.amazonDomains
    },
  },
  actions: {
    loadAccessToken({ commit }): void {
      commit('updateAccessToken', accessTokenRepository.get());
    },
    updateAccessToken({ commit }, token: AccessToken): void {
      accessTokenRepository.set(token);
      commit('updateAccessToken', accessTokenRepository.get());
    },
    clearAccessToken({ commit }): void {
      accessTokenRepository.clear();
      commit('updateAccessToken', AccessToken.empty());
    },
    loadTweetTemplate({ commit }): void {
      const template = tweetTemplateRepository.get();
      commit('updateTweetTemplate', template);
    },
    updateTweetTemplate({ commit }, template: TweetTemplate): void {
      tweetTemplateRepository.set(template);
      commit('updateTweetTemplate', tweetTemplateRepository.get());
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
    }
  }
});

const v = new Vue({
  vuetify: vuetify,
  el: '#app',
  store: store,
  created() {
    const dispatch = this.$store.dispatch;
    dispatch('loadAccessToken');
    dispatch('loadTweetTemplate');
    dispatch('loadAmazonAssociate')
  },
  render: h => h(App)
});
