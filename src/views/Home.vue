<template>

<!-- 轮播图组件 -->
<div>
  <div class="tab-slide-container">
    <cube-slide :auto-play="false" :loop="false" :show-dots="false"
                 @change="changePage" @scroll="scroll" ref="slide"
                :options="slideOptions" :initial-index="initialIndex" nest-mode="free" direction="horizontal">
 

        <cube-slide-item>
              <Message-Groups></Message-Groups>
        </cube-slide-item>
        <cube-slide-item>
              <Crowd-Groups></Crowd-Groups>
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
      <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="item.label">
        <div :class="item.mark">
            <div class="item_icon"></div>
            <div class="item_label" v-if="item.label != '活动奖励'">{{item.label}}</div>
        </div>
        
      </cube-tab>

  </cube-tab-bar>

  <Notice></Notice>
</div>


</template>

<script>
import MessageGroups from '@/components/home/MessageGroups'        //消息组
import CrowdGroups from '@/components/home/CrowdGroups'            //群组
import ActivityReward  from '@/components/home/ActivityReward'    //活动奖励组
import AddressList  from '@/components/home/AddressList'          //通讯录
import PersonalCenter  from '@/components/home/PersonalCenter'          //我的(个人中心)

import Notice from '@/components/home/notice'                    //弹窗
export default {
  name: "home",
  components: {
    Notice,
    MessageGroups,
    CrowdGroups,
    ActivityReward,
    AddressList,
    PersonalCenter
  },
  data () {
    return {

      selectedLabelDefault: '群组',
      tabs: [{
        label: '消息',
        mark: 'msg',
        image:'../../assets/img/footer/ic_msg_nor.png'
      }, {
        label: '群组',
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
            left: true,
            right: true
          },
        },
    }
  },
  methods:{
    changeHandler(label) {
      // if you clicked different tab, this methods can be emitted
      // console.log(label);
    },
    //通过滑动slide组件 来改变 当前的标签头
    changePage(current) {
      // console.log(current)
      this.selectedLabelDefault = this.tabs[current].label;
    },
    clickHandler(item, index) {
      // console.log(item, index)
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

  animation:mymove .5s infinite;
	-webkit-animation:mymove .5s infinite; /*Safari and Chrome*/
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
  animation:mymove .5s infinite;
	-webkit-animation:mymove .5s infinite; /*Safari and Chrome*/
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
  animation:mymove .5s infinite;
	-webkit-animation:mymove .5s infinite; /*Safari and Chrome*/
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

</style>
