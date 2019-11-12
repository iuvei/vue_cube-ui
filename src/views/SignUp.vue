<template>
<div>
    <TopHeader/>

    <div class="SinginUp_box" v-show="isGetAll">
        <div class="item">
            <i>📱</i> <input  type="text" placeholder="请输入用户名" autocomplete="off" />
        </div>
        <div class="item">
            <i>📱</i> <input  type="password" placeholder="请输入密码" autocomplete="off" />
        </div>
        <div class="item">
            <i>📱</i> <input  type="text" placeholder="请输入手机号码" >
        </div>
        
        
        <div class="item">
            <i>📱</i> <input  type="password" placeholder="请确认密码" autocomplete="off">
        </div>

        <a class=" nz_button nz_bg_gradual_orange nz_color_white"> 注册 </a> 

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
        isGetAll:true, //临时
    }
  },
  created(){
    //   this.getConfig()//获取注册时需要 收集哪些信息
  },
  methods :{
        //获取注册需要的数据
        // async getConfig() {

        //     await this.axios.get('http://easy.sibo9999.com/api/user/getUserField').then((response)=>{
        //         this.info=response;
        //     }).catch((response)=>{
        //         console.log(response);
        //     })
        //     console.log(this.info)
        // },
        
  }
 
}
</script>

<style scoped>
.SinginUp_box{
    width: 10rem;
    height: calc(100vh - 1.2rem);
    background-color: #fbfbfb;
    overflow: hidden;
}
.item{
    width: 100%;
    height: 1rem;
    background-color: #ffffff;
    margin: .1rem 0;
}
.item i{  
    display: block;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: .5rem;
    float: left;
}
.item input{
    caret-color: red;
    width: calc(100% - 1rem) ;
    background-color: #ffffff;
    height: 100%;
    font-size:.3rem;
    float: left;
}
</style>
