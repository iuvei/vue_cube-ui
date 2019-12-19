<template>
<div class="bg">
    

    <!-- 扫雷红包 房间类型是1 room_type = 1 -->
    <div v-if="Now_RoomData.room_type == 1 ">
        <!-- <div class="sl_top_box">{{hb_money =='' ? 0 : hb_money}}</div> -->
        <div class="sl_body_input">
            <div class="sl_body_input_before">金额</div>
            <div class="sl_body_input_after">元</div>
            <cube-input type="number" :placeholder="Now_RoomData.min_money + ' - ' + Now_RoomData.max_money" class="sl_cube_input" v-model="hb_money" ></cube-input>
        </div>
        <div class="sl_body_input">
            <div class="sl_body_input_before">红包个数</div>
            <div class="sl_body_input_after">个</div>
            <cube-input type="number" :placeholder="Now_RoomData.min_num + ' - ' + Now_RoomData.max_num" class="sl_cube_input" v-model="hb_number"></cube-input>
        </div>
        <div class="sl_body_remark">红包个数范围：{{Now_RoomData.min_num}}-{{Now_RoomData.max_num}}</div>
        <div class="sl_body_input">
            <div class="sl_body_input_before">雷数</div>
            <cube-input placeholder="请输入雷数" class="sl_cube_input" :type="'number'"  :maxlength="1" v-model="hb_thunder"></cube-input>
        </div>
        <div class="sl_body_remark">雷数范围:0-9</div>
        <div class="sl_sumbit" @click="sumbit(1)">塞入进红包</div>
        <div class="sl_sumbit_remark">未领取的红包,将于5分钟后发起退款</div>
    </div>

    <!-- 牛牛不翻倍 房间类型是3 room_type = 2 -->
    <div v-if="Now_RoomData.room_type == 2">
        <!-- <div class="sl_top_box">{{hb_money =='' ? 0 : hb_money}}</div> -->
        <div class="sl_body_input">
            <div class="sl_body_input_before">金额</div>
            <div class="sl_body_input_after">元</div>
            <cube-input type="number" :placeholder="Now_RoomData.min_money + ' - ' + Now_RoomData.max_money" class="sl_cube_input" v-model="hb_money" ></cube-input>
        </div>
        <div class="sl_body_input">
            <div class="sl_body_input_before">牛牛红包个数</div>
            <div class="sl_body_input_after">个</div>
            <cube-input type="number" :placeholder="Now_RoomData.min_num + ' - ' + Now_RoomData.max_num" class="sl_cube_input" v-model="hb_number"></cube-input>
        </div>
        <div class="sl_sumbit" @click="sumbit(2)">塞入进红包</div>
        <div class="sl_sumbit_remark">未领取的红包,将于30秒后发起退款</div>
    </div>

    <!-- 牛牛翻倍 房间类型是3 room_type = 3 -->
    <div v-if="Now_RoomData.room_type == 3 ">
        <!-- <div class="sl_top_box">{{hb_money =='' ? 0 : hb_money}}</div> -->
        <div class="sl_body_input">
            <div class="sl_body_input_before">金额</div>
            <div class="sl_body_input_after">元</div>
            <cube-input type="number" :placeholder="Now_RoomData.min_money + ' - ' + Now_RoomData.max_money" class="sl_cube_input" v-model="hb_money" ></cube-input>
        </div>
        <div class="sl_body_input">
            <div class="sl_body_input_before">牛牛红包个数</div>
            <div class="sl_body_input_after">个</div>
            <cube-input type="number" :placeholder="Now_RoomData.min_num + ' - ' + Now_RoomData.max_num" class="sl_cube_input" v-model="hb_number"></cube-input>
        </div>
        <div class="sl_sumbit" @click="sumbit(3)">塞入进红包</div>
        <div class="sl_sumbit_remark">未领取的红包,将于30秒后发起退款</div>
    </div>

    <!-- 禁抢 房间类型是4 room_type = 4 -->
    <div v-if="Now_RoomData.room_type == 4 ">
        <div class="jq_top_box">
            <div class="jq_top_before">金额</div>
            <cube-input type="number" :placeholder="Now_RoomData.min_money + ' - ' + Now_RoomData.max_money" class="jq_top_input" v-model="hb_money" ></cube-input>
            <div class="jq_top_after">元</div>
        </div>
        <div class="jq_mid_box">
            <div class="jq_mid_before">红包个数</div>
                <div class="jq_bag" @click="select_bag_number(item)" :class="select_bag == item ? 'jq_bag_active':''"  v-for="(item, i) in [5,6,7,9,10]" :key="i">{{item}}</div>
            <div class="jq_mid_after">包</div>
        </div>
        <div class="jq_fot_box">
            <div class="jq_fot_top">
                <div class="jq_fot_t">
                    <div class="jq_fot_l"> 雷 号 </div>
                    <div class="jq_fot_r">
                        <div class="jq_ball" @click="select_ball_number(item)" :class="(select_ball && select_ball.indexOf(item) != '-1') ? 'jq_ball_active':''"  v-for="(item, i) in [1,2,3,4,5,6,7,8,9,0]" :key="i">{{item}}</div>
                   </div>
                </div>
                <!-- <div class="jq_fot_b">{{hb_money =='' ? 0 : hb_money}}</div> -->
            </div>
            <div class="jq_fot_fot">
                <div class="jq_fot_btn" @click="sumbit(4)"></div>
            </div>
        </div>
    </div>

    <!-- 接龙翻倍 房间类型是3 room_type = 5 -->
    <div v-if="Now_RoomData.room_type == 5 ">
        <!-- <div class="sl_top_box">{{hb_money =='' ? 0 : hb_money}}</div> -->
        <div class="sl_body_input">
            <div class="sl_body_input_before">金额</div>
            <div class="sl_body_input_after">元</div>
            <cube-input type="number" :placeholder="Now_RoomData.min_money + ' - ' + Now_RoomData.max_money" class="sl_cube_input" v-model="hb_money" ></cube-input>
        </div>
        <div class="sl_body_input">
            <div class="sl_body_input_before">接龙红包个数</div>
            <div class="sl_body_input_after">个</div>
            <cube-input type="number" :placeholder="Now_RoomData.min_num + ' - ' + Now_RoomData.max_num" class="sl_cube_input" v-model="hb_number"></cube-input>
        </div>
        <div class="sl_sumbit" @click="sumbit(5)">塞入进红包</div>
        <div class="sl_sumbit_remark">未领取的红包,将于30秒后发起退款</div>
    </div>



