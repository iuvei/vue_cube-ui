<template>
<div class="bg">

<div :class="pack_info.data.pack_master.status != 0 && pack_info.data.pack_master.uid == this.MyUid && this.Now_RoomData.room_type != 5   ? 'top' : 'top_2'">
    <div class="avatar">
        <img src="../../assets/img/ChatRoom/ic_user_avatar.png" v-if="pack_info.user.avatar == 'null'|| !pack_info.user.avatar || pack_info.user.avatar=='' ">
        <img :src="pack_info.user.avatar" v-else>
    </div>
    <div class="nickname">
        {{pack_info.user.nickname}}
    </div>
    <div class="money_thunder" v-if="Now_RoomData.room_type == 1">
        {{pack_info.data.pack_master.money}} - [{{pack_info.data.pack_master.thunder}}]
    </div>
    <div class="money_thunder" v-if="Now_RoomData.room_type == 2||Now_RoomData.room_type == 3">
        {{pack_info.data.pack_master.money}} - {{pack_info.data.pack_master.num}}包
    </div>
    <div class="money_thunder" v-if="Now_RoomData.room_type == 4">
        {{pack_info.data.pack_master.money}} - {{pack_info.data.pack_master.num}}包 - [{{pack_info.data.pack_master.thunder}}]
    </div>

<!-- 扫雷 -->
<div class="settle" v-if="pack_info.data.pack_master.uid == this.MyUid && pack_info.data.pack_master.status == '1' && Now_RoomData.room_type == 1" >
    <div class="profit">输赢：
        <span :class="pack_info.data.pack_master.win_amt >= 0 ? 'green':'red'">
                    {{pack_info.data.pack_master.win_amt}}
        </span>
    </div>
    <div class="compensate">退还金额：{{pack_info.data.pack_master.return_money}}</div>
</div>
<!-- 牛牛 -->
<div class="settle" v-if="pack_info.data.pack_master.uid == this.MyUid && pack_info.data.pack_master.status == '1' &&  (Now_RoomData.room_type == 2 || Now_RoomData.room_type == 3)">
    <div class="profit_center">输赢：
        <span :class="pack_info.data.pack_master.win_amt >= 0 ? 'green':'red'">
                    {{pack_info.data.pack_master.win_amt}}
        </span>
    </div>
</div>
<!-- 禁枪 -->
<div class="settle" v-if="pack_info.data.pack_master.uid == this.MyUid && pack_info.data.pack_master.status == '1' &&  Now_RoomData.room_type == 4">
    <div v-if="pack_info.data.pack_master.thunder_type == 0">
        <div :class="pack_info.data.pack_master.win_amt >= 0 ? 'three':'two'">输赢：
            <span :class="pack_info.data.pack_master.win_amt >= 0 ? 'green':'red'">
                        {{pack_info.data.pack_master.win_amt}}
            </span>
        </div>
        <div :class="pack_info.data.pack_master.win_amt >= 0 ? 'three':'two'">中雷次数：{{pack_info.data.pack_master.thunder_in}}</div>
        <div class="three" v-if="pack_info.data.pack_master.win_amt >= 0">赔率：{{pack_info.data.pack_master.multiple}}</div>
    </div>
    <div v-if="pack_info.data.pack_master.thunder_type == 1">
        <div :class="pack_info.data.pack_master.win_amt >= 0 ? 'three':'two'">输赢：
            <span :class="pack_info.data.pack_master.win_amt >= 0 ? 'green':'red'">
                        {{pack_info.data.pack_master.win_amt}}
            </span>
        </div>
        <div :class="pack_info.data.pack_master.win_amt >= 0 ? 'three':'two'">{{pack_info.data.pack_master.thunder_num}} 中 {{pack_info.data.pack_master.thunder_in}}</div>
        <div class="three" v-if="pack_info.data.pack_master.win_amt >= 0">赔率：{{pack_info.data.pack_master.multiple}}</div>
    </div>
