<template>
<div><!-- 消息  -->

  <!-- 头部 -->
  <HomeHeader :msg="msg"></HomeHeader>
  <!-- 轮播图 -->
  <cube-slide  :options="options" class="slideshow" :data="items" nest-mode="free" direction="horizontal"/>

<div class="scroll-list-wrap">                        
  <cube-scroll  ref="scroll"  :options="pull_down"  @pulling-down="onPullingDown">
    <ul>
        <li class="msg_item">
          <i></i>
          <div class="msg_box">
            <div class="title">在线客服</div>
            <div class="describe">有问题,找客服</div>
          </div>
        </li>
        <li class="msg_item">
          <i></i>
          <div class="msg_box">
            <div class="title">我的好友</div>
            <div class="describe">暂无未读消息</div>
          </div>
        </li>

        <li class="msg_item_wire" v-for="(item,i) in msg_list" :key=i>
          <i></i>
          <div class="msg_box">
            <div class="title">{{item.title}}</div>
            <div class="describe">{{item.describe}}</div>
          </div>
        </li>
    </ul>
    
  </cube-scroll>
</div>

</div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader'

const msg_list = [
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"长数据测试 长数据测试 长数据测试 长数据测试 长数据测试 长数据测试 长数据测试 ",
   "describe":"暂无未读消息 长数据测试 长数据测试 长数据测试 长数据测试 长数据测试 "
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
  {
   "title":"扫雷7包:2-20元 可发可抢 ( 赔率1.6 ) [模拟数据测试]",
   "describe":"暂无未读消息"
  },
]
export default {
  name: 'MessageGroups',
  components: { HomeHeader },
  data () {
    return {
      msg:'消息',
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
      // 轮播图scroll配置
      options: {
        stopPropagation:true,
      },
      //下拉菜单scroll配置
      pull_down:{
          pullDownRefresh:true,
      },

      msg_list:msg_list, //模拟数据
    }
  },
  created() {
  
  },
  
  methods:{
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
      console.log(label)

    },
    //通过滑动slide组件 来改变 当前的标签头
    changePage (current) {
      this.selectedLabelDefault = this.tabs[current].label
    },

    //下拉刷新获得新数据
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.$refs.scroll.forceUpdate()
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    
  }, 
}
</script>


<style scoped>

/* 轮播图 */
.slideshow{
  width: 100%;
  height: 3rem;
}
/* 容器的宽高 */
.scroll-list-wrap{
  width: 100%;
  height: calc(100vh - 5.6rem);  
  /* 内容高度 要减去 头顶1.2rem 底部1.4rem 和轮播图的3rem */
  background-color: rgb(248, 248, 248)
}


.msg_item{
  width:9.8rem;
  height:1.6rem;
  line-height: 1.6rem;
  /* background-color: cornflowerblue; */
  padding: .1rem;
}
/* 顶部有线的👇 */
.msg_item_wire{ 
  width:9.8rem;
  height:1.6rem;
  border-top: 1px solid rgb(240, 240, 240);
  line-height: 1.6rem;
  padding: .1rem;
}
.msg_item i,
.msg_item_wire i {
  display: block;
  float: left;
  width: 1.4rem;
  height: 1.4rem;
  background-color: pink;
  margin:.1rem .2rem;
  border-radius: 5px;
}

/* item标题和描述 */
.msg_box{
  float: left;
  width: 8rem;
  height: 1.4rem;
  margin:.1rem 0;
  /* background-color: yellow; */
}
.title{
  width:100%;
  height:.7rem;
  line-height:.7rem;
  /* background-color: brown; */
  font-size: .2rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.describe{
  width:100%;
  height:.7rem;
  line-height:.7rem;
  font-size: .2rem;
  color: rgb(179, 179, 179);
  /* background-color: rgba(42, 165, 134, 0.685); */
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}


</style>
