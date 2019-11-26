import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import "amfe-flexible";

//初始化通用样式
import "./assets/styles/reset.css"
import "./assets/styles/border.css"

//通用样式
import "./assets/styles/common.css"


import axios from './httpConfig/http.js'
Vue.prototype.$http = axios

// cube-ui
import Cube from "cube-ui";
Vue.use(Cube);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
