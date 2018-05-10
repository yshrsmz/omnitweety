import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import App from './App';
import AccessToken from '../data/AccessToken';
import { AppConfig } from '../Config';

Vue.use(Vuex);
Vue.use(Vuetify);

interface State {
    accessToken: AccessToken;
    prefix: string;
}

const store = new Vuex.Store({
    state: {
        accessToken: AccessToken.empty(),
        prefix: AppConfig.PREFIX
    },
    mutations: {
        updateAccessToken(state: State, token: AccessToken) {
            state.accessToken = token;
        }
    },
    getters: {
        isAuthorized(state: State) {
            return state.accessToken.isAuthorized();
        }
    }
});

let v = new Vue({
    el: '#app',
    store: store,
    render: h=> h(App)
});
