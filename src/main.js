import Vue from 'vue'

import router from './router'

import BootstrapVue from "bootstrap-vue"

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';

import Notifications from 'vue-notification'



import money from 'v-money'
import VueMask from 'v-mask';
import Storage from 'vue-web-storage'; 


import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueFileAgent);


Vue.use(Storage); 

Vue.use(VueMask);

Vue.use(BootstrapVue);

Vue.use(Notifications)


Vue.use(money, {precision: 4})

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);


//Vue.config.productionTip = false
//Vue.use(Vuetify)
//export default new Vuetify({ })

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)



/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false



new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
