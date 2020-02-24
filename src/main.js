import Vue from 'vue'
import App from './App.vue'


// //IIB ini firebase
//import VueFire from 'vuefire'
//Vue.use(VueFire)
// //IIB fin firebase
import { firestorePlugin } from 'vuefire'

//IIB
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue,firestorePlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
