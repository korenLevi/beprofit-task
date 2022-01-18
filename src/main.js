import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
import './styles/main.scss'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  fas
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
library.add(fas)
// Vue.use(SortedTablePlugin);
// Vue.use(Buefy)
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')