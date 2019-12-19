<template>
<div>   
<!-- 群组  -->
        <!-- 头部 -->
        <HomeHeader :msg="msg"></HomeHeader>

<!-- 轮播图 -->

    <cube-slide ref="slide" :data="this.$store.state.bannerImgs"  class="slideshow" :options="options" nest-mode="free">
          <cube-slide-item v-for="(item, index) in this.$store.state.bannerImgs" :key="index" >
            <a :href="item.url">
              <img :src="item.wap_img_url">
            </a>
          </cube-slide-item>
      </cube-slide>



 <MarqueeMsg></MarqueeMsg>
<div class="tab-slide-container">
  <!-- 游戏标题 -->
        <cube-tab-bar v-model="selectedLabelDefault"
                      :use-transition="false"
                      ref="tabNav"
                      :data="tabs"
                      >
            <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index">
            <!-- <i slot="icon" :class="item.icon"></i> -->
              <div class="game_img" >   
                <img :src=item.image >
              </div>
            <div>{{item.label}}</div>
          </cube-tab>
        </cube-tab-bar>
  <cube-slide :auto-play="false" :loop="false" :show-dots="false"
                @change="changePage" @scroll="scroll" ref="slide"
              :options="slideOptions" :initial-index="initialIndex" nest-mode="free" direction="horizontal">

      <!-- 红包游戏 -->
      <cube-slide-item>
          <div class="scroll-list-wrap">                        
            <!-- <cube-scroll  ref="scroll"   @pulling-down="onPullingDown"> -->
            <cube-scroll  ref="scroll">
              <ul>
                  <!-- 这个是平台房间 -->
                  <li class="msg_item_wire" v-for="item in Red_Room_list.sys_room_list" :key="item.id" v-show="Red_data" @click="Go_ChatRoom(item)"> 
                                                                <!-- 当图片错误 启用备用图片!! -->
                    <img :src="item.image"  v-if="item.image" >
                    <img src="../../assets/img/MessageGroups/game_packets.gif" v-else>
                        <div class="small_dian" v-if="Group_Now_Message[item.id] > 0 && Group_Now_Message[item.id] < 10">{{Group_Now_Message[item.id]}}</div>
                        <div class="dian" v-if="Group_Now_Message[item.id]>=10 && Group_Now_Message[item.id] < 100">{{Group_Now_Message[item.id]}}</div>
                        <div class="dian" v-if="Group_Now_Message[item.id]>=100">99..</div>
                    <div class="msg_box">
                      <div class="title">[平台] {{item.room_name}} {{item.min_money}}-{{item.max_money}}</div>
                        <div class="describe"  v-if="!Group_Message_msgList[item.id]">{{item.notice ? item.notice : '暂无公告'}}</div>
                        <div class="describe" v-else>{{Group_Message_msgList[item.id]}}</div>
                    </div>
                  </li>

                  <!-- 这个是个人房间 -->
                  <li class="msg_item_wire" v-for="item in Red_Room_list.self_room_list" :key="item.id" v-show="Red_data" @click="Go_ChatRoom(item)">
                    <img :src="item.image" v-if="item.image">
                    <img src="../../assets/img/MessageGroups/game_packets.gif" v-else>
                        <div class="small_dian" v-if="Group_Now_Message[item.id] > 0 && Group_Now_Message[item.id] < 10">{{Group_Now_Message[item.id]}}</div>
                        <div class="dian" v-if="Group_Now_Message[item.id]>=10 && Group_Now_Message[item.id] < 100">{{Group_Now_Message[item.id]}}</div>
                        <div class="dian" v-if="Group_Now_Message[item.id]>=100">99..</div>
                    <div class="msg_box">
                      <div class="title">[我的] {{item.room_name}} {{item.min_money}}-{{item.max_money}}</div>
                      <div class="describe"  v-if="!Group_Message_msgList[item.id]">{{item.notice ? item.notice : '暂无公告'}}</div>
                      <div class="describe" v-else>{{Group_Message_msgList[item.id]}}</div>
                    </div>
                  </li>
                  
                  <!-- 这个是代理房间 -->
                  <li class="msg_item_wire" v-for="item in Red_Room_list.agent_room_list" :key="item.id" v-show="Red_data" @click="Go_ChatRoom(item)">
                    <img :src="item.image" v-if="item.image">
                    <img src="../../assets/img/MessageGroups/game_packets.gif" v-else>
                        <div class="small_dian" v-if="Group_Now_Message[item.id] > 0 && Group_Now_Message[item.id] < 10">{{Group_Now_Message[item.id]}}</div>
                        <div class="dian" v-if="Group_Now_Message[item.id]>=10 && Group_Now_Message[item.id] < 100">{{Group_Now_Message[item.id]}}</div>
                        <div class="dian" v-if="Group_Now_Message[item.id]>=100">99..</div>
                    <div class="msg_box">
                      <div class="title">[代理] {{item.room_name}} {{item.min_money}}-{{item.max_money}}</div>
                      <div class="describe"  v-if="!Group_Message_msgList[item.id]">{{item.notice ? item.notice : '暂无公告'}}</div>
                      <div class="describe" v-else>{{Group_Message_msgList[item.id]}}</div>
                    </div>
                  </li>


                      <!-- 占位置 苹果手机有奇奇怪怪的问题 要不拉不到下面... -->
                      <div class="nz_placeholder"></div>
              </ul>
            </cube-scroll>
          </div>
      </cube-slide-item>


      <!-- 电子游戏 -->
      <cube-slide-item>
          <div class="scroll-list-wrap"> 
              <cube-scroll  ref="scroll">
                  <div>
                    <div class="game_img_item" v-for="(item,i) in DZlist" :key="i"  @click="toGame(item.name)">
                      <img :src="require('../../assets/img/CrowdGroups/'+ item.name +'.png')" alt="">
                    </div>
                    <div class="nz_placeholder"></div>
                  </div>
              </cube-scroll>
          </div>
      </cube-slide-item>

      <!-- 棋牌游戏 -->
      <cube-slide-item >
        <!-- 第三方平台外跳 -->

        <div class="ChessGame">
          <cube-scroll ref="scroll" direction="horizontal"  :options="options" class="horizontal-scroll-list-wrap">
          <ul class="list-wrapper recharge">
            <cube-tab-bar v-model="ChessGame_type" @change="selectIndex">
                <cube-tab v-for="game in QPlist" :key="game.name"  :label="game.name" >{{game.title}}</cube-tab>
            </cube-tab-bar>
          </ul>
        </cube-scroll>
        </div>
        <div class="scroll_h-list-wrap"> 
            <cube-scroll  ref="scroll_h">
              <div>
                  <div v-for="(item,i) in QPlist" :key="i" >
                    <!-- 前面选择的棋牌种类 -->
                    <div v-if="item.name == ChessGame_type"> 
                      <ul class="chessList" v-if="CHESS_gameList && CHESS_gameList[ChessGame_type].length !=0">
                          <li class="item_list" @click="toGame(item.name,x.game_code)" v-for="(x,index) in CHESS_gameList[item.name]" :key="index">
                              <img :src="require('../../assets/img/CrowdGroups/'+ item.name +'/'+ x.game_code +'.png')" alt="">
                          </li>
                      </ul>
                      <!-- <ul class="chessList" v-else> -->
                      <ul class="chessList" v-if="CHESS_gameList && CHESS_gameList[ChessGame_type].length ==0">
                          <li class="item_one" @click="toGame(item.name)">
                              <img :src="require('../../assets/img/CrowdGroups/'+ item.name+'/'+ item.name +'.png')" alt="">
                          </li>
                      </ul>
                    </div>
                </div>
              </div>
            </cube-scroll>
        </div>
      </cube-slide-item>

      <!-- 捕鱼游戏 -->
      <cube-slide-item>
        <div class="scroll-list-wrap"> 
            <cube-scroll  ref="scroll">
                <div>
                    <ul class="game_img_square" v-for="(item,i) in BYlist" :key="i">
                        <li class="item_one" @click="toGame(item.name)">
                            <img :src="require('../../assets/img/CrowdGroups/'+ item.name +'.png')" alt="">
                        </li>
                    </ul>
                    <div class="nz_placeholder"></div>
                </div>
            </cube-scroll>
        </div>
      </cube-slide-item>

  </cube-slide>
