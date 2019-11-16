import Vue from "vue";
import VueRouter from "vue-router";
import { TabPanels } from "cube-ui";
// import Home from "../views/Home.vue";

const Home = r => require.ensure([], () => r(require("@/views/Home.vue")), "Home");
const Login = r => require.ensure([], () => r(require("@/views/login.vue")), "Login");
const SignIn = r => require.ensure([], () => r(require("@/views/SignIn.vue")), "SignIn");
const SignUp = r => require.ensure([], () => r(require("@/views/SignUp.vue")), "SignUp");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/login",
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
  }
];

const router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => {
  if(localStorage.getItem('access_token')){ //判断本地是否存在access_token
    next();
  }else {
    if(to.path === '/login'||to.path==='/SignIn' || to.path==='/SignUp'){
      next();
    }else {
      next({
        path:'/login'
      })
    }
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if(to.fullPath == "/login"){
    if(localStorage.getItem('access_token')){
      next({
        path:from.fullPath
      });
    }else {
      next();
    }
  }
});


export default router;
