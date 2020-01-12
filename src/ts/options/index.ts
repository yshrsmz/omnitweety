import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import App from './App';
import AccessToken from '../data/AccessToken';
import { AppConfig } from '../Config';
import accessTokenRepository from '../data/AccessTokenRepository';
import tweetTemplateRepository from '../data/TweetTemplateRepository';
import TweetTemplate from '../data/TweetTemplate';
import vuetify from './vuetify';

Vue.use(Vuex);

interface State {
  accessToken: AccessToken;
  tweetTemplate: TweetTemplate;
}

interface UpdatePrefixActionPayload {
  prefix: string;
}

const store = new Vuex.Store({
  state: {
    accessToken: AccessToken.empty(),
    tweetTemplate: TweetTemplate.empty()
  },
  mutations: {
    updateAccessToken(state: State, token: AccessToken) {
      state.accessToken = token;
    },
    updateTweetTemplate(state, template: TweetTemplate) {
      state.tweetTemplate = template;
    }
  },
  getters: {
    isAuthorized(state: State): boolean {
      return state.accessToken.isAuthorized();
    },
    tweetTemplate(state: State): TweetTemplate {
      return state.tweetTemplate;
    }
  },
  actions: {
    loadAccessToken({ commit }) {
      commit('updateAccessToken', accessTokenRepository.get());
    },
    updateAccessToken({ commit }, token: AccessToken) {
      accessTokenRepository.set(token);
      commit('updateAccessToken', accessTokenRepository.get());
    },
    clearAccessToken({ commit }) {
      accessTokenRepository.clear();
      commit('updateAccessToken', AccessToken.empty());
    },
    loadTweetTemplate({ commit }): void {
      const template = tweetTemplateRepository.get();
      commit('updateTweetTemplate', template);
    },
    updateTweetTemplate({ commit }, template: TweetTemplate) {
      tweetTemplateRepository.set(template);
      commit('updateTweetTemplate', tweetTemplateRepository.get());
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
  },
  render: h => h(App)
});
