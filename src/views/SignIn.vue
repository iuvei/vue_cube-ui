<template>
<div>
     <TopHeader/>

<!-- <div class="demo">
<cube-scroll
    ref="scroll"
    :data="items1"
    direction="horizontal"
    class="outer-horizontal-scroll">
    <ul class="list-wrapper">
    <li v-for="item in items1" class="list-item">{{ item }}</li>
    <li class="list-item inner-horizontal-scroll">
        <cube-scroll
        ref="scroll"
        :data="items2"
        nestMode="free"
        direction="horizontal">
        <ul class="list-wrapper">
            <li v-for="item in items2" class="list-item">{{ item }}</li>
        </ul>
        </cube-scroll>
    </li>
    <li v-for="item in items1" class="list-item">{{ item }}</li>
    </ul>
</cube-scroll>
</div> -->



 <div slot="content" class="scroll-wrapper">
    <div class="demo">
    <cube-scroll
        ref="scroll"
        :data="items"
        direction="horizontal"
        class="horizontal-scroll-list-wrap">
        <ul class="list-wrapper">
        <li v-for="item in items" class="list-item">{{ item }}</li>
        </ul>
    </cube-scroll>
    </div>
</div>



     <div class="SinginUp_box">
        <div class="item">
            <i>🙎‍</i> <input  type="text" placeholder="请输入用户名" autocomplete="off" />
        </div>
        <div class="item">
            <i>🔒</i> <input  type="password" placeholder="请输入密码" autocomplete="off" />
        </div>

        <div class="forget">忘记密码？</div>

        <a class="nz_button nz_bg_gradual_orange nz_color_white" @click="SignIn()"> 登录 </a> 

    </div> 










        
</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'

const _data1 = [
  '👈🏻  outer 👉🏻 ',
  '🙂 🤔 😄 🤨 😐 🙃 '
]

const _data2 = [
  '👈🏻  inner 👉🏻  ',
  '🙂 🤔 😄 🤨 😐 🙃 ',
  '👈🏻  inner 👉🏻 ',
  '😔 😕 🙃 🤑 😲 ☹️ ',
  '👈🏻  inner 👉🏻 ',
  '🐣 🐣 🐣 🐣 🐣 🐣 ',
  '👈🏻  inner 👉🏻 ',
  '🐥 🐥 🐥 🐥 🐥 🐥 '
]

const _data = [
  '😀 😁 😂 🤣 😃 🙃 ',
  '👈🏻  scroll 👉🏻 ',
  '🙂 🤔 😄 🤨 😐 🙃 ',
  '👈🏻  scroll 👉🏻 ',
  '😔 😕 🙃 🤑 😲 ☹️ ',
  '👈🏻  scroll 👉🏻 ',
  '🐣 🐣 🐣 🐣 🐣 🐣 ',
  '👈🏻  scroll 👉🏻 ',
  '🐥 🐥 🐥 🐥 🐥 🐥 ',
  '👈🏻  scroll 👉🏻 ',
  '🤓 🤓 🤓 🤓 🤓 🤓 ',
  '👈🏻  scroll 👉🏻 ',
  '🦔 🦔 🦔 🦔 🦔 🦔 ',
  '👈🏻  scroll 👉🏻 ',
  '🙈 🙈 🙈 🙈 🙈 🙈 ',
  '👈🏻  scroll 👉🏻 ',
  '🚖 🚖 🚖 🚖 🚖 🚖 ',
  '👈🏻  scroll 👉🏻 ',
  '✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 '
]

export default {
  name: 'login',
  components: { TopHeader },
  data () {
    return {
        items1: _data1,
        items2: _data2,
        items: _data
    }
  },
  methods:{
      SignIn(){
          this.$router.push("/")
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
    width: calc(100% - 2rem) ;
    height: 100%;
    font-size: .5rem;
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
    /* background-color: #333; */
}





.scroll-wrapper{
    width: 10rem;
}

.horizontal-scroll-list-wrap{
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 5px;
}
.cube-scroll-content{
    display: inline-block;
}
.list-wrapper{
    padding: 0 10px;
    line-height: 60px;
    white-space: nowrap;
}
.list-item{
    display: inline-block;
}



   
</style>
