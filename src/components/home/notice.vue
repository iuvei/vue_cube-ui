<template>
<!-- 平台公告 -->
<div>

    
    <div class="mask" v-show="show_mask"  @click="show_false()"></div>
    <div class="window" v-show="show_window"  :style=" 'top:'+ this.top">
        <div class="window_top">
                <i class="close" @click="show_false()">❌</i>
                <span class="title">平台公告</span>
        </div>
        <div class="window_body">
            各位玩家:大家好!为了保障会员的基本权益,并且更有效的管理用户信息,平台规定如审核发现两个以上用户信息相同时,系统将自动判定其属于重复开户,并取消其享受优惠及参与游戏的资格,希望大家能理解
        </div>
    </div>



</div>
</template>

<script>
export default {
  name: 'Notice',
  data () {
    return {
        show_mask:true,
        // show:false,
        show_window:true,
        top:'',
    }
  },
  created(){
  },
  mounted() {
      //开场用js的方式 让弹窗 从下往上 
      this.top = '200%'
      setTimeout(()=>{
          this.top = '50%' ;
      },50);
      
  },
  methods :{

      //从下往上本来可以用css3动画写   但是为了关闭时 可以从上往下走 就用了js
     show_false(){
         this.show_mask = false;
         this.top = '200%'
            setTimeout(()=>{
                this.show_window = false;
            },1000);
            //定时1秒后 动画走完就把他关掉  虽然过程繁琐了点  但是为了好看...
     }
  }
 
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
    transition: all 1s;
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
</style>
