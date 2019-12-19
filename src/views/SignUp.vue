<template>
<div class="box">
    <TopHeader/>

<div class="SinginUp_box" v-show="isGetAll"  >
    <div v-for="(item, i) in rConfig" :key="i" >
        <div class="item" v-if="item.name != 'ask'&& item.name != 'sex'&& item.name != 'key'">
            <i v-if='item.name=="user_name"'><icon-svg icon-class="yonghu1"/></i>
            <i v-if='item.name=="user_pass"'><icon-svg icon-class="lunkuodasan-"/></i>
            <i v-if='item.name=="qk_pass"'><icon-svg icon-class="zhifumima"/></i>
            <i v-if='item.name=="pay_name"'><icon-svg icon-class="zhenshixingming"/></i>
            <i v-if='item.name=="tel"'><icon-svg icon-class="phone"/></i>
            <i v-if='item.name=="email"'><icon-svg icon-class="youxiang1"/></i>
            <i v-if='item.name=="we_chat"'><icon-svg icon-class="weixin"/></i>
            <i v-if='item.name=="QQ"'><icon-svg icon-class="qq"/></i>
            <i v-if='item.name=="birthday"'><icon-svg icon-class="shengri"/></i>
            <i v-if='item.name=="province"'><icon-svg icon-class="suozaishengfen"/></i>
            <i v-if='item.name=="city"'><icon-svg icon-class="chengshi1"/></i>
            <i v-if='item.name=="address"'><icon-svg icon-class="cansaitubiaozhuanqu-"/></i>
            <i v-if='item.name=="answer"'><icon-svg icon-class="daan"/></i>
            <i v-if='item.name=="key"'><icon-svg icon-class="daan"/></i>
            <cube-input  :placeholder="'请输入'+ item.title + (item.status == 'required' ? ' （必填）' : '')" 
                    :type="item.name == 'user_pass'? 'password':'text'" 
                    v-model="regData[item.name]" 
                    autocomplete="off"
                    :eye="eye"
                    :clearable="clearable"
                     ></cube-input>
        </div>

        <div class="item" v-if='item.name=="key"'>
            <i><icon-svg icon-class="daan"/></i>
            <cube-input  :placeholder="'请输入'+ item.title + (item.status == 'required' ? ' （必填）' : '')" 
                        :type="item.name == 'user_pass'? 'password':'text'" 
                        v-model="regData[item.name]" 
                        :clearable="clearable"
                        :disabled='key_disabled'
                        ></cube-input>
        </div>

        <div class="item" v-if="item.name == 'ask'">
            <i><icon-svg icon-class="anquan" /></i>
            <cube-select  v-model="regData[item.name]" 
                          :options="ask_options"
                          placeholder="请选择安全问题">
            </cube-select>
        </div>
        <div class="item" v-if="item.name == 'sex'">
            <i>
                <icon-svg icon-class="xingbie"/>
            </i> 
            <cube-select v-model="regData[item.name]" 
                         :options="sex_options"
                         placeholder="请选择性别">
            </cube-select>
        </div>

        <div class="item" v-if="item.name == 'user_pass'" >
            <i><icon-svg icon-class="mima2"/></i>
            <cube-input type="password" placeholder="请确认密码 （必填）" :maxlength="item.max_len" v-model="surePwd"  :clearable="clearable" :eye="eye"></cube-input>
        </div>

    </div>
    <a class=" nz_button nz_bg_gradual_orange nz_color_white" @click="SignUp()"> 注册 </a> 
</div>     





</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'

export default {
  name: 'SignUp',
  components: { TopHeader },
  data () {
    return {
        isGetAll:false, //临时
        rConfig:'',    //请求回来 所需要填写的数据
        regData: {},   //填写好了的数据
        surePwd:'',    //再次确认密码

        sex_options:['男','女'],
        ask_options:'',//这是加载过来的安全问题的集合问题
        clearable: {  //cube插件的参数 控制清除input的
            visible: true,
            blurHidden: true
        },
        eye: {
            open: false,
            reverse: false
        },
        key_disabled:false, //推广码禁止编辑
    }
  },
  created(){
    //   this.getConfig()//获取注册时需要 收集哪些信息
      this.getQuestionz(); //获取要的安全问题
      this.getHrefDatas(); //获取头部的推广码
  }, 
  methods :{
    //获取注册需要的数据
    getConfig() {
        this.$http.post('api/user/getUserField',{
            'type': 'register',
        }).then((response)=>{
            this.rConfig = response.data.data;
            this.isGetAll = true;
        }).catch((response)=>{
            this.$createToast({
                txt: response ,
                type: 'txt'
            }).show()
        })
    },

    //ask_options 获取安全问题
    getQuestionz() {
        this.$http.post('api/user/userAsk').then(res=>{
            this.ask_options = res.data;
            this.getConfig()//获取注册时需要 收集哪些信息
        }).catch((response)=>{
            this.getConfig()//获取注册时需要 收集哪些信息
        })
    },

    //获取地址栏的参数（key或intr）
    getHrefDatas(data) {
        if(localStorage.getItem('key') && localStorage.getItem('key').length > 0){
             this.regData.key = localStorage.getItem('key') 
             this.key_disabled = true
        }
        if(localStorage.getItem('intr') && localStorage.getItem('intr').length > 0){
             this.regData.intr = localStorage.getItem('intr') 
        }
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

        //获取key或intr值
        // if (localStorage.getItem('key') || localStorage.getItem('intr')) {
        //     if (localStorage.getItem('key')) this.regData.key = localStorage.getItem('key');
        //     if (localStorage.getItem('intr')) this.regData.intr = localStorage.getItem('intr');
        // } else {
        //     this.getHrefDatas(this.regData);
        // }

        // return console.log(this.regData)
        this.$http.post('api/user/regster2',this.regData).then(res=>{
            this.$createToast({
                txt: res.data.msg,
                type: 'txt'
            }).show()
            if(res.data.code==0){

                setTimeout(()=>{
                    this.$router.push({name: 'SignIn', params:{name: this.regData["user_name"],pass:this.regData["user_pass"]}})
                },1000)
            }
            if(res.data.code==1){
                return;
            }
        })
    },


  }
}
</script>

<style scoped>
.box{
    position: absolute;
    top:0;
}
.SinginUp_box{
    width: 10rem;
    min-height: calc(100vh - 2.2rem);
    background-color: #fbfbfb;
    overflow: hidden;
    padding-bottom: 1rem;
}

.item{
    width: 100%;
    height: 1.4rem;
    background-color: #ffffff;
    margin: .1rem 0;
    position: relative;
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
    width: calc(100% - 2rem) ;
    background-color: #ffffff;
    height: 100%;
    font-size:.4rem;
    float: left;
}
.item select{
    caret-color: red;
    width: calc(100% - 3rem) ;
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
    height: 1.4rem;
    padding: .4rem .2rem;
    width: 8rem; 
    border: none;
}
.item .cube-select::after{
    border: none;
}
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
</style>