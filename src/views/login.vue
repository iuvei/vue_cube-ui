<template>
<div>
      <TopHeader v-if="!whiteBoard"/>
      <div class="banner_box" v-if="!whiteBoard">
          <cube-slide :show-dots="true" ref="slide" direction="horizontal">
              <cube-slide-item>
                <img  class="banner_img" src="../assets/img/login/ic_login_ad1.png" alt="">
              </cube-slide-item>
              <cube-slide-item>
                <img  class="banner_img" src="../assets/img/login/ic_login_ad2.png" alt="">
              </cube-slide-item>
          </cube-slide>
      </div>
      <div class="baiban" v-if="whiteBoard"></div>
      <router-link to="/SignIn" class="nz_button nz_bg_gradual_orange nz_color_white" v-if="!whiteBoard"> 登录 </router-link>
      <router-link to="/SignUp" class="nz_button nz_bg_white nz_color_black" v-if="!whiteBoard"> 注册 </router-link>
      
</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'

export default {
  name: 'login',
  components: { TopHeader },
  data () {
    return {
      msg: 'login',
      username:'',
      password:'',
      whiteBoard:true,
    }
  },
  created() {
    if(localStorage.getItem('auto_logIn') && localStorage.getItem('auto_logIn') == 'true' && localStorage.getItem('username') && localStorage.getItem('password')){
        this.whiteBoard = true;
        this.username = localStorage.getItem('username');
        this.password = localStorage.getItem('password')
        this.SignIn()
    }else{
        this.whiteBoard = false
    }
  },
  methods:{
      SignIn(){
        this.$http.post('api/user/login',{ 'username': this.username, 
                                           'password': this.password, 
                                           'codeToken': "123456",
                                          }).then(res=>{
              
            if (res.data.code == 0) {
                // this.$router.push('/home')
                this.$store.dispatch('saveMyUid', res.data.data.uid)
                this.$store.dispatch('saveToken', res.headers.easysecret)
                this.getUserInfo()
            }
            else if(res.data.code != 0){
                return this.$createToast({
                      time:1000,
                      txt: res.data.msg ,
                      type: 'txt'
                  }).show()
            }
            
        });
      },
      //得到用户信息
      getUserInfo(){
          this.$http.post('api/users/info2').then(res=>{
              this.$store.dispatch('saveUserName', res.data.data.UserName)
              this.$store.dispatch('saveUserMoney', res.data.data.Money)
              this.$store.dispatch('savePromoteCode', res.data.data.promote_code)
              this.$store.dispatch('saveNickName', res.data.data.nick_name)
              this.$store.dispatch('saveHeadImgurl', res.data.data.headimgurl)
              this.$store.dispatch('saveOther', res.data.data.other)
              // this.whiteBoard = false
              this.$router.push('/home')
          })
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
    background-color:#fff;
    border: .2rem solid #fff;
    border-radius: .01rem;
    box-shadow: 0 0 .1rem -.01rem rgb(175, 175, 175);
    overflow: hidden;
}
.banner_img{
    width: 100%;
    height: 100%;
}
.baiban{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  /* background-color: rgb(252, 0, 0); */
}
</style>
