import Vue from 'vue'
import App from './App.vue'
import vuetify from './vuetify'
import { VNode } from 'vue/types/umd'
import VueCompositionAPI from '@vue/composition-api'
import store from './store'
import { provideStore } from './store/utils'

Vue.use(VueCompositionAPI)

new Vue({
  vuetify: vuetify,
  el: '#app',
  store: store,
  setup(): void {
    provideStore(store)
  },
  created(): void {
    const dispatch = this.$store.dispatch
    dispatch('loadAccessToken')
    dispatch('loadTweetTemplate')
    dispatch('loadAmazonAssociate')
  },
  render: (h): VNode => h(App),
})
