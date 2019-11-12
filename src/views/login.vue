<template>
<div>
     <TopHeader/>
     <div class="banner_box">
        <cube-slide :show-dots="true" ref="slide" direction="horizontal">
            <cube-slide-item>
               <img  class="banner_img" src="../assets/img/test1.png" alt="">
            </cube-slide-item>
            <cube-slide-item>
               <img  class="banner_img" src="../assets/img/test2.png" alt="">
            </cube-slide-item>
        </cube-slide>
     </div>

      <router-link to="/SignIn" class="nz_button nz_bg_gradual_orange nz_color_white"> 登录 </router-link>
      <router-link to="/SignUp" class="nz_button nz_bg_white nz_color_black"> 注册 </router-link>
</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'

export default {
  name: 'login',
  components: { TopHeader },
  data () {
    return {
      msg: 'login'
    }
  },
 
}
</script>

<style scoped>
/* 轮播图框框 */
.banner_box{
    width: 9rem;
    margin: .3rem .3rem;
    height: 5.6rem;
    background-color: rgb(221, 221, 221);
    border: .2rem solid #fff;
    border-radius: .01rem;
    box-shadow: 0 0 .1rem -.01rem rgb(175, 175, 175);
    overflow: hidden;
}
.banner_img{
    width: 100%;
    height: 100%;
}
</style>
