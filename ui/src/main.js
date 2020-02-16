import Vue from 'vue'
import App from '@/App.vue'
import Vuetify from 'vuetify'
import router from '@/components/router';
import {store} from '@/store/store';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
