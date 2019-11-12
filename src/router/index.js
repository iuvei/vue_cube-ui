import Vue from "vue";
import VueRouter from "vue-router";
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

export default router;
