<template>

<div class="home">

  <!-- 第三方游戏iframe -->
  <transition name = "into">
    <div class="myframe" v-if="iframeopen == true">
      <transition name = "into">
      <div class="close_iframe" v-if='close_box'>
        <div class="close_title">是否确定退出此平台</div>
        <div class="close_footer">
            <div class="close_yes" @click="closeIframe_yes">确定</div>
            <div class="close_no" @click="close_box = false">取消</div>
        </div>
      </div>
      </transition>
        <iframe id="iframe" name="liveIframe" :src="iframeopenURL" frameborder="0" scrolling='auto'>
        </iframe>
        <iframe-btn @closeIframe="closeIframe"></iframe-btn>
    </div>
  </transition>

  <!-- 轮播图组件 -->
  <div class="tab-slide-container">
    <cube-slide :auto-play="false" :loop="false" :show-dots="false"
                 @change="changePage" @scroll="scroll" ref="slide"
                :options="slideOptions" :initial-index="initialIndex" nest-mode="free" direction="horizontal">
 

        <cube-slide-item>
              <Message-Groups :Red_data='Red_Room_list'></Message-Groups>
        </cube-slide-item>
        <cube-slide-item>
              <Crowd-Groups  :Red_data='Red_Room_list'></Crowd-Groups>
        </cube-slide-item>
        <cube-slide-item>
              <Activity-Reward></Activity-Reward> 
        </cube-slide-item>
        <cube-slide-item>
              <Address-List></Address-List>
        </cube-slide-item>
        <cube-slide-item>
             <Personal-Center></Personal-Center>
        </cube-slide-item>
    </cube-slide>
  </div>

  <!-- 这是首页的底部 -->
  <cube-tab-bar v-model="selectedLabelDefault"
                :use-transition="false"
                ref="tabNav"
                :data="tabs"
                class="footer">
  
      <!-- 插槽图标 -->
      <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index">
        <!-- <div v-if="item.mark == 'msg' && (Number(Msg_num) > 0)" class="msg_dian" >{{Msg_num}}</div> -->
        <div v-if="item.mark == 'msg' && (Number(Msg_num) > 0) && (Number(Msg_num) < 100)" class="msg_dian" >{{Msg_num}}</div>
        <div v-if="item.mark == 'msg' && (Number(Msg_num) >= 100)" class="msg_dian" >99..</div>
        <div v-if="item.mark == 'group' && Group_Msg_total > 0 && Group_Msg_total < 100" class="group_dian" >{{Group_Msg_total}}</div>
        <div v-if="item.mark == 'group' && Group_Msg_total >= 100 " class="group_dian" >99..</div>
        <div :class="item.mark">
            <div class="item_icon"></div>
            <div class="item_label" v-if="item.label != '活动奖励'">{{item.label}}</div>
        </div>
        
      </cube-tab>

  </cube-tab-bar>

  <Notice></Notice>
  <tc></tc>
</div>


</template>

<script>
import MessageGroups from '@/components/home/MessageGroups'        //消息组
import CrowdGroups from '@/components/home/CrowdGroups'            //游戏组
import ActivityReward  from '@/components/home/ActivityReward'    //活动奖励组
import AddressList  from '@/components/home/AddressList'          //通讯录
import PersonalCenter  from '@/components/home/PersonalCenter'          //我的(个人中心)

import Notice from '@/components/home/notice'                    //弹窗
import Tc from '@/components/common/tc'             //公告
import {mapActions,mapState} from 'vuex'

