<template>
<div><!-- 消息  -->

  <!-- 头部 -->
  <HomeHeader :msg="msg"></HomeHeader>
  <!-- 轮播图 -->

  <!-- <cube-slide ref="slide" :data="this.$store.state.bannerImgs"  class="slideshow" :options="options" nest-mode="free">
      <cube-slide-item v-for="(item, index) in this.$store.state.bannerImgs" :key="index" >
        <a :href="item.url">
          <img :src="item.wap_img_url">
        </a>
      </cube-slide-item>
  </cube-slide> -->

  <!-- <MarqueeMsg></MarqueeMsg> -->
<div class="scroll-list-wrap">                        
  <cube-scroll  ref="scroll"  :options="pull_down"  @pulling-down="onPullingDown">

    <div class="no_friend" v-if=" !Friend_Now_Message || Friend_Now_Message.length == 0 ">
       暂无消息，邀请好友一起聊天！
    </div>

    <ul>
        <!-- <li class="msg_item">
            <img src="../../assets/img/MessageGroups/ic_custom_mine.png" alt="">
          <div class="msg_box">
            <div class="title">在线客服</div>
            <div class="describe">有问题,找客服</div>
          </div>
        </li>
        <li class="msg_item" @click="friend_list = !friend_list">
          <img src="../../assets/img/MessageGroups/ic_custom_friend.png" alt="">
          <div class="msg_box">
            <div class="title">我的好友</div>
            <div class="describe" v-if="!friend_list">{{ sum_unread > 0 ? '共有'+sum_unread+'条未消息' : '暂无未读消息'}}</div>
            <div class="describe" v-else>点击收起好友列表</div>
          </div>
        </li> -->
        <ul>
          <li class="msg_item"  v-for="(item,i) in Friend_Now_Message" :key="i" @click="go_friend(item)">
            <img src="../../assets/img/PersonalCenter/ic_user_avatar.png" v-if="item.avatar == 'null'|| !item.avatar || item.avatar=='' ">
            <img :src="item.avatar" v-else>
              <!-- <icon-svg icon-class="tubiaozhizuo-" class="dian" v-if="item.unread>0"/> -->
              <div class="small_dian" v-if="item.unread>0 && item.unread < 10">{{item.unread}}</div>
              <div class="dian" v-if="item.unread>=10 && item.unread < 100">{{item.unread}}</div>
              <div class="dian" v-if="item.unread>=100">99..</div>
            <div class="msg_box">
              <div class="title">{{item.nickname}}</div>
              <!-- <div class="describe">{{ item.unread > 0 ? '有'+item.unread+'条未读消息' : '暂无未读消息'}}</div> -->
              <div class="describe">{{ item.last_msg.length > 0 ? item.last_msg[0].content : '暂无未读消息'}}</div>
            </div>
          </li>
        </ul>

        <!-- 这个是个人房间 -->
        <!-- <li class="msg_item_wire" v-for="item in Red_data.self_room_list" :key="item.id" v-show="Red_data" @click="Go_ChatRoom(item)">
           <img :src="item.image" v-if="item.image">
           <img src="../../assets/img/MessageGroups/game_packets.gif" v-else>
          <div class="msg_box">
            <div class="title">[我的] {{item.room_name}} {{item.min_money}}-{{item.max_money}}</div>
            <div class="describe">{{item.notice ? item.notice : '暂无公告'}}</div>
          </div>
        </li> -->
        
        <!-- 这个是代理房间 -->
        <!-- <li class="msg_item_wire" v-for="item in Red_data.agent_room_list" :key="item.id" v-show="Red_data" @click="Go_ChatRoom(item)">
           <img :src="item.image" v-if="item.image">
           <img src="../../assets/img/MessageGroups/game_packets.gif" v-else>
          <div class="msg_box">
            <div class="title">[代理] {{item.room_name}} {{item.min_money}}-{{item.max_money}}</div>
            <div class="describe">{{item.notice ? item.notice : '暂无公告'}}</div>
          </div>
        </li> -->

        <!-- 占位置 苹果手机有奇奇怪怪的问题 要不拉不到下面... -->
    <div class="nz_placeholder"></div>
    </ul>
    
  </cube-scroll>
</div>

