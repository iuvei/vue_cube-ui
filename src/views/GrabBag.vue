<template>
<!-- 抢包详情 -->
<div class="bg">

<div class="scroll-list-wrap">
        
    <cube-scroll  ref="scroll" :data="[]"  nest-mode="free" class="wrap">
        <div class="content">
            <div class="top"></div>


        <div class="top_title" v-if="this.ReportData">
            <div class="red_img_1" v-if="this.ReportData['0'].type == 1"></div>
            <div class="red_img_2" v-if="this.ReportData['0'].type == 2"></div>
            <div class="red_img_3" v-if="this.ReportData['0'].type == 3"></div>
            <div class="red_img_4" v-if="this.ReportData['0'].type == 4"></div>
            <div class="red_img_5" v-if="this.ReportData['0'].type == 5"></div>
            <div class="red_type">
                {{this.ReportData['0'].type | type_name}}
            </div>
            <div class="red_created">
                {{this.ReportData['0'].created }}
            </div>
        </div>

        <div class="body">
            <cube-scroll  ref="scroll_2" :data="[]" nest-mode="free">
                    <div  v-for="(item,i) in this.ReportData" :key="i" :class="item.is_self == true ? 'item_activation' : 'item'"> 
                        <div class="item_top">
                            <div class="item_img">
                                <img :src="item.avatar" alt=""  onerror="item.headimgurl = ''"  v-if="item.avatar != ''">
                                <img src="../assets/img/PersonalCenter/ic_user_avatar.png"  v-else>
                            </div>
                            <div class="item_l">
                                <div class="item_name">{{item.nickname}}</div>
                                <!-- <div class="item_time">{{item.created}}</div> -->
                            </div>
                            <div class="item_r">
                                <span :class="item.win_amt >=0 ? 'green':'red'">{{item.win_amt}}</span>
                            </div>
                            
                        </div>
                        <div class="item_bottom">
                            <div class="item_player">
                                <div class="item_number">{{item.money}}</div>
                                <div class="data_name">抢包金额</div>
                            </div>
                            <div class="item_commission">
                                <div class="item_number">{{item.multiple}}</div>
                                <div class="data_name">赔率</div>
                            </div>
                            <div class="item_settle">
                                <div class="item_font set_green" v-if="item.status == 1">已结算</div>
                                <div class="item_font set_yellow" v-if="item.status == 0">未结算</div>
                                <div class="item_font set_red" v-if="item.status == 2">失效</div>
                                <!-- <div class="data_name">结算</div> -->
                            </div>
                        </div>
                    </div>
                    <div class="nz_placeholder"></div>
            </cube-scroll>
        </div>

        </div>
    </cube-scroll>
</div>




</div>
</template>

<script>
export default {
  name: 'HelpCenter',
  data () {
    return {
        ReportData:'',//报表数据
    }
  },
  props:{
      'pack_info':Object,
      'begin_time':String,
      'end_time':String,
  },
  created() {
      this.roomReportData()
  },
  methods:{
      //加载房间报表数据
     roomReportData(){
         let data = {
             'pack_id':this.pack_info.id,
             'room_id':'',
             'begin_time':this.begin_time,
             'end_time':this.end_time,
         }
         this.$http.post('/api/chat/index/robRedPackDetail',data).then(res=>{
             if(res && res.data.code ==0 && res.data.list.length > 0){
                 this.ReportData = res.data.list
             }
          })
     },
   
  },

  filters:{
     type_name(v){
         if(v==1) return '扫雷';
         if(v==2) return '牛牛不翻倍';
         if(v==3) return '牛牛翻倍';
         if(v==4) return '禁枪';
         if(v==5) return '接龙';
     },
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
  height: calc(100vh - 1.2rem);
  overflow: hidden;
  background-color:aliceblue;
}

.content{
    height: calc(100vh - 1.2rem);
}
.top{
    width: 10rem;
    height: 5rem;
    /* background-color: #976467; */
    position: absolute;
    overflow: hidden;
}
.top::before{
    content: '';
    width: 30rem;
    height: 30rem;
    position: absolute;
    top: -200%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #fe4d57;
    border-radius: 50%;
    z-index: auto;
}
.top_title{
    width: 10rem;
    height: 4rem;
    position: absolute;
    z-index: 10000;
}
.body{
    position: relative;
    top: 4rem;
    width: 9rem;
    height: calc(100vh - 5.2rem);
    margin: auto;
    /* background-color: rgb(255, 255, 255); */
}

.item_activation{
    width: 100%;
    height: 3rem;
    margin-bottom: .5rem;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgb(67, 210, 230);
    box-shadow:  0 .1rem 1rem  -.6rem rgb(67, 210, 230);
}
.item{
    width: 100%;
    height: 3rem;
    margin-bottom: .5rem;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgb(255, 255, 255);
    box-shadow:  0 .1rem 1rem  -.6rem #333;
}
.item_top{
    width: 100%;
    height: 1.8rem;
    overflow: hidden;
}
.item_l{
    width:3.7rem;
    height: 1.8rem;
    float: left;
    /* background-color: #fe4d57; */
}
.item_r{
    width:3.6rem;
    height: 1.8rem;
    text-align: center;
    line-height: 1.8rem;
    float: left;
    /* background-color: #1536c5; */
    font-size: .46rem;
}
.item_img{
    width: 1.4rem;
    height: 1.4rem;
    margin: .2rem 0 .2rem .2rem;
    overflow: hidden;
    border-radius: 5px;
    float: left;
}
.item_img img{
    width: 100%;
    height: 100%;
}
.item_name{
    height: .9rem;
    line-height: .9rem;
    padding: .1rem;
    box-sizing: border-box;
    font-size: .3rem;
}
.item_time{
    height: .6rem;
    line-height: .6rem;
    box-sizing: border-box;
    padding: .1rem;
    font-size: .3rem;
}
.item_sex_nv{
    width: 1rem;
    height: 1rem;
    margin: .4rem 0;
    float: left;
    background: url(../assets/img/PersonalCenter/ic_female.png) no-repeat;
    background-size: 50%;
}
.item_sex_nan{
    width: 1rem;
    height: 1rem;
    margin: .4rem 0;
    float: left;
    background: url(../assets/img/PersonalCenter/ic_male.png) no-repeat;
    background-size: 50%;
}

.item_bottom{
    width: 100%;
    height: 1rem;
}
.item_player, .item_commission{
    width: 33.33%;
    height: 1.2rem;
    float: left;
    text-align: center;
}
.item_number{
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    font-size: .5rem;
}
.item_settle{
    width: 33.33%;
    height: 1.2rem;
    line-height: .8rem;
    font-size: .46rem;
    font-weight: bold;
    float: left;
    text-align: center;
}
.data_name{
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    font-size: .3rem;
    color: rgb(126, 126, 126);
}

.green{
    color: rgb(107, 207, 140);
    font-weight: bold;
}
.red{
    color: rgb(255, 0, 0);
    font-weight: bold;
}
.red_type{
    font-size: .46rem;
    font-weight: 600;
    text-align: center;
    color: #fcf971;
}
.red_created{
    font-size: .36rem;
    text-align: center;
    margin-top: .2rem;
    color: rgb(73, 73, 73);
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



.set_green{
    color: rgb(15, 133, 44);
    font-weight: bold;
}
.set_yellow{
    color: rgb(209, 200, 71);
    font-weight: bold;
}
.set_red{
    color: rgb(255, 86, 35);
    font-weight: bold;
}
</style>