import iframeBtn from '@/components/iframeBtn/iframeBtn'
export default {
  name: "home",
  components: {
    Notice,
    MessageGroups,
    CrowdGroups,
    ActivityReward,
    AddressList,
    PersonalCenter,
    Tc,
    iframeBtn
  },
  data () {
    return {
      ws:{},
      selectedLabelDefault: '游戏组',
      tabs: [{
        label: '消息',
        mark: 'msg',
        image:'../../assets/img/footer/ic_msg_nor.png'
      }, {
        label: '游戏组',
        mark: 'group',
        image:'../../assets/img/footer/ic_msg_nor.png'
      }, {
        label: '活动奖励',
        mark: 'activity',
        image:'../../assets/img/footer/ic_msg_nor.png'
      }, {
        label: '通讯录',
        mark: 'phone',
        image:'../../assets/img/footer/ic_msg_nor.png'
      }, {
        label: '我的',
        mark: 'person',
        image:'../../assets/img/footer/ic_msg_nor.png'
      }],
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0,
        bounce: {
          top: true,
          bottom: true,
          left: false,
          right: false
        },
      },

      Red_Room_list:{},//红包房间列表
      Group_Msg_number:'', //

      timer:'',         //房间列表刷新

      close_box:false,//关闭ifame的盒子
    }
  },
  created() {
      this.getRoomList() //得到红包房间列表
      this.run_roomList_interval()//刷新房间倒计时
      if(this.$route.params.LowNumber == 0){  this.selectedLabelDefault = '消息' }
      if(this.$route.params.LowNumber == 1){  this.selectedLabelDefault = '游戏组' }
      if(this.$route.params.LowNumber == 2){  this.selectedLabelDefault = '活动奖励' }
      if(this.$route.params.LowNumber == 3){  this.selectedLabelDefault = '通讯录' }
      if(this.$route.params.LowNumber == 4){  this.selectedLabelDefault = '我的'; this.run_money_interval()}//刷新余额 
      // this.initWebSocket();
      this.$store.dispatch('Websocket_status','hall')
      this.statistics_Group_Msg_total()//清理统计人数
      
  },
  beforeUpdate() {
      clearInterval(this.timer);
      this.run_roomList_interval();
  },
  destroyed() {
      clearInterval(this.timer);
  },
  methods:{
  // 关闭iframe框
  closeIframe(){
    // this.$createDialog({
    //     type: 'confirm',
    //     title: '是否退出该平台',
    //     zIndex:1000000,
    //     confirmBtn: {
    //       text: '确定',
    //       active: true,
    //       disabled: false,
    //       href: 'javascript:;'
    //     },
    //     cancelBtn: {
    //       text: '取消',
    //       active: false,
    //       disabled: false,
    //       href: 'javascript:;'
    //     },
    //     onConfirm: () => {
    //       this.$store.dispatch('iframeopen', false)
    //       this.$store.dispatch('iframeopenURL', '')
    //     },
    // }).show()
    this.close_box = true;
  },
  closeIframe_yes(){
    this.close_box = false;
    this.$store.dispatch('iframeopen', false)
    this.$store.dispatch('iframeopenURL', '')
  },
  statistics_Group_Msg_total(){
    var total = 0
    for(var n in this.Group_Now_Message){
        total = total + Number(this.Group_Now_Message[n])
    }
    this.$store.dispatch('Group_Msg_total',total)
  },
  getRoomList(){
    if(window.sessionStorage.getItem('Red_Room_list')){
        this.Red_Room_list = JSON.parse(window.sessionStorage.getItem('Red_Room_list'))
    }else{
      this.upload_roomList()
    }
  }, 
  // 金币余额定时刷新器
  run_money_interval(){
      this.$http.post('api/users/balance').then(res=>{
        this.$store.dispatch('saveUserMoney', res.data.data.money)
      })
  },
  //刷新房间的定时器
  run_roomList_interval(){
    this.timer =  setInterval(()=>{
        this.upload_roomList()
    },10000)
  },
  //刷新房间列表的方法
  upload_roomList(){
    this.$http.post('/api/chat/index/roomList').then(res=>{
        if(res && res.data.code == 0 ){
          if(res.data.list.sys_room_list && res.data.list.sys_room_list.length > 0){
              res.data.list.sys_room_list.forEach(item => {
                  item.homePage = 1
                  item.room_form = 'sys_room_list'
              });
          }
          if(res.data.list.self_room_list && res.data.list.self_room_list.length > 0){
              res.data.list.self_room_list.forEach(item => {
                  item.homePage = 1
                  item.room_form = 'self_room_list'
              });
          }
          if(res.data.list.agent_room_list && res.data.list.agent_room_list.length > 0){
              res.data.list.agent_room_list.forEach(item => {
                  item.homePage = 1
                  item.room_form = 'agent_room_list'
              });
          }
          this.Red_Room_list = res.data.list
          this.$store.dispatch('Red_Room_list', this.Red_Room_list)
        }
      })
  },

    // 以下都是一些滑动效果的函数方法  

    //通过滑动slide组件 来改变 当前的标签头
    changePage(current) {
      this.selectedLabelDefault = this.tabs[current].label;
    },
    scroll(pos) {
      const x = Math.abs(pos.x);
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
      const deltaX = (x / slideScrollerWidth) * tabItemWidth;
      this.$refs.tabNav.setSliderTransform(deltaX);
    },
    //用来计算传入的 底部功能组 和 改变了 的选项 最后返回index号
    findIndex(ary, fn) {
      if (ary.findIndex) {
        return ary.findIndex(fn);
      }
      /* istanbul ignore next */
      let index = -1;
      /* istanbul ignore next */
      ary.some(function(item, i, ary) {
        const ret = fn.call(this, item, i, ary);
        if (ret) {
          index = i;
          return ret;
        }
      });
      /* istanbul ignore next */
      return index;
    }
  },

  //计算
  computed: {
    ...mapState([
      'Msg_num', //好友消息个数
      'Group_Msg_total', //群消息 个数
      'Group_Now_Message', //群消息
      'iframeopen',//开启第三方
      'iframeopenURL',//开启第三方/游戏url
    ]),
    initialIndex() {
      let index = 0;
      index = this.findIndex(
        this.tabs,
        item => item.label === this.selectedLabelDefault
      );
      return index;
    }
  }
};
</script>
<style>
.footer .cube-tab div {
  font-size: 0.3rem;
  color: rgb(102, 102, 102);
  margin-top: 0rem;
}
.footer .cube-tab{
  font-size: 0.3rem !important;
  color: rgb(102, 102, 102);
  margin: 0rem !important;
  padding: 0 !important;
  -webkit-box-flex: 0;
  -webkit-flex: 0;
  flex: 0;
}
.footer .cube-tab{
  font-size: 0.5rem;
}
.footer .cube-tab_active {
  color: rgb(255, 67, 67) !important;
}
</style>
<style scoped>
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 1.4rem;
}
/* TEST容器 */
.tab-slide-container {
  background-color: rgb(241, 241, 241);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1.4rem;
}


