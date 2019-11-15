/* ajax请求配置  */
import Vue from "vue";
import axios from 'axios'
import apiURL from './api.js'
// cube-ui
import { Toast } from 'cube-ui'
Vue.use(Toast)


// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = apiURL;  // 默认地址

//整理数据
axios.defaults.transformRequest = function (data) {
  data = JSON.stringify(data);
    return data;
};

axios.defaults.headers.post['Content-Type'] = 'application/json';

let loading ;
// 路由请求拦截
axios.interceptors.request.use(
  config => {
    loading = Toast.$create({
                time: 0,
                txt: '数据加载中...'
              }).show()

    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// 路由响应拦截
axios.interceptors.response.use(
  response => {
    loading.hide()
    return response;
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });
export default axios;