</div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
  name: 'ChatRoom',
  data () {
    return {
        Now_RoomData:'',//现在这个房间的数据
        select_bag:'',//选择的包
        select_ball:[],//选择的雷号
        ws:{},  // 初始化websocket

        hb_money:'',
        hb_number:'',
        hb_thunder:'',
    }
  },
  created() {
    if(typeof this.RoomData != 'object'){
        this.Now_RoomData = JSON.parse(this.RoomData);
    }else{
        this.Now_RoomData = this.RoomData;
    }
  },
  computed: {
    ...mapState([
      'RoomData',//房间数据
    ]),
  },
  methods:{
    sumbit(index){
        if(this.global.ws.readyState != 1){
            this.$createToast({time: 2000, txt:'网络异常', type:'txt'}).show()
            return;
        }
        if(this.hb_money == '') return this.$createToast({time: 1000, txt: '请填写金额', type:'txt'}).show() 
        if(this.hb_number == '') return this.$createToast({time: 1000, txt: '请填写红包个数', type:'txt'}).show() 

        if(index == 1) {
            if(this.hb_thunder == '') return this.$createToast({time: 1000, txt: '请填写雷数', type:'txt'}).show() 
        }
        if(index == 4) {
            if(!this.select_ball) return this.$createToast({time: 1000, txt: '请选择雷数', type:'txt'}).show() 

            if(this.select_bag == 10 && this.select_ball.length<3){
                console.log(this.select_ball)
                console.log(this.select_ball.length)
                return this.$createToast({time: 1000, txt: '10包最少选3个雷号', type:'txt'}).show() 
            }
        }
        let data ;
        console.log(index)
        //在目前测试中 room_if 房间id是固定的 1 2 3 4 5分别对应扫雷 牛不 牛翻 禁抢 接龙
        if(index == 1){
            data = {
                "type":"pack",
                "action":"create",
                "room_id":this.RoomData.id,  
                "money":this.hb_money,
                "num":this.hb_number,
                "thunder":this.hb_thunder,
            }
        }else if(index == 2 || index ==3 ){
            data = {
                "type":"pack",
                "action":"create",
                "room_id":this.RoomData.id,
                "money":this.hb_money,
                "num":this.hb_number,
            }
        }else if(index == 4){
            data = {
                "type":"pack",
                "action":"create",
                "room_id":this.RoomData.id,
                "money":this.hb_money,
                "num":this.hb_number,
                "thunder":String(this.select_ball),
            }
        }else if(index == 5){
            data = {
                "type":"pack",
                "action":"create",
                "room_id":this.RoomData.id,
                "money":this.hb_money,
                "num":this.hb_number,
            }
        }else{
             return this.$createToast({time: 1000, txt: '没有对应房间', type:'txt'}).show() 
        }
        


        console.log(data)
         this.$emit('Emit_Red',JSON.stringify(data))
    },
    //禁抢 - 选红包个数 
    select_bag_number(item){
        this.select_ball = null
        if(item == this.select_bag){
            this.select_bag = ''
            this.hb_number = ''
            return;
        }
        this.select_bag = item
        this.hb_number = item
    },
    //禁抢 - 选雷号
    select_ball_number(item){
        if(this.select_bag == ''){
            return this.$createToast({time: 1000, txt: '请选择红包个数', type:'txt'}).show()
        }
        if(this.select_ball && this.select_ball.indexOf(item) != '-1'){
            this.select_ball.splice(this.select_ball.indexOf(item),1)
            return;
        }
        if(!this.select_ball){
            this.select_ball = [];
        }
        if(this.select_bag == 5 && this.select_ball.length > 4){
            return this.$createToast({time: 1000, txt: '5包最多选择5个雷号', type:'txt'}).show()
        }
        if(this.select_bag == 6 && this.select_ball.length > 5){
            return this.$createToast({time: 1000, txt: '6包最多选择6个雷号', type:'txt'}).show()
        }
        if(this.select_bag == 7 && this.select_ball.length > 6){
            return this.$createToast({time: 1000, txt: '7包最多选择7个雷号', type:'txt'}).show()
        }
        if(this.select_bag == 9 && this.select_ball.length > 6){
            return this.$createToast({time: 1000, txt: '9包最多选择7个雷号', type:'txt'}).show()
        }
        if(this.select_bag == 10 && this.select_ball.length > 7){
            return this.$createToast({time: 1000, txt: '10包最多选择8个雷号', type:'txt'}).show()
        }

        this.select_ball.push(item)
        console.log(this.select_ball);
        
    },
    
    goBack(number){
        this.$router.go('-1')
    }
  },

  watch:{
      hb_thunder(newV){
          if(newV.length>1){
            newV = newV.slice(0,1)
            this.$nextTick(()=>{
                this.hb_thunder = newV
            })
          }
      }
  }
 
}
</script>

