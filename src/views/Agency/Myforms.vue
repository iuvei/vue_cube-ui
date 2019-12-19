<template>
<div class="Myforms_bg">
     <TopHeader/>

     <div class="fudong">
        <cube-button class="time_class" @click="showDatePicker">
            <div class="time_begin_img"></div>
            <div class="time_box">
                <div class="time_title green">开始时间</div>
                <div class="time">{{begin_time}}</div>
            </div>
        </cube-button>

        <cube-button class="time_class" @click="showDatePicker_2">
            <div class="time_end_img"></div>
            <div class="time_box">
                <div class="time_title red">结束时间</div>
                <div class="time">{{end_time}}</div>
            </div>
        </cube-button>
    </div>



    <!-- 玩家活跃 -->
    <div class="Big_item">
        <div class="Big_item_title">玩家活跃度</div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/xzcrs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.today_regist_num || 0}}</div>
                <div class="item_title">今日注册</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/zzcrs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.user_vaild_num || 0}}</div>
                <div class="item_title">有效会员</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/zzcrs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.user_num}}</div>
                <div class="item_title">下级人数</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/ecbs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.all_balance}}</div>
                <div class="item_title">下级余额</div>
            </div>
        </div>
    </div>

    <!-- 充值 -->
    <div class="Big_item">
        <div class="Big_item_title">充值/提现</div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/jrsc.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.today_regist_deposit || 0}}</div>
                <div class="item_title">今日首充</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/jrsc.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.today_regist_deposit_sconds || 0}}</div>
                <div class="item_title">今日二充</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/jccs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.today_doposit_times || 0}}</div>
                <div class="item_title">存款次数</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/ckzs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.today_doposit_send || 0}}</div>
                <div class="item_title">存款赠送</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/jccs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.today_take_times || 0}}</div>
                <div class="item_title">取款次数</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/jqqd.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.today_doposit_send || 0}}</div>
                <div class="item_title">敬请期待</div>
            </div>
        </div>
    </div>


    <!-- 发包抢包 -->
    <div class="Big_item">
        <div class="Big_item_title">发包与抢包</div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/fbrs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.send_redpack_money || 0}}</div>
                <div class="item_title">发包金额</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/qbrs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.rob_redpack_money || 0}}</div>
                <div class="item_title">抢包金额</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/fbrs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.send_redpack_num|| 0}}</div>
                <div class="item_title">发包数量</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/qbrs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.rob_redpack_num || 0}}</div>
                <div class="item_title">抢包数量</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/qbgs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.send_redpack_member || 0}}</div>
                <div class="item_title">发包人数</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/fbgs.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.rob_redpacrob_redpack_memberk_num || 0}}</div>
                <div class="item_title">抢包人数</div>
            </div>
        </div>
    </div>

    <!-- 发包抢包 -->
    <div class="Big_item">
        <div class="Big_item_title">棋牌</div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/tzje.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.live_bet || 0}}</div>
                <div class="item_title">投注金额</div>
            </div>
        </div>
        <div class="item">
            <div class="item_img">
                <img src="../../assets/img/agencyHub/czze.png" alt="">
            </div>
            <div class="item_box">
                <div class="item_data green">{{dataList.today_user_back_amt || 0}}</div>
                <div class="item_title">返水金额</div>
            </div>
        </div>
    </div>


</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'

export default {
  name: 'Myforms',
  components: { TopHeader },
  data () {
    return {
        today:new Date(),
        begin_time:"",//开始时间,
        end_time:"",//结束时间,

        dataList:'', //数据列表
    }
  },
  created() {
      if(this.today.getMonth() == 0){
          this.begin_time = String(this.today.getFullYear()) + '-' + String(this.today.getMonth() +1 ) + '-' + String(this.today.getDate())
      }else{
          this.begin_time = String(this.today.getFullYear()) + '-' + String(this.today.getMonth()) + '-' + String(this.today.getDate())
      }
      this.end_time = String(this.today.getFullYear()) + '-' + String(this.today.getMonth() + 1) + '-' + String(this.today.getDate())
      this.getList();
  },
  methods:{
      getList(){
          let data = {
              'begin_time':this.begin_time,
              'end_time':this.end_time,
              'agent_id':'',
          }
          this.$http.post('api/chat/index/agentsReport',data).then(res=>{
              console.log(res)
              if(res && res.data.list){
                  this.dataList = res.data.list[0]
              }
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
      this.getList()
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
      this.getList()
    },
    //选择日期end
     
  }
 
}
</script>

<style scoped>
.Myforms_bg{
    width: 100vw;
    height: 100vh;
    background-color: rgb(248, 248, 248);
}


.time_class{
    width: 5rem;
    float: left;
    background-color: #ffffff;
    color: #333;
}
.time_begin_img, .time_end_img{
    width: 2rem;
    height: 2rem;
    background-color: aqua;
    float: left;
}
.time_begin_img{
    background:url(../../assets/img/agencyHub/begin_time.png) no-repeat;
    background-size: 80%;
    background-position: center;
}
.time_end_img{
    background:url(../../assets/img/agencyHub/end_time.png) no-repeat;
    background-size: 80%;
    background-position: center;
}
.time_box{
    width: 3rem;
    height: 2rem;
    float: left;
}
.time_title{
    width: 3rem;
    height: .6rem;
    margin-top:.4rem;
}
.time{
    font-size: .4rem;
}




.Big_item{
    width: 9.6rem;
    margin: .4rem auto;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow:.1rem .1rem .3rem -.3rem #333;
    overflow: hidden;
}
.Big_item_title{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    box-sizing: border-box;
    padding: 0 .3rem;
    /* background-color: aqua; */
    border-bottom: 1px solid rgb(226, 226, 226);
    font-size: .4rem;
    font-weight: bold;
    color: rgb(90, 90, 90);
}
.item{
    width: 4.8rem;
    height: 2rem;
    /* background-color: pink; */
    box-sizing: border-box;
    float: left;
}
.item_img{
    width: 1.2rem;
    height: 1.2rem;
    margin: .4rem 0 .4rem .4rem;
    float: left;
}
.item_img img{
    width: 100%;
}
.item_box{
    width:3.2rem;
    height: 2rem;
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
}
.item_data{
    width: 100%;
    min-height: .5rem;
    margin: .5rem 0 0;
    font-size: .4rem;
    font-weight: bold;
    text-align: center;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
}
.item_title{
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    font-size: .44rem;
    font-weight: bold;
    text-align: center;
    color: rgb(70, 70, 70);
    
}


.green{
    color: rgb(110, 202, 98);
    font-weight: bold;
}
.red{
    color: rgb(238, 77, 56);
    font-weight: bold;
}
.orange{
    color: rgb(238, 153, 56);
    font-weight: bold;
}
.fudong{
  overflow: hidden;
}
</style>
<style>
.Myforms_bg .cube-btn{
    padding: 0;
}
    
</style>