<template>
<!-- 房间返点 房间报表 -->
<div>
<div class="bg">
     <TopHeader :goHome='4'/>
     
    <div class="fudong">
        <cube-button class="time_class" @click="showDatePicker">{{begin_time}}</cube-button>
        <cube-button class="time_class" @click="showDatePicker_2">{{end_time}}</cube-button>
    </div>
     <div class="scroll-list-wrap" v-if="this.ReportData.length > 0">
        <cube-scroll  ref="scroll" :options="options">
            

            <div class="room_card" v-for="(item,i) in ReportData" :key="i">
                <div class="top">
                    <div class="title">{{item.type | type_name}}</div>
                    <div class="room_money green" v-if="Number(item.win_amt) > 0">{{item.win_amt}}</div>
                    <div class="room_money" v-if="Number(item.win_amt) == 0">{{item.win_amt}}</div>
                    <div class="room_money red" v-if="Number(item.win_amt) < 0">{{item.win_amt}}</div>
                </div>
                <div class="mid">
                    <div class="l_item">发包金额：{{item.money ||  0}}</div>
                    <div class="l_item">发包数量：{{item.num ||  0}}</div>
                    <div class="l_item" v-if="item.is_group_user == true">群主返点：{{item.self_profit }}</div>
                    <div class="l_item" v-if="item.return_money > 0">退还金额：{{item.return_money }}</div>
                    <div class="l_item" v-if="item.type==1">{{item.thunder_in == 1 ? '连环雷':'单雷'}}</div>
                    <div class="l_item"><span :class="item.status == 1 ? 'green' : 'red'">{{item.status | type_status}}</span></div>
                </div>
                <div class="bottom">
                    <div class="bottom_l">{{item.created}}</div>
                    <!-- <div class="bottom_r">{{item.status | type_status}}</div> -->
                    <div class="bottom_r" @click="GrabBag_particulars(item)">详情</div>
                </div>
            </div>

        <!-- 占位置 苹果手机有奇奇怪怪的问题 要不拉不到下面... -->
        <div class="nz_placeholder"></div>
        </cube-scroll>
    </div>

    <div v-if="no_data">
      <div class="no_room">
         暂无记录，快去房间抢红包吧！
      </div>
    </div>

</div>
<!-- 抢包详情的组件 -->
    <transition name = "into">
    <div v-if="open_partivulars" class="red_world">
        <div class="red_world_top">
            <div class="red_world_goback" @click="open_partivulars = false" >
                <i class="get_back"></i>
            </div>
            <div class="red_world_title">
                抢包详情
            </div>
        </div>
        <div class="pad"></div><!-- 垫 -->
        <GrabBag :pack_info='pack_info' :begin_time='begin_time' :end_time='end_time'></GrabBag>
    </div>
    </transition>

</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'
import GrabBag from '@/views/GrabBag'
export default {
  name: 'HelpCenter',
  components: { TopHeader,GrabBag },
  data () {
    return {
        ReportData:'',//报表数据
        today:new Date(),
        begin_time:'',
        end_time:'',
        options:{
            click:true,
        },
        open_partivulars:false,

        no_data:false,
    }
  },
  created() {
      
      if(this.today.getMonth() == 0){
          this.begin_time = String(this.today.getFullYear()) + '-' + String(this.today.getMonth() +1 ) + '-' + String(this.today.getDate())
      }else{
          this.begin_time = String(this.today.getFullYear()) + '-' + String(this.today.getMonth()) + '-' + String(this.today.getDate())
      }
      this.end_time = String(this.today.getFullYear()) + '-' + String(this.today.getMonth() + 1) + '-' + String(this.today.getDate())
      this.roomReportData()
  },
  methods:{
      //加载房间报表数据
     roomReportData(){
         this.$http.post('/api/chat/index/sendRedPack',{'begin_time':this.begin_time,'end_time':this.end_time}).then(res=>{
             if(res && res.data.code ==0){
                 this.ReportData = res.data.list
                 if(this.ReportData.length == 0){
                     this.no_data = true
                 }
             }
          })
     },
     //抢包详情
     GrabBag_particulars(pack_info){
        this.pack_info = pack_info
        this.open_partivulars = true
     },
    //选择日期
     showDatePicker() {
      if (!this.datePicker_2) {
        this.datePicker_2 = this.$createDatePicker({
          title: '选择开始时间',
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          format: {
            year: 'YYYY',
            month: 'MM',
            date: 'DD'
          },
          onSelect: this.selectHandle,
        })
      }

      this.datePicker_2.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      this.begin_time = selectedText[0] + '-' + selectedText[1] + '-' + selectedText[2]
      this.roomReportData()
    },
    //选择日期end
    //选择日期
     showDatePicker_2() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '选择结束时间',
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          format: {
            year: 'YYYY',
            month: 'MM',
            date: 'DD'
          },
          onSelect: this.selectHandle_2,
        })
      }

      this.datePicker.show()
    },
    selectHandle_2(date, selectedVal, selectedText) {
      this.end_time = selectedText[0] + '-' + selectedText[1] + '-' + selectedText[2]
      this.roomReportData()
    },
    //选择日期end
  },

  filters:{
     type_name(v){
         if(v==1) return '扫雷';
         if(v==2) return '牛牛不翻倍';
         if(v==3) return '牛牛翻倍';
         if(v==4) return '禁枪';
         if(v==5) return '接龙';
     },
     type_status(v){
         if(v==0) return '未结算';
         if(v==1) return '已结算';
         if(v==2) return '无效';
     }
  }
 
}
</script>

