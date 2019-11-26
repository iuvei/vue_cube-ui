import Vue from "vue";
import Vuex from "vuex";
import * as mutations from './mutations'
import actions from './actions'
Vue.use(Vuex);


const state={
  // token:P.getCookie('token')?true:false,
  virtual:'',
  userMoney:0,
  userName:'',
};




// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });
let store = new Vuex.Store({
  state,
  mutations,
  actions,
});
export default store
