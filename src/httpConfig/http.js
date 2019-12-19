/* ajax请求配置  */
import Vue from "vue";
import axios from 'axios'
import router from "../router";
// cube-ui
import { Toast } from 'cube-ui'
Vue.use(Toast)

// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//整理数据
axios.defaults.transformRequest = function (data) {
  data = JSON.stringify(data);
    return data;
};

let loading ;
// 路由请求拦截
axios.interceptors.request.use(config => {
  config.headers = {
      'Accept': "application/json; charset=utf-8",
      'Content-Type': 'application/json',
      'EasySecret': sessionStorage.getItem('access_token')
  };
  
  // 测试了很多 最后只有这种 '合并对象' 的方法可以   因为是手机 所以要传 source:2 
  let newObj = {};
  Object.assign(newObj,config.data,{source : 2})
  config.data = newObj
  // loading = Toast.$create({
  //             time: 0,
  //             txt: '数据加载中...'
  //           }).show()
  return config;
},
error => {
  Toast.$create({ time: 2000, txt: '网络超时，请刷新页面重试' }).show()
  return Promise.reject(error.response);
});

// 路由响应拦截
axios.interceptors.response.use(
  response => {
    
    // loading.hide();
    if(response.data.code == 2){
      Toast.$create({
        time: 1000,
        txt: response.data.msg,
        // txt: '登录信息过期,请重新登录!',
        type:'txt'
      }).show()
      window.sessionStorage.setItem('access_token','');
      router.push('/login')
    }
    return response;
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });
export default axios;