.msg_dian{
  text-align: center;
  min-width: .5rem;
  height: .5rem;
  line-height: .5rem;
  font-size: .3rem;
  position: absolute;
  left: 1rem;
  box-sizing: border-box;
  padding: 0 .14rem;
  border-radius:50px;
  top: .1rem;
  color: #fff !important;
  background-color: rgb(255, 82, 82);
}
.group_dian{
  text-align: center;
  min-width: .5rem;
  height: .5rem;
  line-height: .5rem;
  font-size: .3rem;
  position: absolute;
  left: 2.8rem;
  box-sizing: border-box;
  padding: 0 .14rem;
  border-radius:50px;
  top: .1rem;
  color: #fff !important;
  background-color: rgb(255, 82, 82);
}
</style>
<style>
/* 消息 */
.footer .msg{
  width: 1.8rem;
  height: 1.4rem;
  float: left;
  /* background-color: aqua; */
}
.footer .msg .item_icon{
  width: 1rem;
  height: 1rem;
  margin: 0 .4rem;
  background: url(../assets/img/footer/ic_msg_nor.png) no-repeat;
  background-size: 80%;
  background-position: center center;
}
.cube-tab_active .msg .item_icon{
  background: url(../assets/img/footer/ic_msg_sel.png) no-repeat !important ;
  background-size: 80% !important;
  background-position: center center !important;
  transition:all .5s;
}
.footer .msg .item_label{
  width: 1.8rem;
  height: .4rem;
  text-align: center;
  /* background-color: rgb(0, 238, 255); */
}

/* 群组 */
.footer .group{
  width: 1.8rem;
  height: 1.4rem;
  float: left;
  /* background-color: rgb(234, 255, 113); */
}
.footer .group .item_icon{
  width: 1rem;
  height: 1rem;
  margin: 0 .4rem;
  background: url(../assets/img/footer/ic_group_nor.png) no-repeat;
  background-size: 80%;
  background-position: center center;
}
.cube-tab_active .group .item_icon{
  background: url(../assets/img/footer/ic_group_sel.png) no-repeat !important ;
  background-size: 80% !important;
  background-position: center center !important;
  transition:all .5s;
}
.footer .group .item_label{
  width: 1.8rem;
  height: .4rem;
  text-align: center;
  /* background-color: rgb(0, 238, 255); */
}

