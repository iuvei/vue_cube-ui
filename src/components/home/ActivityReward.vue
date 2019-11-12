<template>
<div>   
  <!-- 活动奖励  -->
  <!-- 头部 -->
  <HomeHeader :msg="msg"></HomeHeader>


<!-- <div class="scroll-list-wrap">
  <cube-scroll  ref="scroll" >
    <ul v-for="item in activity_list">
      <li class="activity_item">
          <div class="img_box">{{item.name}}</div>        
          <div class="text_box"><i> </i> {{item.name}}</div>        
      </li>
    </ul>
  </cube-scroll>
</div> -->

<div class="scroll-list-wrap">
  <cube-scroll  ref="scroll" >
    <ul v-for="item in activity_list">
      <li class="activity_item">
        <img :src="item.image">     
      </li>
    </ul>
  </cube-scroll>
</div>





        

</div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader'
const activity_list = [
  {
    name:"充值奖励",
    image:require("../../assets/img/ActivityReward/ic_recharge_reward.png")
   },
  {
    name:"发包满额奖励",
    image:require("../../assets/img/ActivityReward/ic_send_redpacket_reward.png")
   },
  {
    name:"抢包满额奖励",
    image:require("../../assets/img/ActivityReward/ic_grab_redpacket_reward.png")
   },
  {
    name:"直推佣金奖励",
    image:require("../../assets/img/ActivityReward/ic_water_commission_reward.png")
   },
  {
    name:"豹子顺子奖励",
    image:require("../../assets/img/ActivityReward/ic_straight_reward.png")
   },
  {
    name:"邀请好由完成充值奖励",
    image:require("../../assets/img/ActivityReward/ic_invite_friend_reward.png")
   },
]
export default {
  name: 'ActvityReward',
  components: { HomeHeader },
  data () {
    return {
      msg:'奖励',
      activity_list:activity_list
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
  background-color: rgb(242, 243, 253)
}




.activity_item{
  width: 9.6rem;
  margin: .2rem;
  height: 4rem;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  overflow: hidden;
}
.activity_item img{
  width: 100%;
  height: 100%;
}
.img_box{
  height: 2rem;
  line-height: 2rem;
  background-color: rgb(238, 238, 238);
  text-align: center;
  font-size: 1rem;
}
.text_box{
  height: 1rem;
  line-height: 1rem;
  background-color: #fff;
  font-size: .2rem;
  float: left;
}
.text_box i{
  display: block;
  float: left;
  margin: .4rem .2rem;
  width: .2rem;
  height: .2rem;
  border-radius: 50%;
  background-color: red;
}
</style>