</div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader'
import MarqueeMsg from '@/components/common/MarqueeMsg'
import {mapActions,mapState} from 'vuex'
export default {
  name: 'MessageGroups',
  components: { HomeHeader,MarqueeMsg },
  data () {
    return {
      msg:'消息',
      items: [],
      // 轮播图scroll配置
      options: {
        stopPropagation:true,
      },
      //下拉菜单scroll配置
      pull_down:{
          click:false,
          pullDownRefresh:false,
        //   pullDownRefresh: {
        //   threshold: 80,
        //   stop: 100,
        //   txt: '更新成功'
        // }
      },
      sum_unread:'',//总共的未读消息
      ggws:'',
    }
  },
  computed: {
    ...mapState([
      'Friend_Now_Message', //好友消息
    ]),
  },
  props:{
    Red_data:Object,  // 从home 首页 得到房间列表 然后传过来
    record:Object,  // 聊天消息
  },
  watch: {
    //监听一下传过来的消息,然后整合一下总的未读消息
    'record'(){
      Object.keys(this.record).forEach(e => {
          this.sum_unread += this.record[e].unread
      });
    }
  },
  methods:{

    go_friend(data){
      if(this.global.ws.readyState != 1){
        this.$createToast({time: 2000, txt:'网络异常，尝试重连中', type:'txt'}).show()
        this.reconnection(data.uid);
      }else{
        let item = {
          headimgurl:data.avatar,
          nickname:data.nickname,
          user_id:data.uid
        }
        this.$store.dispatch('savePrivateChatData', item) // 存储房间的信息到状态和本地上
        this.$router.push({path: 'PrivateChat',query:{goHome:0}})
      }
    },
    //重新连接
    reconnection(uid){
        let ws = new WebSocket("ws://13.209.240.252:7272");
        this.global.setWs(ws);
        ws.onopen = evt => {
            var login_data = '{"type":"login","action":"private","to_id":"'+ uid +'","token":"'+ this.token +'"}';
            ws.send(login_data);
        };
        ws.onmessage = evt=> {
            let data = JSON.parse(evt.data)
            if(data.type == 'login'){
              if(!this.ggws){
                clearInterval(this.ggws);
                this.ggws = ''
              }
              this.$router.push({path: 'PrivateChat',query:{goHome:0}})
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





    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
      console.log(label)

    },
    //通过滑动slide组件 来改变 当前的标签头
    changePage (current) {
      this.selectedLabelDefault = this.tabs[current].label
    },

    //下拉刷新获得新数据
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.$refs.scroll.forceUpdate()
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },


    //进聊天室
    Go_ChatRoom(RoomData){
      console.log(RoomData)
      this.$store.dispatch('saveRoomData', RoomData) // 存储房间的信息到状态和本地上
      this.$router.push({name: 'ChatRoom'})
    }
  }, 
}
</script>


<style scoped>
.nz_placeholder{
  width: 100%;
  height: 2rem;
  background-color: rgb(248, 248, 248);
}
  

/* 轮播图 */
.slideshow{
  width: 100%;
  height: 3rem;
}
.slideshow img{
  width: 100%;
  min-height: 100%;
}
/* 容器的宽高 */
.scroll-list-wrap{
  width: 100%;
  /* height: calc(100vh - 6.4rem - 1px);   */
  height: calc(100vh - 2.6rem);  
  /* 内容高度 要减去 头顶1.2rem 底部1.4rem 和轮播图的3rem   还要减掉广播*/
  background-color: rgb(248, 248, 248)
}


.msg_item{
  width:9.8rem;
  height:1.6rem;
  line-height: 1.6rem;
  /* background-color: cornflowerblue; */
  padding: .1rem;
  position: relative;
}
/* 顶部有线的👇 */
.msg_item_wire{ 
  width:9.8rem;
  height:1.6rem;
  border-top: 1px solid rgb(240, 240, 240);
  line-height: 1.6rem;
  padding: .1rem;
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

/* item标题和描述 */
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


.no_friend{
  width: 100%;
  height: calc(100vh - 2.6rem);
  line-height: calc(100vh - 12.6rem);
  text-align: center;
  font-size: .5rem;
  background-color: rgb(241, 241, 241);
  /* text-shadow: .1rem .1rem 2px rgb(110, 105, 105); */
}
</style>
