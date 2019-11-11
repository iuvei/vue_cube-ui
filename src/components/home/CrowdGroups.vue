<template>
<div>   
<!-- 群组  -->
        <!-- 头部 -->
        <HomeHeader :msg="msg"></HomeHeader>

<!-- 轮播图 -->
<cube-slide :options="options" :data="items"/>

<!-- <div>
  <div class="tab-slide-container">
    <cube-slide :auto-play="false" :loop="false" :show-dots="false"
                 @change="changePage" @scroll="scroll" ref="slide"
                :options="slideOptions" :initial-index="initialIndex" nest-mode="free" direction="horizontal">
        <cube-slide-item>
          1
        </cube-slide-item>
        <cube-slide-item>
          2
        </cube-slide-item>
        <cube-slide-item>
          3
        </cube-slide-item>
        <cube-slide-item>
          4
        </cube-slide-item>
        <cube-slide-item>TEST4</cube-slide-item>
    </cube-slide>
  </div>

 -->


        

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

      options: {
        stopPropagation:true,
      },
      
    }
  },
  created() {
    
  },
  
  methods:{
    
  },

 
}
</script>



<style scoped>


</style>
