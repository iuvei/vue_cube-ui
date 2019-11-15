<template>
<div>
    <TopHeader/>

    <div class="SinginUp_box" v-show="isGetAll"  >
        <div class="item" v-for="item, index in rConfig">
            <i>📱</i><input  type="text" :placeholder="'请输入'+ item.title + (item.status == 'required' ? ' （必填）' : '')" autocomplete="off" />
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
        rConfig:'',
    }
  },
  created(){
      this.getConfig()//获取注册时需要 收集哪些信息
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
                console.log(this.rConfig)
            }).catch((response)=>{
                console.log(response);
            })
        },

        //注册
        SignUp(){
            
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
    width: calc(100% - 1rem) ;
    background-color: #ffffff;
    height: 100%;
    font-size:.3rem;
    float: left;
}
</style>
