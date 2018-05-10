import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';

Vue.use(Vuetify);

let v = new Vue({
    el: '#app',
    render: h=> h(App)
});