/* 活动奖励 */
.footer .activity{
  width: 2.8rem;
  height: 1.4rem;
  float: left;
  /* background-color: rgb(245, 94, 94); */
  position: relative;
  top:0rem;
}
.footer .activity .item_icon{
  width: 2rem;
  height: 1.4rem;
  margin: 0 .4rem;
}
.cube-tab_active .activity .item_icon{
  width: 2rem;
  height: 1.4rem;
  margin: 0 .4rem;
  
}
/* 这是a图片的伪元素 第一个 */
.activity::before{
  content: "";   
  display: block;  
  width: 1.4rem;
  height: 1.4rem;
  position: absolute;
  top: -.3rem;
  left: -.1rem;
  background: url(../assets/img/footer/a.png) no-repeat;
  background-size: 60%;
  background-position: center center;
}
.cube-tab_active .activity::before{

  animation:mymove .3s infinite;
	-webkit-animation:mymove .3s infinite; /*Safari and Chrome*/
  animation-iteration-count:1;
  -webkit-animation-iteration-count:1; /*Safari and Chrome*/
}
/* 这是b图片  */
.activity .item_icon::before{
  content: "";   
  display: block;  
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: -.2rem;
  left: .5rem;
  background: url(../assets/img/footer/b.png) no-repeat;
  background-size: 60%;
  background-position: center center;
}
.cube-tab_active .activity .item_icon::before{
  animation:mymove .3s infinite;
	-webkit-animation:mymove .3s infinite; /*Safari and Chrome*/
  animation-iteration-count:1;
  -webkit-animation-iteration-count:1; /*Safari and Chrome*/
}
/* c图片 */
.activity .item_icon::after{
  content: "";   
  display: block;  
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  top: -.6rem;
  left: 1.2rem;
  background: url(../assets/img/footer/c.png) no-repeat;
  background-size: 60%;
  background-position: center center;
}
.cube-tab_active .activity .item_icon::after{
  animation:mymove .3s infinite;
	-webkit-animation:mymove .3s infinite; /*Safari and Chrome*/
  animation-iteration-count:1;
  -webkit-animation-iteration-count:1; /*Safari and Chrome*/
}
/* 这是在最上成的 活动奖励底片 */
.activity::after{
  content: "";   
  display: block;  
  width: 2.8rem;
  height: 1.4rem;
  position: absolute;
  top: 0rem;
  left: 0rem;
  background: url(../assets/img/footer/bg.png) no-repeat;
  background-size: 90%;
  background-position: center center;
}
@keyframes mymove
{
	0% {background-size: 60%;}
	50% {background-size: 90%;}
	100% {background-size: 60%;}
}
.footer .phone{
  width: 1.8rem;
  height: 1.4rem;
  float: left;
  /* background-color: rgb(88, 56, 204); */
}
.footer .phone .item_icon{
  width: 1rem;
  height: 1rem;
  margin: 0 .4rem;
  background: url(../assets/img/footer/ic_contact_nor.png) no-repeat;
  background-size: 80%;
  background-position: center center;
}
.cube-tab_active .phone .item_icon{
  background: url(../assets/img/footer/ic_contact_sel.png) no-repeat !important ;
  background-size: 80% !important;
  background-position: center center !important;
  transition:all .5s;
}
.footer .phone .item_label{
  width: 1.8rem;
  height: .4rem;
  text-align: center;
  /* background-color: rgb(0, 238, 255); */
}


.footer .person{
  width: 1.8rem;
  height: 1.4rem;
  float: left;
  /* background-color: rgb(152, 47, 161); */
}
.footer .person .item_icon{
  width: 1rem;
  height: 1rem;
  margin: 0 .4rem;
  background: url(../assets/img/footer/ic_me_nor.png) no-repeat;
  background-size: 80%;
  background-position: center center;
}
.cube-tab_active .person .item_icon{
  background: url(../assets/img/footer/ic_me_sel.png) no-repeat !important ;
  background-size: 80% !important;
  background-position: center center !important;
  transition:all .5s;
}
.footer .person .item_label{
  width: 1.8rem;
  height: .4rem;
  text-align: center;
  /* background-color: rgb(0, 238, 255); */
}





/* 第三方跳转 */
.myframe {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100000;
  background: #fff url('../assets/img/CrowdGroups/loading.gif') no-repeat center center;
}
.myframe iframe {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow: auto;
}


/* 关闭窗口 */
.close_iframe{
  width: 8rem;
  height: 4rem;
  background: rgb(230, 230, 230);
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  top: 60%; left: 30%;

  -webkit-transform: rotate(90deg) translate(-50%, 50%);
  -moz-transform: rotate(90deg) translate(-50%, 50%);
  -o-transform: rotate(90deg) translate(-50%, 50%);
  -ms-transform: rotate(90deg) translate(-50%, 50%);
  transform: rotate(90deg) translate(-50%, 50%);
}
.close_title{
  width: 8rem;
  height: 2.6rem;
  line-height: 2.6rem;
  text-align: center;
  font-size: .6rem;
}
.close_yes ,.close_no{
  width: 4rem;
  height: 1.4rem;
  line-height: 1.4rem;
  text-align: center;
  font-size: .5rem;
  float: left;
}
.close_yes{
  color: rgb(88, 169, 245)
}
.close_no{
  color: rgb(233, 105, 73)
}
.into-enter-active, .into-leave-active {
    transition: all .5s ease;
}
 .into-enter, .into-leave-to {
   transform: scale(0,0);
   opacity:0;
}

</style>
<style>
/* .cube-dialog{
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
} */
</style>