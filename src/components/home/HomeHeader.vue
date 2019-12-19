<template>
<div>
    <!-- 首页home的 通用头部 -->
    <div class="top" >
        <span class="title">{{msg}}</span>
        <i class="add_button" @click="show_tip()"></i>
        <cube-tip ref="tip" direction="top" style="right:.4rem;top:1.2rem;">
          <div @click="close_tip()">
            <router-link class="tip_item" to="/createRoom"><i><icon-svg icon-class="chuangjianv"/></i> 创建房间</router-link>
            <router-link class="tip_item" to="/recharge"> <i><icon-svg icon-class="48"/></i> 快速充值</router-link>
            <router-link class="tip_item" to="/HelpCenter"> <i><icon-svg icon-class="guize"/></i> 帮忙中心</router-link>
            <router-link class="tip_item" to="/sendRedPack"> <i><icon-svg icon-class="iconfontbangzhu"/></i> 发包记录</router-link>
          </div>
        </cube-tip>
    </div>
    <div class="mark" @click="close_tip()" v-if="show_mark"></div>

</div>
</template>

<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      show_mark:false,
      
    }
  },
  created() {
  },
  props:{
      msg: String
  },
  methods:{
    show_tip(){
        this.show_mark = true;
        this.$refs.tip.show();
    },
    close_tip(){
        this.show_mark = false;
        this.$refs.tip.hide();
    },
  },
}
</script>

<style scoped>
.top{
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  background-color: #fe4d57;
  text-align: center;
  font-weight: 600;
  font-size: .5rem;
  color: #fff;
  font-family: 'Microsoft YaHei';
  position: relative;
}
.add_button{
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  background-color: black;
  position: absolute;
  top:0;
  right:0;
  background:url(../../assets/img/common/icon_switch_shortcut.png) no-repeat;
  background-size: 50%;
  background-position: center;
}
.mark{
  background-color: rgba(0, 0, 0, 0.05);
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

.tip_item{
  display: block;
  height: .8rem;
  line-height: .8rem;
  /* padding: .5rem; */
  font-size: .4rem;
  margin: .2rem .4rem;
}

.tip_item i{
  font-size: .5rem;
  margin-right: .1rem;
}
</style>
<style>
.cube-tip{
  max-height: 20rem !important;
  padding: 0 !important;
  z-index: 1000 !important;
  background-color: #fff !important;
  box-shadow: 1px 1px 10px -1px #333 !important;
}
.cube-tip-angle::before {
  display:none !important;
}
.cubeic-close{
  display: none!important;
}
.cubeic-close::before{
  display:none!important;
}
</style>
