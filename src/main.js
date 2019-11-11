import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import "amfe-flexible";

//通用样式
import "./assets/styles/reset.css"
import "./assets/styles/border.css"

//通用样式
import "./assets/styles/common.css"

// cube-ui
import Cube from "cube-ui";
Vue.use(Cube);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
