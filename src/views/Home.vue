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
        <cube-slide-item>TEST4</cube-slide-item>
    </cube-slide>
  </div>

  <!-- 这是首页的底部 -->
  <cube-tab-bar v-model="selectedLabelDefault"
                :use-transition="false"
                ref="tabNav"
                :data="tabs"
                class="footer">
  </cube-tab-bar>

  <notice></notice>
</div>


</template>

<script>
import MessageGroups from '@/components/home/MessageGroups'        //消息组
import CrowdGroups from '@/components/home/CrowdGroups'            //群组
import ActivityReward  from '@/components/home/ActivityReward'    //活动奖励组
import AddressList  from '@/components/home/AddressList'          //通讯录

import notice from '@/components/home/notice'                    //弹窗
export default {
  name: "home",
  components: {
    notice,
    MessageGroups,
    CrowdGroups,
    ActivityReward,
    AddressList
  },
  data () {
    return {

      selectedLabelDefault: '群组',
      tabs: [{
        label: '消息',
        icon: 'cubeic-message',
      }, {
        label: '群组',
        icon: 'cubeic-like',
      }, {
        label: '活动奖励',
        icon: 'cubeic-vip',
      }, {
        label: '通讯录',
        icon: 'cubeic-phone',
      }, {
        label: '我的',
        icon: 'cubeic-person',
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
            }
        },
    }
  },

  methods:{
    changeHandler(label) {
      // if you clicked different tab, this methods can be emitted
      console.log(label);
    },
    //通过滑动slide组件 来改变 当前的标签头
    changePage(current) {
      // console.log(current)
      this.selectedLabelDefault = this.tabs[current].label;
    },
    clickHandler(item, index) {
      console.log(item, index)
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
.cube-tab div {
  font-size: 0.3rem;
  color: rgb(102, 102, 102);
  margin-top: 0.1rem;
}
.cube-tab{
  font-size: 0.5rem;
}
.cube-tab_active {
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
