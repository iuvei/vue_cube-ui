<template>
<!-- 滚动的赛事公告窗口 -->
<div>

    
    <div class="mask" v-show="show_mask"  @click="show_false()"  :style=" 'background-color:'+ this.bg"></div>
    <div class="window" v-show="notice"  :style=" 'top:'+ this.top">
        <div class="window_top">
                <i class="close" @click="show_false()">❌</i>
                <span class="title">赛事公告</span>
        </div>
        <div class="window_body">
            <div v-for="(item,i) in Competition" :key="i" class="tc_content">
                {{i+1}}、{{item.content}}
            </div>
        </div>
    </div>



</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Notice',
  data () {
    return {
        show_mask:false,
        top:'', 
        bg:'',
        Competition:this.$store.state.WebData.Msg,
    }
  },
  created(){
  },
  mounted() {
      //开场用js的方式 让弹窗 从下往上 
      this.bg = 'rgba(0, 0, 0, 0);'
      this.top = '200%'
      setTimeout(()=>{
          this.top = '50%' ;
          this.bg = 'rgba(0, 0, 0, 0.2);'
      },5);
      
  },
  computed: {
    ...mapState([
      'notice',     //附加信息
    ]),
  },
  methods :{
        //从下往上本来可以用css3动画写   但是为了关闭时 可以从上往下走 就用了js
        show_false(){
            
            this.top = '200%'
            this.bg = 'rgba(0, 0, 0, 0);'
            setTimeout(()=>{
                this.$store.commit('ChangeNotice',false)
                this.show_mask = false;
            },300);
            //定时1秒后 动画走完就把他关掉  虽然过程繁琐了点  但是为了好看...
        }
  },
  watch: {
    'notice'(){
        if(this.notice == true){
            this.show_mask = true
            //开场用js的方式 让弹窗 从下往上 
            this.bg = 'rgba(0, 0, 0, 0);'
            this.top = '200%'
            setTimeout(()=>{
                this.top = '50%' ;
                this.bg = 'rgba(0, 0, 0, 0.2);'
            },30);
        }
    }  
  },
}
</script>

<style scoped>
.mask{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 888;
    transition: all .3s;
}
.window{
    width: 86%;
    min-height: 7rem;
    max-height: 10rem;
    background-color: #fff;
    border-radius: .3rem;
    overflow: hidden;
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 999;
    transition: all .6s;
}
.window_top{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color: rgb(255, 64, 89);
    overflow: hidden;
    text-align: center;
    font-size: .4rem;
}
.close{
    display: block;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
}
.title{
    color: #fff;
}
.window_body{
    width: calc(100% - .6rem);
    max-height: 7rem;
    padding: .3rem;
    font-size: .4rem;
    text-align: left;
    color: rgb(158, 158, 158);
    font-family: 'Microsoft YaHei';
    overflow: auto;
}
.tc_content{
    margin-bottom: .3rem;
}
</style>