<style scoped>
.bg{
    background-color: rgb(247, 251, 255);
    width: 100%;
    height: calc(100vh - 1.2rem);
    z-index: 1;
    position: fixed;
    top: 1.2rem;
}


/* //禁枪/// */
.jq_top_box{
    box-sizing: border-box;
    width: 9.4rem;
    height: 1.4rem;
    line-height: .1.4rem;
    font-size: .4rem;
    margin: .3rem;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 1px 1px 10px -5px #333;
    position: relative;
}
.jq_top_before{
    width: .8rem;
    height: 1.4rem;
    line-height: 1.4rem;
    margin: 0 .3rem;
    float: left;
}
.jq_top_input{
    box-sizing: border-box;
    width: 7rem;
    height: 1.4rem;
    line-height: .1.4rem;
    font-size: .5rem;
    position: relative;
    float: left;
}
.jq_top_after{
    width: .4rem;
    height: 1.4rem;
    line-height: 1.4rem;
    padding:0 .3rem;
    float: right;
    /* background-color: #fe4d57; */
}

/* 红包个数 */
.jq_mid_box{
    box-sizing: border-box;
    width: 9.4rem;
    height: 2rem;
    font-size: .4rem;
    margin: .3rem;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 1px 1px 10px -4px #333;
}
.jq_mid_before{
    width: 1.6rem;
    height: 2rem;
    line-height: 2rem;
    margin: 0 .3rem;
    float: left;
}
.jq_bag{
    box-sizing: border-box;
    border: .05rem solid #555;
    display: block;
    float: left;
    width: 1rem;
    height: 1rem;
    line-height: .9rem;
    margin: .5rem .1rem;
    /* background-color: #99b6ee; */
    background-color: #555;
    border-radius: 50%;
    text-align: center;
    color: #fff;
}
.jq_bag_active{
    /* border: .05rem solid #7ef0f8; */
    border: .05rem solid #f86262;
    background-color: #f86262;
}
.jq_mid_after{
    width: 1rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    float: right;
}

