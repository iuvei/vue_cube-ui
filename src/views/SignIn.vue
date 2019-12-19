<template>
<div class="box">
     <TopHeader/>
     <div class="SinginUp_box">
        <!-- <div class="item">
           <i><icon-svg icon-class="yonghu1"/> </i><cube-input type="text" placeholder="请输入用户名" v-model="username" autocomplete="off" :clearable="clearable" style="ime-mode:disabled"/>
        </div> -->
        <div class="item">
           <i><icon-svg icon-class="yonghu1"/> </i><cube-input type="email" placeholder="请输入用户名" v-model="username" autocomplete="off" :clearable="clearable" style="ime-mode:inactive"/>
        </div>
        <!-- <div class="item Break_issue">
           <i><icon-svg icon-class="yonghu1"/> </i><cube-input type="password" placeholder="请输入用户名" v-model="username" autocomplete="off" :clearable="clearable"   :eye="fuck"/>
        </div> -->
            
        <div class="item">
            <i><icon-svg icon-class="lunkuodasan-"/></i><cube-input type="password" placeholder="请输入密码" v-model="password" autocomplete="off" :clearable="clearable" :eye="eye" />
        </div>

        <div class="remember_box">
            <cube-checkbox class="remember" v-model="remember_pass">
                记住密码
            </cube-checkbox>
            <cube-checkbox class="auto_logIn" v-model="auto_logIn">
                自动登录
            </cube-checkbox>
        </div>
        <a class="nz_button nz_bg_gradual_orange nz_color_white" @click="SignIn()"> 登录 </a> 
        <div class="forget">忘记密码？</div>
    </div> 
        
</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'

export default {
  name: 'SignIn',
  components: { TopHeader },
  data () {
    return {
        username:'',
        password:'',
        clearable: {   //cube插件的参数 控制清除input的
            visible: true,
            blurHidden: true
        },
        eye: {
            open: false,
            reverse: false
        },
        fuck: {
            open: true,
            reverse: false
        },

        remember_pass:false,//记住密码
        auto_logIn:false, //自动登录
    }
  },
  created() {
      if(this.$route.params.name){
          this.username = this.$route.params.name
      }
      if(this.$route.params.pass){
          this.password = this.$route.params.pass
      }
      if(!(this.$route.params.name && this.$route.params.pass)){
          if(localStorage.getItem('username')){
              this.username = localStorage.getItem('username')
          }
          if(localStorage.getItem('password')){
              this.password = localStorage.getItem('password')
          }
          if(localStorage.getItem('auto_logIn') == 'true'){
              this.SignIn()
          }
      }
  },
  methods:{
      SignIn(){
        if (!this.username || !this.password){
            this.$createToast({
                txt: '请填写完整信息!' ,
                type: 'txt'
            }).show()
            return
        }

        this.$http.post('api/user/login',{ 'username': this.username, 
                                           'password': this.password, 
                                           'codeToken': "123456",
                                          }).then(res=>{
            this.$createToast({
                txt: res.data.msg ,
                type: 'txt'
            }).show()
            if (res.data.code == 0) {
                this.$store.dispatch('saveMyUid', res.data.data.uid)
                window.sessionStorage.setItem('virtual', res.data.virtual);
                this.$store.dispatch('saveToken', res.headers.easysecret)
                this.getUserInfo()

                if(this.remember_pass == true){
                    window.localStorage.setItem('username',this.username);
                    window.localStorage.setItem('password',this.password);
                }
                if(this.auto_logIn == true){
                    window.localStorage.setItem('auto_logIn','true');
                }
            }
            else if(res.data.code == 0){
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
              this.$router.push('/home')
          })
      }
  },
  watch: {
      'auto_logIn'(){
          if(this.auto_logIn == true){
              this.remember_pass = true
          }
      },
      'remember_pass'(){
          if(this.remember_pass == false){
              this.auto_logIn = false
          }
      }
  },
 
}
</script>

<style scoped>
.box{
    position: absolute;
    top: 0;
}
.SinginUp_box{
    width: 10rem;
    height: calc(100vh - 1.2rem) ;
    background-color: #fbfbfb;
    overflow: hidden;
}
.item{
    width: 100%;
    height: 1.4rem;
    background-color: rgb(255, 255, 255);
    /* background-color: rgb(212, 17, 17); */
    margin: .1rem 0;
}
.item i{  
    display: block;
    width: 1.4rem;
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    font-size: .6rem;
    float: left;
}
.item input{
    caret-color: red;
    width: calc(100% - 3rem) ;
    height: 100%;
    font-size: 1rem;
    float: left;
}
.forget{
    display: block;
    color: #ee375f;
    width: 96%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: right;
    margin:0 2%;
    font-size: .4rem;
}



.remember_box{
    overflow: hidden;
}
.remember{
    width:50%;
    height: 1rem;
    line-height: .6rem;
    box-sizing: border-box;
    padding: .2rem .5rem;
    font-size: .5rem;
    float: left;
}
.auto_logIn{
    width:50%;
    height: 1rem;
    line-height: .6rem;
    box-sizing: border-box;
    padding:.2rem .5rem;
    font-size: .5rem;
    float: right;
}
</style>
<style>
.item .cube-input{
    float: left;
    height: 1.4rem;
    padding: .2rem 0rem;
    box-sizing: border-box;
    width: 8rem; 
}
.item .cube-input::after{
    border: none;
}
.Break_issue .cube-input-eye{
    visibility:hidden;  
}
.cube-input-field{
    ime-mode:inactive;
}
</style>