</div>

<!-- 接龙 -->
<div class="settle" v-if="pack_info.data.pack_master.uid == this.MyUid && pack_info.data.pack_master.status == '2' && this.Now_RoomData.room_type != 5">
    <div class="LoseEfficacy"><span class="red">红包无效</span> </div>
</div>






</div>
<div class="info" >
    已领取 <span v-if="pack_info.data.user_list">{{pack_info.data.user_list.length}}</span> <span v-else>0</span> /{{pack_info.data.pack_master.num}}个， 共{{money_sum.toFixed(2)}}/{{pack_info.data.pack_master.money}}金币
</div>
<div class="scroll-list-wrap">
  <cube-scroll ref="scroll" :data="[]" >
    <div>
        <div v-for="(item,i) in pack_info.data.user_list" :key="i">
            <div  class="item">
            <img src="../../assets/img/ChatRoom/ic_user_avatar.png" v-if="item.avatar == 'null'|| !item.avatar || item.avatar=='' ">
            <img :src="item.avatar" v-else>

            <div class="item_mid">
                <div class="item_name_box">
                    <div class="item_nickname">{{item.nickname}}</div>
                </div>
                <div class="item_time">{{item.updated}}</div>
            </div>
            <div class="bomb" v-if="item.win == 0 && Now_RoomData.room_type == 1"></div>
            <!-- <div class="bomb" v-if="item.win == 0 && Now_RoomData.room_type == 5 && pack_info.data.user_list && (pack_info.data.user_list.length==pack_info.data.pack_master.num)"></div> -->
            <div class="bomb" v-if="item.win == 0 && Now_RoomData.room_type == 4"></div>

            <!-- 扫雷红包 -->
            <div class="item_fot" v-if="Now_RoomData.room_type == 1">
                <div class="item_money" v-if="item.win == 0">{{item.money.substr(0,item.money.length-1)}}<span style="color:red;font-weight:bold">{{item.money.substr(item.money.length-1,1)}}</span></div>
                <div class="item_money" v-if="item.win == 1">{{item.money}}</div>
                <div class="item_optimum" v-if="item.max && pack_info.data.user_list.length == pack_info.data.pack_master.num"></div>
            </div>
            
            <!-- 牛牛红包 -->
            <div class="item_fot_niuniu" v-if="Now_RoomData.room_type == 2||Now_RoomData.room_type == 3">
                <div class="x_niuniu">
                     <img :src="require('../../assets/img/ChatRoom/ic_cow_'+item.point +'.png')" alt="">
                </div>
                <div class="item_money_niuniu">{{item.money}}</div>
                <div class="item_banker" v-if="(Now_RoomData.room_type == 2||Now_RoomData.room_type == 3) && item.banker==1"></div>
            </div>
            
            <!-- 禁抢红包 -->
            <div class="item_fot" v-if="Now_RoomData.room_type == 4">
                <!-- <div class="item_money">{{item.money}}</div> -->
                <div class="item_money" v-if="item.win == 0">{{item.money.substr(0,item.money.length-1)}}<span style="color:red;font-weight:bold">{{item.money.substr(item.money.length-1,1)}}</span></div>
                <div class="item_money" v-if="item.win == 1">{{item.money}}</div>

                <div class="item_optimum" v-if="item.max && pack_info.data.user_list && pack_info.data.user_list.length == pack_info.data.pack_master.num"></div>
            </div>
            <!-- 接龙红包 -->
            <div class="item_fot" v-if="Now_RoomData.room_type == 5">
                <div class="item_money">{{item.money}}</div>
                <!-- <div class="item_optimum" v-if="item.max && pack_info.data.user_list && pack_info.data.user_list.length == pack_info.data.pack_master.num"></div> -->
                <div class="item_loser" v-if="item.win == 0 && Now_RoomData.room_type == 5 && pack_info.data.user_list && (pack_info.data.user_list.length==pack_info.data.pack_master.num) && pack_info.data.pack_master.status == 1">下次发包者</div>
            </div>
        </div>


            <div class="personage" v-if="pack_info.data.pack && item.user_id==pack_info.data.pack.user_id && (Now_RoomData.room_type ==1 ||  ((Now_RoomData.room_type ==2 && item.banker !=1) ||  (Now_RoomData.room_type ==3 && item.banker !=1)) || Now_RoomData.room_type ==4)">
                <div class="profit">输赢： 
                    <span :class="pack_info.data.pack.win_amt >= 0 ? 'green':'red'">
                        {{pack_info.data.pack.win_amt}}
                    </span>
                </div>
                <div class="compensate" v-if="pack_info.data.pack.win_amt<0 && Now_RoomData.room_type == 1">赔付倍数：{{pack_info.data.pack.multiple}}</div>
                <div class="compensate" v-if="Now_RoomData.room_type == 2 || Now_RoomData.room_type == 3">赔付倍数：{{pack_info.data.pack.multiple}}</div>
            </div>
        </div>
        






        
        <!-- 占位置 苹果手机有奇奇怪怪的问题 要不拉不到下面... -->
        <div class="nz_placeholder"></div>
    </div>    
  </cube-scroll>