.jq_fot_box{
    width: 10rem;
    /* height: 10rem; */
    margin: auto;
    background: url(../../assets/img/ChatRoom/icon_contend_grab_bg.png) no-repeat;
    background-size: 100%;
    background-position: bottom;
    position: relative;
}
.jq_fot_top{
    box-sizing: border-box;
    width: 9.4rem;
    /* height: 5rem; */
    font-size: .4rem;
    margin: auto;
    overflow: hidden;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 1px 1px 10px -4px #333;
}
.jq_fot_fot{
    width: 100%;
    height: 5rem;
}
.jq_fot_btn{
    width: 3rem;
    height: 3rem;
    background-color: rgba(137, 43, 226, 0.185);
    position: absolute;
    bottom: 1.4rem;
    background:  url(../../assets/img/ChatRoom/icon_send_rp_normal.png) no-repeat;
    background-size: 100%;
    left: 3.5rem;
    bottom: 1rem;
}
.jq_fot_btn:active{
    width: 3rem;
    height: 3rem;
    background-color: rgba(137, 43, 226, 0.185);
    position: absolute;
    bottom: 1.4rem;
    background:  url(../../assets/img/ChatRoom/icon_send_rp_normal.png) no-repeat;
    background-size: 90%;
    background-position: center center;
    left: 3.5rem;
    bottom: 1rem;
}

.jq_fot_t{
    width: 9.4rem;
    min-height: 2rem;
    position: relative;
    overflow: hidden;
}
.jq_fot_l{
    width: 2.3rem;
    height: 1rem;
    line-height: 1rem;
    position: absolute;
    text-align: center;
    top: 50%;
    -webkit-transform: translate(0%, -50%);
    -ms-transform: translate(0%, -50%);
    transform: translate(0%, -50%);
}
.jq_fot_r{
    width: 6rem;
    margin: .5rem 2.3rem;
}
.jq_ball{
    box-sizing: border-box;
    border: .05rem solid #555;
    display: block;
    float: left;
    width: 1rem;
    height: 1rem;
    line-height: .9rem;
    margin: .1rem .1rem;
    /* background-color: #99b6ee; */
    background-color: #555;
    border-radius: 50%;
    text-align: center;
    color: #fff;
}
.jq_fot_r:after{
    display:block;
    clear:both;
    height:0;
    content: "";
    visibility: hidden;
    overflow:hidden;
}
.jq_ball_active{
    /* border: .05rem solid #59ecf7; */
    background-color: #f86262;
    border: .05rem solid #f86262;
}
.jq_fot_b{
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: 1rem;
}



/* 扫雷红包样式 */
.sl_top_box{
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
}
.sl_body_input{
    width: 100%;
    height: 1rem;
    background-color: #fff;
    font-size: .4rem;
    margin: .1rem 0;
}
.sl_body_input_before{
    width:2.4rem;
    height: 1rem;
    line-height: 1rem;
    float: left;
    padding: 0 .3rem;
    font-size: .4rem;
}
.sl_body_input_after{
    width:.6rem;
    height: 1rem;
    line-height: 1rem;
    float: right;
    padding: 0 .2rem 0 0;
    font-size: .4rem

}
.sl_cube_input{
    box-sizing: border-box;
    width: 6rem;
    height: 1rem;
    float:right;
    font-size: .4rem;
    padding: 0 .2rem;
}
.sl_body_remark{
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    font-size: .3rem;
    padding:0 .3rem;
    color: rgb(145, 145, 145);
}
.sl_sumbit{
    width: 9rem;
    height: .8rem;
    line-height: .8rem;
    margin:1rem auto .2rem;
    border-radius: 24px;
    background-color: #ff4851;
    color: #fff;
    font-size: .3rem;
    text-align: center;
}
.sl_sumbit:active{
    background-color: #ff5b63;
}
.sl_sumbit_remark{
    width: 100%;
    text-align: center;
    font-size: .3rem;
    color: rgb(133, 133, 133);
}

</style>
<style>
.jq_top_input input{
    float: right;
    text-align: right;
}
.sl_cube_input input{
    float: right;
    border: none;
    box-shadow: none;
    text-align: right;
}
.cube-input{
    border: none;
    box-shadow: none;
    position: static !important;
}
.cube-input-field{
    border: none;
    box-shadow: none;
    padding:none;
}
</style>