<template>
<div>   
<!-- 通讯录 -->
        <!-- 头部 -->
        <HomeHeader :msg="msg"></HomeHeader>


<!-- 滑动组件 -->
<!-- <div class="scroll-list-wrap">
    <cube-scroll
      ref="scroll"
      :data="tabs"
      >

      <cube-tab-panels v-model="selectedLabelDefault">
          <cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="item.label">
            <ul>
              <li class="tab-panel-li" v-for="(hero, index) in item.heroes">
                {{hero}}
              </li>
            </ul>
          </cube-tab-panel>
      </cube-tab-panels>

    </cube-scroll>
  </div> -->




        

</div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader'
export default {
  name: 'ActvityReward',
  components: { HomeHeader },
  data () {
    return {
      msg:'通讯录',
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