</div>



</div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader'
import MarqueeMsg from '@/components/common/MarqueeMsg' //广播
import {mapState} from 'vuex'
export default {
  name: 'CrowdGroups',
  components: { HomeHeader,MarqueeMsg },
  data () {
    return {
      msg:'群组',
      selectedLabelDefault:"红包游戏",
      tabs: [
        {
          label: '红包游戏',
          image:require('../../assets/img/CrowdGroups/game_packets.gif')
        },
        {
          label: '电子游戏',
          image:require('../../assets/img/CrowdGroups/game_electronic.gif')
        },
        {
          label: '棋牌游戏',
          image:require('../../assets/img/CrowdGroups/game_chess.gif')
        },
        {
          label: '捕鱼游戏',
          image:require('../../assets/img/CrowdGroups/game_fishing.gif')
        },
      ],
      CasualGame:[
          {
            label: '捕鱼大师',
            image:require('../../assets/img/CrowdGroups/ic_byds.png')
          },
          {
            label: '西游捕鱼',
            image:require('../../assets/img/CrowdGroups/ic_xyby.png')
          },
          {
            label: '捕鱼大作战',
            image:require('../../assets/img/CrowdGroups/ic_bydzz.png')
          },
      ],


      // 关于滑动的一些配置
      options: {
        stopPropagation:true,
      },
      slideOptions: {
        click:false,
        stopPropagation:true,
        listenScroll: true,
        probeType: 3,
      },
      //下拉菜单scroll配置
      // pull_down:{
      //     pullDownRefresh:true,
      //     pullDownRefresh: {
      //     threshold: 30,
      //     stop: 50,
      //     txt: '更新成功'
      //   }
      // },
      ggws:'',

      QPlist:'', //棋牌列表
      DZlist:'', //电子列表
      BYlist:'', //捕鱼列表
      ChessGame_type:'LEG',//选择了的棋牌游戏类型
      CHESS_gameList:'',//游戏各种棋牌大类

      is_btn:true,//防止连点

    }
  },
  created() {
    this.GetList(); //得到列表 这个可以从后台或者那些游戏是开启的了
    this.GetChessList() //而这个是 获得 棋牌 的具体有那些游戏
  },
  props:{
    Red_data:Object,  //得到房间列表
  },
  methods:{
    GetChessList(){
      this.$http.post("/api/site/getgameslist").then(res => {
          console.log(res)
					if(res && res.data){
            this.CHESS_gameList = res.data
          }
				});
    },
    //得到游戏列表
    GetList(){
      console.log(this.WebData)
        this.QPlist = this.WebData.OpenLive[2] //2是棋牌
        this.BYlist = this.WebData.OpenLive[3] //3是电子
        this.DZlist = this.WebData.OpenLive[4] //4是捕鱼
        console.log(this.QPlist)
        console.log(this.BYlist)
        console.log(this.DZlist)
    },
    //改变游戏的标签页
    changePage(current) {
      this.selectedLabelDefault = this.tabs[current].label;
      this.$refs.scroll.refresh();
      this.$refs.scroll_h.refresh();
    },
    // 在棋牌中选择其中一项棋牌
    selectIndex(index){
      console.log(index)
      this.$refs.scroll_h.refresh();
      setTimeout(()=>{
        this.$refs.scroll_h.refresh();
      },500)
      this.$refs.scroll_h.scrollTo(0,0);
    },
    //进入游戏
    toGame(game,id){
      if(this.is_btn){
        this.$store.dispatch('iframeopen', true) //打开loading.gif
        this.is_btn = false; //防连点
        let newWindow = null;

        let data
        if(!id){
          data = {
            type: game
          }
        }else{
          data = {
            type: game,
            KindID:id
          }
        }
				this.$http.post("/api/live/index/index/", data).then(res => {
          console.log(res)
					if (res && res.data.code == 0) {
            this.$store.dispatch('iframeopen', true)
            this.$store.dispatch('iframeopenURL', res.data.url)

            this.is_btn = true; //恢复点击
					}else{
            this.$createToast({time: 2000, txt: res.data.msg, type:'txt'}).show();
            this.$store.dispatch('iframeopen', false) //打开loading.gif
            this.is_btn = true;
          }
        });

      }
    },

    
    //进聊天室
    Go_ChatRoom(RoomData){
      this.$store.dispatch('saveRoomData', RoomData) // 存储房间的信息到状态和本地上
      if(this.global.ws.readyState == 1){
        var login_data = '{"type":"login","action":"room","room_id":"'+ RoomData.id +'","token":"'+ this.token +'"}';
        this.global.ws.send(login_data);

        this.global.ws.onmessage = evt=> {
            let data = JSON.parse(evt.data)
            if(data.type == 'login'){
                this.$router.push({name: 'ChatRoom'})
            }

            if(data.type == 'error' ){
              if(data.deadly == true){
                window.localStorage.setItem('auto_logIn','false');
                this.$store.dispatch('Websocket_status','');
                window.sessionStorage.setItem('access_token','');
                if(!window.sessionStorage.getItem('access_token')){
                    this.$router.push('/');
                }
              }
              return this.$createToast({time: 3000, txt:data.msg, type:'txt'}).show()
            }

        }
      }
      else{
        this.$createToast({time: 2000, txt:'网络异常，尝试重连中', type:'txt'}).show()
        this.reconnection();
      }
    },
    //重新连接
    reconnection(){
        let ws = new WebSocket("ws://13.209.240.252:7272");
        this.global.setWs(ws);
        ws.onopen = evt => { 
            var login_data = '{"type":"login","action":"room","room_id":"'+ RoomData.id +'","token":"'+ this.token +'"}';
            ws.send(login_data);
        };
        ws.onmessage = evt=> {
            let data = JSON.parse(evt.data)
            if(data.type == 'login'){
              if(!this.ggws){
                clearInterval(this.ggws);
                this.ggws = ''
              }
              this.$router.push({name: 'ChatRoom'})
            }
            if(data.type == 'error'){
              if(!this.ggws){
                clearInterval(this.ggws);
                this.ggws = ''
              }
              if(data.deadly == true){
                window.localStorage.setItem('auto_logIn','false');
                this.$store.dispatch('Websocket_status','');
                window.sessionStorage.setItem('access_token','');
                if(!window.sessionStorage.getItem('access_token')){
                    this.$router.push('/');
                }
              }
              return this.$createToast({time: 3000, txt:data.msg, type:'txt'}).show()
            }
        };
        ws.onclose = evt =>{
          if(!this.ggws){
            this.reconnection()
            this.ggws = setInterval(() => {
                this.reconnection()
            }, 2000);
          }
        }
    },

    ///////////////敬请期待
    // ComingSoon(){
    //   this.$createToast({
    //         time: 2000,
    //         txt: '游戏部署中，敬请期待！',
    //         type:'txt'
    //       }).show()
    // },


    //以下的关于滑动的
    scroll(pos) {
      const x = Math.abs(pos.x);
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
      const deltaX = (x / slideScrollerWidth) * tabItemWidth;
      this.$refs.tabNav.setSliderTransform(deltaX);
    },

    //用来计算传入的 底部功能组 和 改变了 的选项 最后返回index号
    findIndex(ary, fn) {
      if (ary.findIndex) {
        return ary.findIndex(fn);
      }
      /* istanbul ignore next */
      let index = -1;
      /* istanbul ignore next */
      ary.some(function(item, i, ary) {
        const ret = fn.call(this, item, i, ary);
        if (ret) {
          index = i;
          return ret;
        }
      });
      /* istanbul ignore next */
      return index;
    },


    //滑动函数
    //下拉刷新获得新数据
    // onPullingDown() {
    //   // 模拟更新数据
    //   setTimeout(() => {
    //     if (Math.random() > 0.5) {
    //       // 如果有新数据
    //       this.$refs.scroll.forceUpdate()
    //     } else {
    //       // 如果没有新数据
    //       this.$refs.scroll.forceUpdate()
    //     }
    //   }, 1000)
    // },

  },


  //计算
  computed: {
    ...mapState([
      'WebData',//网站信息，里面有关于棋牌的
      'Group_Now_Message', //群消息个数 数据
      'token',
      'Red_Room_list',//红包房间的列表 每10秒刷新一次吧。。。
      'Group_Message_msgList',//群消息 数据
    ]),
    initialIndex() {
      let index = 0;
      index = this.findIndex(
        this.tabs,
        item => item.label === this.selectedLabelDefault
      );
      return index;
    }
  }
 
}
</script>



