<template>
<div>
    <TopHeader/>

<div class="SinginUp_box" v-show="isGetAll"  >
    <div v-for="(item, i) in rConfig" :key="i" >
        <div class="item" v-if="item.name != 'ask'&& item.name != 'sex'" >
            <i>📱</i>
            <input  :placeholder="'请输入'+ item.title + (item.status == 'required' ? ' （必填）' : '')" 
                    :type="item.name == 'user_pass'? 'password':'text'" 
                    v-model="regData[item.name]" 
                    autocomplete="off"
                    :maxlength="item.max_len"
                    />
        </div>

        <div class="item" v-if="item.name == 'ask'">
            <i>📱</i>
            <cube-select  v-model="regData[item.name]" 
                          :options="ask_options"
                          placeholder="请选择安全问题">
            </cube-select>
        </div>
        <div class="item" v-if="item.name == 'sex'">
            <i>📱</i> 
            <cube-select v-model="regData[item.name]" 
                         :options="sex_options"
                         placeholder="请选择性别">
            </cube-select>
        </div>

        <div class="item" v-if="item.name == 'user_pass'" >
            <i>📱</i>
            <input type="password" placeholder="请确认密码 （必填）" :maxlength="item.max_len" v-model="surePwd">
        </div>

    </div>
    <a class=" nz_button nz_bg_gradual_orange nz_color_white" @click="SignUp()"> 注册 </a> 
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
        isGetAll:false, //临时
        rConfig:'',    //请求回来 所需要填写的数据
        regData: {},   //填写好了的数据
        surePwd:'',    //再次确认密码

        sex_options:['男','女'],
        ask_options:'',//这是加载过来的安全问题的集合问题
    }
  },
  created(){
    //   this.getConfig()//获取注册时需要 收集哪些信息
      this.getQuestionz(); //获取要的安全问题
  }, 
  methods :{
    //获取注册需要的数据
    getConfig() {
        this.$http.post('api/user/getUserField',{
            'type': 'register',
            'source':2
        }).then((response)=>{
            this.rConfig = response.data.data;
            this.isGetAll = true;
        }).catch((response)=>{
            // console.log(response);
            this.$createToast({
                txt: response ,
                type: 'txt'
            }).show()
        })
    },

    //ask_options 获取安全问题
    getQuestionz() {
        this.$http.post('api//user/userAsk').then(res=>{
            this.ask_options = res.data;
            this.getConfig()//获取注册时需要 收集哪些信息
        }).catch((response)=>{
            this.getConfig()//获取注册时需要 收集哪些信息
        })
    },
    
    //注册
    SignUp(){
        //判断是否为空或是否符合规则
        for (let i = 0; i <= this.rConfig.length - 1; i++) {
            if( !this.regData[this.rConfig[i].name] && this.rConfig[i].status == 'required' ){
                //检测是否为空
                this.$createToast({
                    txt: '请输入' + this.rConfig[i].title ,
                    type: 'txt'
                }).show()
                return
            }
        }
        if(this.surePwd == ''){
            this.$createToast({
                txt: '请输入确认密码!' ,
                type: 'txt'
            }).show()
            return
        }
        if(this.regData['user_pass'] != this.surePwd ){
            this.$createToast({
                txt: '输入的两次密码不相同!' ,
                type: 'txt'
            }).show()
            return
        }

        console.log(this.regData)
        this.$http.post('api/user/regster2',this.regData).then(res=>{
            console.log(res)
            this.$createToast({
                txt: res.data.msg,
                type: 'txt'
            }).show()
        }).then({
            
        })
    },


  }
}
</script>

<style scoped>
.SinginUp_box{
    width: 10rem;
    min-height: calc(100vh - 2.2rem);
    background-color: #fbfbfb;
    overflow: hidden;
    padding-bottom: 1rem;
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
    width: calc(100% - 2rem) ;
    background-color: #ffffff;
    height: 100%;
    font-size:.34rem;
    float: left;
    padding-left:.3rem; 
}
.item select{
    caret-color: red;
    width: calc(100% - 1rem) ;
    background-color: #ffffff;
    height: 100%;
    font-size:.3rem;
    float: left;
}
</style>
<style>
.item .cube-select{
    display: block;
    float: left;
    width: 9rem;
}
</style>