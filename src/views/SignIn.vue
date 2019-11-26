<template>
<div>
     <TopHeader/>


     <div class="SinginUp_box">
        <div class="item">
            <i>🙎‍</i> <input  type="text" placeholder="请输入用户名" v-model="username" autocomplete="off" />
        </div>
        <div class="item">
            <i>🔒</i> <input  type="password" placeholder="请输入密码" v-model="password" autocomplete="off" />
        </div>

        <div class="forget">忘记密码？</div>

        <a class="nz_button nz_bg_gradual_orange nz_color_white" @click="SignIn()"> 登录 </a> 

    </div> 


        
</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'

export default {
  name: 'login',
  components: { TopHeader },
  data () {
    return {
        username:'',
        password:'',
    }
  },
  methods:{
      SignIn(){
        //   this.$router.push("/");

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
                                           'source':2}).then(res=>{
            console.log(res)
            this.$createToast({
                txt: res.data.msg ,
                type: 'txt'
            }).show()
            if (res.data.code == 0) {
                this.$store.dispatch('saveUserName', res.data.data.user_name)
                this.$store.dispatch('saveUserMoney', res.data.data.money)
                window.sessionStorage.setItem('virtual', res.data.virtual);
                window.localStorage.setItem('access_token', res.headers.easysecret);
                this.$router.push('/home');
            }
        });
      }
  },
 
}
</script>

<style scoped>
.SinginUp_box{
    width: 10rem;
    height: calc(100vh - 1.2rem) ;
    background-color: rgb(241, 241, 241);
    overflow: hidden;
}
.item{
    width: 100%;
    height: 1rem;
    background-color: rgb(255, 255, 255);
    /* background-color: rgb(212, 17, 17); */
    margin: .1rem 0;
}
.item i{  
    display: block;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: .4rem;
    float: left;
}
.item input{
    caret-color: red;
    width: calc(100% - 1rem) ;
    height: 100%;
    font-size: .1rem;
    float: left;
}
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
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
</style>