<style>
.cube-tab div {
  font-size: 0.4rem;
  margin-top: 0.1rem;
}
</style>

<style scoped>

/* 轮播图 */
.slideshow{
  width: 100%;
  height: 3.6rem;
}
.slideshow img{
  width: 100%;
  min-height: 100%;
}

.tab-slide-container{
  width:100%;
  height: calc(100vh - 6.4rem - 1px); /*1.2 , 3.6 , 1.4 */
  background-color: rgb(252, 252, 252);
}

.game_img{
  width: 2.5rem;
  height: 2rem;
}
.game_img img{
  width:1.5rem;
  height: 1.5rem;
  margin: 0.25rem .5rem;
}


/* 以下为红包游戏样式 */
/* 滑动的宽高 */
.scroll-list-wrap{
  width: 100%;
  height: calc(100vh - 9.9rem - 1px);  
  /* height: calc(100vh - 10.9rem - 1px);   */
  /* 内容高度 要减去 头顶1.2rem 底部1.4rem 和轮播图的3rem   还要减掉广播*/
  /* background-color: rgb(216, 55, 55) */
}
/* 顶部有线的👇 */
.msg_item_wire{ 
  width:9.8rem;
  height:1.6rem;
  border-top: 1px solid rgb(240, 240, 240);
  line-height: 1.6rem;
  padding: .1rem;
  position: relative;
}
.msg_item img,
.msg_item_wire img {
  display: block;
  float: left;
  width: 1.4rem;
  height: 1.4rem;
  /* background-color: rgb(39, 39, 39); */
  margin:.1rem .2rem;
  border-radius: 10px;
}
/* * item标题和描述 */
.msg_box{
  float: left;
  width: 8rem;
  height: 1.4rem;
  margin:.1rem 0;
  /* background-color: yellow; */
}
.title{
  width:100%;
  height:.7rem;
  line-height:.7rem;
  /* background-color: brown; */
  font-size: .4rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.describe{
  width:100%;
  height:.7rem;
  line-height:.7rem;
  font-size: .3rem;
  color: rgb(179, 179, 179);
  /* background-color: rgba(42, 165, 134, 0.685); */
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}





/* 电子游戏图片样式 */
.game_img_item{
  width: 10rem;
  margin:auto;
}
.game_img_square{
  width:2.33rem;
  height:2.33rem;
  float: left;
  margin: .5rem;
}
.game_img_item img {
  width: 100%;
}
.game_img_square img {
  width: 100%;
}

.small_dian{
  text-align: center;
  min-width: .5rem;
  height: .5rem;
  line-height: .5rem;
  font-size: .3rem;
  position: absolute;
  left: 1.3rem;
  padding: 0 .14rem;
  border-radius:50px;
  box-sizing: border-box;
  top: .1rem;
  color: #fff;
  background-color: rgb(255, 82, 82);
}
.dian{
  text-align: center;
  min-width: .5rem;
  height: .5rem;
  line-height: .5rem;
  font-size: .3rem;
  position: absolute;
  left: 1.3rem;
  padding: 0 .14rem;
  border-radius:50px;
  box-sizing: border-box;
  top: .1rem;
  color: #fff;
  background-color: rgb(255, 82, 82);
}



/* 棋牌游戏 */
.chessList{
  width: 10rem;
  height: auto;
  position: relative;
}
/* 单个 例如kk棋牌 */
.item_one{
  width: 100%;
  margin: .2rem 0;
}
.item_one img{
  width: 100%;
}
/* 一群棋牌 */
.item_list{
  width: 100%;
  margin: .2rem 0;
}
.item_list img{
   width: 2.33rem;
   margin: .2rem .5rem;
   float: left;
}

.myframe {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100000;
  background-color: aqua;
}

</style>
<style>
.ChessGame .cube-scroll-wrapper {
  height: auto;
}
.ChessGame  .horizontal-scroll-list-wrap{
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px
}
.ChessGame .cube-scroll-content{
    display: inline-block
}
/* .ChessGame .list-wrapper{
    padding: 0 10px;
    line-height: 60px;
    white-space: nowrap;
}
.ChessGame .list-item{
    display: inline-block
}

.ChessGame .list-wrapper{
  padding: 0;
} */
/* 设置样式 */
.ChessGame  .recharge .cube-tab{
  font-size: .46rem;
  line-height: .76rem;
  padding: 0;
  margin:0 .2rem;
}

.ChessGame .cube-tab_active {
    color: rgb(253, 6, 6);
   	animation:mymove 5s infinite;
	  -webkit-animation:mymove 5s infinite; /*Safari and Chrome*/
}
@keyframes mymove
{
	0% {color: rgb(255, 0, 0);}
	20% {color: rgb(238, 255, 0);}
	40% {color: rgb(0, 255, 42);}
	60% {color: rgb(0, 195, 255);}
	80% {color: rgb(38, 0, 255);}
	100% {color: rgb(255, 0, 0);}
}


.scroll_h-list-wrap{
  width: 100%;
  height: calc(100vh - 10.9rem - 1px);  
}
</style>