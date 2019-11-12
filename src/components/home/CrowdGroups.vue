<template>
<div>   
<!-- 群组  -->
        <!-- 头部 -->
        <HomeHeader :msg="msg"></HomeHeader>

<!-- 轮播图 -->
<cube-slide :options="options" :data="items"/>

<div>
<div class="tab-slide-container">
  <!-- 游戏标题 -->
  <cube-tab-bar v-model="selectedLabelDefault"
                :use-transition="false"
                ref="tabNav"
                :data="tabs"
                >
  </cube-tab-bar>
  <cube-slide :auto-play="false" :loop="false" :show-dots="false"
                @change="changePage" @scroll="scroll" ref="slide"
              :options="slideOptions" :initial-index="initialIndex" nest-mode="free" direction="horizontal">
      <cube-slide-item>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </cube-slide-item>
      <cube-slide-item>
        <div>2</div>
        <div>2</div>
        <div>2</div>
      </cube-slide-item>
      <cube-slide-item>
        <div>3</div>
        <div>3</div>
        <div>3</div>
      </cube-slide-item>
      <cube-slide-item>
        <div>4</div>
        <div>4</div>
        <div>4</div>
      </cube-slide-item>
  </cube-slide>
</div>


</div>



        

</div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader'
export default {
  name: 'CrowdGroups',
  components: { HomeHeader },
  data () {
    return {
      msg:'群组',
      items: [
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
        },
      ],
      selectedLabelDefault:"红包游戏",
      tabs: [
        {
          label: '红包游戏',
        },
        {
          label: '电子游戏',
        },
        {
          label: '棋牌游戏',
        },
        {
          label: '休闲游戏',
        },
      ],

      options: {
        stopPropagation:true,
      },
      slideOptions: {
        stopPropagation:true,
      },

    }
  },
  created() {
    
  },
  
  methods:{

    changePage(current) {
      // console.log(current)
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
    initialIndex() {
      let index = 0;
      index = this.findIndex(
        this.tabs,
        item => item.label === this.selectedLabelDefault
      );
      return index;
    }
  }
 
}
</script>



<style>
.cube-tab div {
  font-size: 0.4rem;
  margin-top: 0.1rem;
}
</style>

<style scoped>
</style>