</div>
    

</div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
  name: 'RedParticulars',
  data () {
    return {
        Now_RoomData:'',//现在这个房间的数据
        money_sum:0.00 //已经拿了钱的总数 
    }
  },
  created() {
      console.log(this.pack_info)
    if(typeof this.RoomData != 'object'){
        this.Now_RoomData = JSON.parse(this.RoomData);
    }else{
        this.Now_RoomData = this.RoomData;
    }
    this.countMoney()//算抢到的钱的总数
    this.judge() //去判断是结算 还是 在房间点击详情
  },
  props:{
      'pack_info':Object
  },
  computed: {
    ...mapState([
      'RoomData',//房间数据
      'MyUid',
    ]),
  },
  methods:{
    //算钱
    countMoney(){
        // 因为禁抢红包不像其他红包可以抢 这个得等机器人抢 为了防止无法循环 先判断有没有机器人抢 
        if(this.pack_info.data.user_list){
                this.pack_info.data.user_list.forEach(e => {
                this.money_sum += Number(e.money)
            });
        }
    },
    judge(){
        //如果是结算 改变 Now_RoomData 现在房间的类型 要不他会因为你在别的房间而展示别的样式
        if(this.pack_info.action == 'settlement'){
            this.Now_RoomData.room_type = this.pack_info.data.pack_master.type
        }
    }
    
  },

  
 
}
</script>

<style scoped>
.bg{
    /* background-color: rgb(247, 251, 255); */
    width: 100%;
    height: calc(100vh - 1.2rem);
    z-index: 1;
    position: fixed;
    top: 1.2rem;
    background:rgb(247, 251, 255) url(../../assets/img/ChatRoom/ic_red_title.png) no-repeat;
    background-size: 100%;
}



