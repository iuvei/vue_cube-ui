import Vue from "vue";
import VueRouter from "vue-router";
import { TabPanels } from "cube-ui";
// import Home from "../views/Home.vue";


// const Home = r => require.ensure([], () => r(require("@/views/Home.vue")), "Home");
import Home from '@/views/Home.vue'
const Login = r => require.ensure([], () => r(require("@/views/login.vue")), "Login");
const SignIn = r => require.ensure([], () => r(require("@/views/SignIn.vue")), "SignIn");
const SignUp = r => require.ensure([], () => r(require("@/views/SignUp.vue")), "SignUp");
const areaNotArrow = r => require.ensure([], () => r(require('@/views/areaNotArrow')), 'areaNotArrow');//地域访问限制
const agencyHub = r => require.ensure([], () => r(require('@/views/agencyHub')), 'agencyHub');
const shareHub = r => require.ensure([], () => r(require('@/views/Agency/shareHub')), 'shareHub'); //分享中心
const AgencyRules = r => require.ensure([], () => r(require('@/views/Agency/AgencyRules')), 'AgencyRules');//代理规则
const generalize = r => require.ensure([], () => r(require('@/views/Agency/generalize')), 'generalize');//推广教程
const subordinate = r => require.ensure([], () => r(require('@/views/Agency/subordinate')), 'subordinate');//下级报表
const Myforms = r => require.ensure([], () => r(require('@/views/Agency/Myforms')), 'Myforms');//我的报表
const HelpCenter = r => require.ensure([], () => r(require('@/views/HelpCenter')), 'HelpCenter');//帮助中心
const roomReport = r => require.ensure([], () => r(require('@/views/roomReport')), 'roomReport');//房间报表
// const recharge = r => require.ensure([], () => r(require('@/views/recharge')), 'recharge');//充值中心
import recharge from '@/views/recharge.vue'//充值中心
const withdraw = r => require.ensure([], () => r(require('@/views/withdraw')), 'withdraw');//提现中心
const set = r => require.ensure([], () => r(require('@/views/set')), 'set');//设置
const createRoom = r => require.ensure([], () => r(require('@/views/createRoom')), 'createRoom');//创建房间
// const ChatRoom = r => require.ensure([], () => r(require('@/views/ChatRoom')), 'ChatRoom');//聊天室房间
import ChatRoom from '@/views/ChatRoom.vue'//聊天室房间
const RedEnvelope = r => require.ensure([], () => r(require('@/views/RoomInfo/RedEnvelope')), 'RedEnvelope');//发包组件
const PrivateChat = r => require.ensure([], () => r(require('@/views/PrivateChat')), 'PrivateChat');//私聊房间
const sendRedPack = r => require.ensure([], () => r(require('@/views/sendRedPack')), 'sendRedPack');//发包记录
// const GrabBag = r => require.ensure([], () => r(require('@/views/GrabBag')), 'GrabBag');//发包记录
const transfer = r => require.ensure([], () => r(require('@/views/transfer')), 'transfer');//额度转换
const ChessRecord = r => require.ensure([], () => r(require('@/views/ChessRecord')), 'ChessRecord');//棋牌记录



Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/",
    name: "login",
    component: Login,
    meta: { title: "登录注册" }
  },
  {
    path: "/SignIn",
    name: "SignIn",
    component: SignIn,
    meta: { title: "登录" }
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp,
    meta: { title: "注册" }
  },
  {
    path: "/areaNotArrow",
    name: "areaNotArrow",
    component: areaNotArrow,
  },
  {
    path: "/agencyHub",
    name: "agencyHub",
    component: agencyHub,
    meta: { title: "代理中心" }
  },
  {
    path: "/shareHub",
    name: "shareHub",
    component: shareHub,
    meta: { title: "分享" }
  },
  {
    path: "/AgencyRules",
    name: "AgencyRules",
    component: AgencyRules,
    meta: { title: "代理规则" }
  },
  {
    path: "/generalize",
    name: "generalize",
    component: generalize,
    meta: { title: "推广教程" }
  },
  {
    path: "/Myforms",
    name: "Myforms",
    component: Myforms,
    meta: { title: "我的报表" }
  },
  {
    path: "/subordinate",
    name: "subordinate",
    component: subordinate,
    meta: { title: "下级玩家" }
  },
  {
    path: "/HelpCenter",
    name: "HelpCenter",
    component: HelpCenter,
    meta: { title: "帮助中心" }
  },
  {
    path: "/recharge",
    name: "recharge",
    component: recharge,
    meta: { title: "充值中心" }
  },
  {
    path: "/withdraw",
    name: "withdraw",
    component: withdraw,
    meta: { title: "提现中心" }
  },
  {
    path: "/set",
    name: "set",
    component: set,
    meta: { title: "设置" }
  },
  {
    path: "/createRoom",
    name: "createRoom",
    component: createRoom,
    meta: { title: "创建房间" }
  },
  {
    path: "/ChatRoom",
    name: "ChatRoom",
    component: ChatRoom,
    meta: { title: "聊天室" }
  },
  {
    path: "/RedEnvelope",
    name: "RedEnvelope",
    component: RedEnvelope,
  },
  {
    path: "/PrivateChat",
    name: "PrivateChat",
    component: PrivateChat,
    meta: { title: "私聊" }
  },
  {
    path: "/roomReport",
    name: "roomReport",
    component: roomReport,
    meta: { title: "房间报表" }
  },
  {
    path: "/sendRedPack",
    name: "sendRedPack",
    component: sendRedPack,
    meta: { title: "发包记录" }
  },
  {
    path: "/transfer",
    name: "transfer",
    component: transfer,
    meta: { title: "额度转换" }
  },
  {
    path: "/ChessRecord",
    name: "ChessRecord",
    component: ChessRecord,
    meta: { title: "棋牌记录" }
  },
];

const router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => {
  if( sessionStorage.getItem('access_token') && sessionStorage.getItem('access_token') != ''){ //判断本地是否存在access_token
      if(to.path === '/'||to.path==='/SignIn' || to.path==='/SignUp'){
        next({
          path:'/home'
        })
      }else {
        next();
      }
  }else {
    if(to.path === '/' || to.path==='/SignIn' || to.path==='/SignUp'||to.path==='/areaNotArrow'){
      next();
    }else {
      next({
        path:'/'
      })
    }
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  // if(to.fullPath == "/"){
  //   if(sessionStorage.getItem('access_token')){
  //     next({
  //       path:from.fullPath
  //     });
  //   }else {
  //     next();
  //   }
  // }
});


export default router;
