import Vue from "vue";
import Vuex from "vuex";
import * as mutations from './mutations'
import actions from './actions'
Vue.use(Vuex);


const state={
  // token:P.getCookie('token')?true:false,
  notice:false,  //默认 赛事窗口是关闭
  virtual:'',
  MyUid:window.sessionStorage.getItem('MyUid')?window.sessionStorage.getItem('MyUid'):'',
  token:window.sessionStorage.getItem('access_token')?window.sessionStorage.getItem('access_token'):'',
  userMoney:window.sessionStorage.getItem('userMoney')?window.sessionStorage.getItem('userMoney'):0,
  userName:window.sessionStorage.getItem('userName')?window.sessionStorage.getItem('userName'):'',
  PromoteCode:window.sessionStorage.getItem('PromoteCode')?window.sessionStorage.getItem('PromoteCode'):'',
  NickName:window.sessionStorage.getItem('NickName')?window.sessionStorage.getItem('NickName'):'',
  HeadImgurl:window.sessionStorage.getItem('HeadImgurl')?window.sessionStorage.getItem('HeadImgurl'):'',
  Other:window.sessionStorage.getItem('Other')? JSON.parse(window.sessionStorage.getItem('Other')):[],

  //首页轮播图片
  bannerImgs:window.sessionStorage.getItem('bannerImgs')? JSON.parse(window.sessionStorage.getItem('bannerImgs')):'',
  WebData:window.sessionStorage.getItem('WebData')? JSON.parse(window.sessionStorage.getItem('WebData')):'',


  //房间数据
  RoomData:window.sessionStorage.getItem('RoomData') ? JSON.parse(window.sessionStorage.getItem('RoomData')) : '' ,
  // 私聊数据
  PrivateChatData:window.sessionStorage.getItem('PrivateChatData') ? JSON.parse(window.sessionStorage.getItem('PrivateChatData')) : {} ,
  //Websocket 的状态
  Websocket_status:window.sessionStorage.getItem('Websocket_status')?window.sessionStorage.getItem('Websocket_status'):'',


  //通讯录列表
  Address_list:window.sessionStorage.getItem('Address_list')?JSON.parse(window.sessionStorage.getItem('Address_list')):'',
  //群消息个数
  Group_Now_Message:window.sessionStorage.getItem('Group_Now_Message')?JSON.parse(window.sessionStorage.getItem('Group_Now_Message')):'',
  //群消息
  Group_Message_msgList:window.sessionStorage.getItem('Group_Message_msgList')?JSON.parse(window.sessionStorage.getItem('Group_Message_msgList')):'',
  //房间列表
  Red_Room_list:window.sessionStorage.getItem('Red_Room_list')?JSON.parse(window.sessionStorage.getItem('Red_Room_list')):'',
  // 群消息个数
  Group_Msg_total:window.sessionStorage.getItem('Group_Msg_total')?window.sessionStorage.getItem('Group_Msg_total'):'',
  //好友新消息
  Friend_Now_Message:'',
  Msg_num:0,
  //iframe
  iframeopen:window.sessionStorage.getItem('iframeopen')?window.sessionStorage.getItem('iframeopen'):false,
  //iframeURL
  iframeopenURL:window.sessionStorage.getItem('iframeopenURL')?window.sessionStorage.getItem('iframeopenURL'):'',
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
