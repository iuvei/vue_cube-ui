<template>
<div><!-- 消息  -->

  <!-- 头部 -->
  <HomeHeader :msg="msg"></HomeHeader>
  <!-- 轮播图 -->
  <cube-slide  :options="options" class="slideshow" :data="items" nest-mode="free" direction="horizontal"/>

<div class="scroll-list-wrap">
  <cube-scroll  ref="scroll" >
    <div>测试纵向滚动1</div>
    <div>测试纵向滚动2</div>
    <div>测试纵向滚动3</div>
    <div>测试纵向滚动4</div>
    <div>测试纵向滚动5</div>
    <div>测试纵向滚动6</div>
    <div>测试纵向滚动7</div>
    <div>测试纵向滚动8</div>
    <div>测试纵向滚动9</div>
    <div>测试纵向滚动10</div>
    <div>测试纵向滚动11</div>
    <div>测试纵向滚动12</div>
    <div>测试纵向滚动13</div>
    <div>测试纵向滚动14</div>
    <div>测试纵向滚动15</div>
    <div>测试纵向滚动16</div>
    <div>测试纵向滚动17</div>
    <div>测试纵向滚动18</div>
    <div>测试纵向滚动19</div>
    <div>测试纵向滚动20</div>
    <div>测试纵向滚动21</div>
    <div>测试纵向滚动22</div>
    <div>测试纵向滚动23</div>
  </cube-scroll>
</div>

</div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader'
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
      
      options: {
        stopPropagation:true,
      }
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

</style>
