<template>
<!-- 房间返点 房间报表 -->
<div class="bg">
     <TopHeader :goHome='4'/>
     
    <div class="fudong">
      <cube-button class="time_class" @click="showDatePicker">{{begin_time}}</cube-button>
      <cube-button class="time_class" @click="showDatePicker_2">{{end_time}}</cube-button>
    </div>

     <div class="scroll-list-wrap" v-if="this.ReportData.length > 0">
        <cube-scroll  ref="scroll">
            <div class="room_card" v-for="(item,i) in ReportData" :key="i">

                  <div class="top_title" >
                      <div class="red_img_1" v-if="item.room_type == 1"></div>
                      <div class="red_img_2" v-if="item.room_type == 2"></div>
                      <div class="red_img_3" v-if="item.room_type == 3"></div>
                      <div class="red_img_4" v-if="item.room_type == 4"></div>
                      <div class="red_img_5" v-if="item.room_type == 5"></div>
                      <div class="title">{{item.room_type | type_name}}房间</div>
                  </div>

                <div class="body_l">
                    <div class="l_item">最小发包金额：</div><div class="item_r green">{{item.min_money ||  0}}</div>
                    <div class="l_item">最大发包金额：</div><div class="item_r green">{{item.max_money || 0}}</div>
                    <div class="l_item">总计发包金额：</div><div class="item_r green">{{item.all_money || 0}}</div>
                    <div class="l_item">总计发包数量：</div><div class="item_r green">{{item.amount || 0}}</div>
                    <div class="l_item">总计房间输赢：</div><div :class="item.wim_amt>=0?'item_r green':'red'">{{item.wim_amt || 0}}</div>
                    <div class="l_item">总计群主返点：</div><div class="item_r green">{{item.profit_money || 0}}</div>
                </div>
                <div class="body_r">
                    <div class="r_item"><span :class="item.is_open == 1 ? 'green' : 'red'">{{item.is_open | type_switch}}</span></div>
                </div>
            </div>

        <!-- 占位置 苹果手机有奇奇怪怪的问题 要不拉不到下面... -->
        <div class="nz_placeholder"></div>
        </cube-scroll>
    </div>

    <div v-if="no_data">
      <div class="no_room" @click="createRoom_btn()">
         还没有自己的房间哦！点击创建房间。
      </div>
      <!-- createRoom -->
    </div>

</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'
export default {
  name: 'HelpCenter',
  components: { TopHeader },
  data () {
    return {
        ReportData:'',//报表数据
        today:new Date(),
        begin_time:'',
        end_time:'',

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
    //去创建房间的按钮
      createRoom_btn(){
        this.$router.push('/createRoom')
      },
      //加载房间报表数据
     roomReportData(){
         this.$http.post('/api/chat/index/roomReport',{'begin_time':this.begin_time,'end_time':this.end_time}).then(res=>{
              if (res && res.data.list) {
                  this.ReportData = res.data.list
                  console.log(this.ReportData)
                  if(this.ReportData.length == 0){
                    this.no_data = true //没有数据来
                  }
              };
          })
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
     type_switch(v){
         if(v==1) return '开启';
         if(v==0) return '关闭';
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

.room_card{
    width: 9rem;
    /* height: 7rem; */
    border-radius: 5px;
    background-color: #fff;
    margin: .5rem auto;
    box-shadow: .2rem .2rem .8rem -.3rem #333;
    position: relative;
    overflow: hidden;
}
.title{
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    /* background-color: brown; */
    text-align: center;
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    font-size: .5rem;
    font-weight: bold;
}
.l_item{
    width: 60%;
    height: .6rem;
    line-height: .6rem;
    box-sizing: border-box;
    overflow: hidden;
    font-size: .4rem;
    text-align: right;
    /* background-color: aqua; */
    float: left;
}
.item_r{
    width: 40%;
    height: .6rem;
    line-height: .6rem;
    box-sizing: border-box;
    overflow: hidden;
    font-size: .4rem;
    text-align: left;
    /* background-color: aqua; */
    float: left;
}
.body_r{
    width: 1.6rem;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
    font-size: .5rem;
    font-weight: 1000;
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



.body_l{
  margin: .2rem 0;
  overflow: hidden;
}
.top_title{
    width: 100%;
    height: 3rem;
    /* position: absolute; */
    /* background-color: rgb(38, 58, 235); */
    overflow: hidden;
}
.red_img_1{
    margin: .2rem auto ;
    width: 2rem;
    height: 2rem;
    background: url(../assets/img/createRoom/saolei.png) no-repeat;
    background-size: 100% 100%;
}
.red_img_2{
    margin: .2rem auto ;
    width: 2rem;
    height: 2rem;
    background: url(../assets/img/createRoom/no-niu.png) no-repeat;
    background-size: 100% 100%;
}
.red_img_3{
    margin: .2rem auto ;
    width: 2rem;
    height: 2rem;
    background: url(../assets/img/createRoom/niuniu.png) no-repeat;
    background-size: 100% 100%;
}
.red_img_4{
    margin: .2rem auto ;
    width: 2rem;
    height: 2rem;
    background: url(../assets/img/createRoom/jinqiang.png) no-repeat;
    background-size: 100% 100%;
}
.red_img_5{
    margin: .2rem auto ;
    width: 2rem;
    height: 2rem;
    background: url(../assets/img/createRoom/jielong.png) no-repeat;
    background-size: 100% 100%;
}

</style>