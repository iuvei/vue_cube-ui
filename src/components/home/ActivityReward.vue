<template>
<div>   
  <!-- 活动奖励  -->
  <!-- 头部 -->
  <HomeHeader :msg="msg"></HomeHeader>


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
    <div>测试纵向滚动24</div>
    <div>测试纵向滚动25</div>
    <div>测试纵向滚动26</div>
    <div>测试纵向滚动27</div>
    <div>测试纵向滚动28</div>
    <div>测试纵向滚动29</div>
    <div>测试纵向滚动30</div>
  </cube-scroll>
</div>





        

</div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader'
export default {
  name: 'ActvityReward',
  components: { HomeHeader },
  data () {
    return {
      msg:'奖励',
    }
  },
  created() {
    
  },
  
  methods:{
    
  },

 
}
</script>



<style scoped>

/* 容器的宽度 */
.scroll-list-wrap{
  width: 100%;
  height: calc(100vh - 2.6rem);  
  /* 内容高度 要减去 头顶1.2rem 底部1.4rem  */
  background-color: rgb(247, 247, 247)
}
</style>