.top{
    width: 100%;
    height: 5rem;
    background-size: 100%;
}
.top_2{
    width: 100%;
    height: 3rem;
    background-size: 100%;
}
.settle{
    width: 100%;
    height: 1.8rem;
    /* background-color: aquamarine; */
}
.avatar{
    width: 1.4rem;
    height: 1.4rem;
    margin: .4rem auto 0;
    border-radius: 3px;
    overflow: hidden;
}
.avatar img{
    width: 1.4rem;
    height: 1.4rem;
}
.nickname{
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    border-radius: 3px;
    overflow: hidden;
    margin: .2rem 0 0;
    font-size: .4rem;
    text-align: center;
}
.money_thunder{
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    border-radius: 3px;
    overflow: hidden;
    margin: .1rem 0;
    font-size: .34rem;
    font-weight: bold;
    text-align: center;
}
.info{
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    box-sizing: border-box;
    padding: 0 .2rem;
    font-size: .34rem;
    background-color: #fff;
}
.item{
    width: 100%;
    height: 1.8rem;
    background-color: #fff;
    margin-bottom: .05rem;
    box-sizing: border-box;
    padding: .2rem;
}
.item img{
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 3px;
    float: left;
}
.item_mid{
    width: 5rem;
    height: 1.4rem;
    float: left;
    box-sizing: border-box;
    padding: 0 .2rem
}
.item_name_box{
    width: 100%;
    height: .7rem;
    line-height: .7rem;
    font-size: .4rem;
    float: left;
    overflow: hidden;
}
.item_nickname{
    height: .7rem;
    line-height: .7rem;
    font-size: .4rem;
    float: left;
    padding-right:.1rem;
}
.item_banker{
    width: 1rem;
    height: .7rem;
    background:url(../../assets/img/ChatRoom/ic_cow_bank.png) no-repeat;
    background-size: 100% ;
    background-position: center center;
    float: right;
}
.item_loser{
    width: 2rem;
    height: .5rem;
    line-height: .5rem;
    font-size: .3rem;
    font-weight: bold;
    background-size: 100% ;
    background-position: center center;
    float: right;
    color: red
}
.item_time{
    width: 4rem;
    height: .7rem;
    line-height: .7rem;
    font-size: .3rem;
    color: rgb(134, 134, 134);
}
.item_fot{
    width: 2rem;
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: .44rem;
    font-weight: bold;
    text-align: right;
    float: right;
}
.item_fot_niuniu{
    width: 3rem;
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: .44rem;
    font-weight: bold;
    text-align: right;
    float: right;
}
.bomb{
    width: 1rem;
    height: 1rem;
    margin: .2rem 0;
    float: left;
    background: url(../../assets/img/ChatRoom/ic_bomb.png) no-repeat;
    background-size: 70%;
    background-position: center center;
}
.item_money{
    width: 2rem;
    height: .9rem;
    line-height: .9rem;
    font-size: .44rem;
    font-weight: bold;
    text-align: right;
}
.item_money_niuniu{
    width: 2rem;
    height: .7rem;
    line-height: .7rem;
    font-size: .44rem;
    font-weight: bold;
    text-align: right;
    float: right;
}
.x_niuniu{
    width: .7rem;
    height: .7rem;
    line-height: .9rem;
    font-size: .44rem;
    float: right;
}
.x_niuniu img{
    width: .5rem;
    height: .5rem;
    margin: .1rem;
}
.item_optimum{
    width: 2rem;
    height: .5rem;
    line-height: .5rem;
    font-size: .44rem;
    font-weight: bold;
    float:right;
    text-align: right;
    background: url(../../assets/img/ChatRoom/ic_king.png) no-repeat;
    background-size: 100%;
}

.scroll-list-wrap{
  height: calc(100vh - 1.2rem - 3rem - .8rem);
  background-color:rgb(243, 243, 243);
}
.personage{
    width: 100%;
    height: 1.8rem;
    background-color: rgb(255, 255, 255);
    border-radius: 0px 0px 10px 10px;
    overflow: hidden;
}
.profit{
    width: 50%;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: .46rem;
    float: left;
}
.compensate{
    width: 50%;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: .46rem;
    float: left;
}
.green{
    color:rgb(113, 197, 124)
}
.red{
    color:rgb(248, 88, 88)
}
.LoseEfficacy{
    line-height: 1.8rem;
    text-align: center;
    font-size: .8rem;
    font-weight: bold;
}
.profit_center{
    width: 100%;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: .46rem;
}
.TheRay{
    width: 50%;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: .46rem;
    float: left;
}
.three{
    width: 33.33%;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: .46rem;
    float: left;
}
.two{
    width: 50%;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: .46rem;
    float: left;
}
</style>