<style scoped>
.bg{
    width: 100vw;
    height: 100vh;
    background-color: rgb(248, 248, 248);
}

.scroll-list-wrap{
  width: 100%;
  height: 100%;  
  background-color: #ededed;
  /* background-color: rgb(36, 129, 211); */
  overflow: hidden;
}
.mid{
    padding: .2rem 0;
}
.room_card{
    width: 9.6rem;
    /* height:4rem; */
    border-radius: 5px;
    background-color: #fff;
    margin: .5rem auto;
    box-shadow: .14rem .14rem .2rem -.3rem #333;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    padding: .2rem;
}
.top{
    width: 100%;
    height: 1rem;
    /* background-color: aqua; */
}
.title{
    width: 70%;
    height: 1rem;
    line-height: .6rem;
    /* background-color: brown; */
    float: left;
    box-sizing: border-box;
    padding: .2rem;
    overflow: hidden;
    font-size: .6rem;
    font-weight: bold;
    color: rgb(97, 97, 97);
}
.room_money{
    width: 30%;
    height: 1rem;
    line-height: .6rem;
    /* background-color: burlywood; */
    float: left;
    text-align:right;
    /* text-align:center; */
    box-sizing: border-box;
    padding: .2rem .3rem;
    overflow: hidden;
    font-weight: bold;
    font-size: .5rem;
}
.l_item{
    width: 100%;
    height: .6rem;
    line-height: .2rem;
    /* background-color: cadetblue; */
    box-sizing: border-box;
    padding: .2rem;
    overflow: hidden;
    /* font-weight: bold; */
    font-size: .4rem;

}
.bottom{
    width: 94%;
    height: 1rem;
    line-height: 1rem;
    font-size: .3rem;
    box-sizing: border-box;
    border-top:1px solid rgb(197, 197, 197);
    margin:auto;
}
.bottom_l{
    float: left;
}
.bottom_r{
    float: right;
}
.green{
    color: rgb(107, 207, 140);
    font-weight: bold;
}
.red{
    color: rgb(255, 0, 0);
    font-weight: bold;
}
.time_class{
    width: 50%;
    float: left;
    background-color: #ffffff;
    color: #333;
}




/* 红包详情动画 */
.into-enter-active, .into-leave-active {
    transition: all .3s ease;
}
.into-enter{
    transform: scale(0,0);
    opacity: 0;
}
.into-leave-to {
   transform: translate(100%,0%);
   opacity: 0;
}

.red_world{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0;
    z-index: 10000;
    background-color: rgb(172, 69, 69)
}
.red_world_top{
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: #fe4d57;
    font-weight: 600;
    font-size: .46rem;
    color: #fff;
    font-family: 'Microsoft YaHei';
    position: fixed;
    z-index: 99999;
    top: 0;
}
.red_world_goback{
    height: 1.2rem;
    width: 1.2rem;
    font-weight: 600;
    font-size: .7rem;
    background: url(../assets/img/ChatRoom/ic_arrow_back_white_24dp.png) no-repeat;
    background-size: 60%;
    background-position: center;
    position: absolute;
    top:0;
    left: 0;
}
.red_world_title{
    width: 100%;
    height: 1.2rem;
    font-size: .45rem;
    font-weight: 600;
    text-align: center
}

.fudong{
  overflow: hidden;
}
.no_room{
  width: 9rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  font-size: .44rem;
  margin: .5rem auto;
  border-radius: 5px;
  background-color: #333;
  box-shadow: 1px 1px 2px -1px #333;
  color: #ededed;
}
.no_room:active{
  background-color: rgb(24, 23, 23);
}

</style>