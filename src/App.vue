<template>
  <div>
    <v-touch v-on:swipeup="close_friend">
        <transition name = "GG"> 
            <div class="G-message" v-if=" private_msg && open_show" @click="go_friend()" >
                <div class="G_left">
                  <div class="G_top">新消息 · 刚刚</div>
                  <div class="G_name">{{private_msg.from_user.nickname}}</div>
                  <div class="G_msg">{{private_msg.content}}</div>
                </div>
                <div class="G_right">
                  <div class="G_avatar">
                    <img :src="require('./assets/img/PersonalCenter/ic_user_avatar.png')"  v-if="private_msg.from_user.avatar == 'null'|| !private_msg.from_user.avatar || private_msg.from_user.avatar=='' ">
                    <img :src="private_msg.from_user.avatar" v-else>
                  </div>
                </div>
            </div>
        </transition>
    </v-touch>

    <v-touch v-on:swipeup="close_settlement">
        <transition name = "GG"> 
            <div  :class="open_show == true ? 'Go_downward': 'G-message'" v-if="pack_info && open_settlement"  @click="go_settlement()">
                <div class="G_left">
                  <div class="G_top">红包结算</div>
                  <div class="G_name">{{pack_info.data.pack_master.type | type_name}}</div>
                  <div class="G_msg">点击查看详情</div>
                </div>
                <div class="G_right">
                  <div class="G_avatar">
                    <img :src="require('./assets/img/PersonalCenter/ic_user_avatar.png')"  v-if="pack_info.data.pack_master.avatar == 'null'|| !pack_info.data.pack_master.avatar || pack_info.data.pack_master.avatar=='' ">
                    <img :src="pack_info.data.pack_master.avatar" v-else>
                  </div>
                </div>
            </div>
        </transition>
    </v-touch>

    <!-- 红包详情的组件 -->
    <transition name = "into">
    <div v-if="open_partivulars" class="red_world">
        <div class="red_world_top">
            <div class="red_world_goback" @click="open_partivulars = false" >
                <i class="get_back"></i>
            </div>
            <div class="red_world_title">
                红包详情
            </div>
        </div>
        <div class="pad"></div><!-- 垫 -->
        <RedParticulars :pack_info='pack_info'></RedParticulars>
    </div>
    </transition>


    
    <transition name = "into">
      <!-- 不能使用keep-alive 要不进聊天室会错乱 -->
      <!-- <keep-alive > --> 
        <router-view v-if="siteMes && !isWchat && isGetArrow" @show_private='show_private'   @show_settlement='show_settlement'/>
      <!-- </keep-alive> -->
    </transition>
    <!-- 当检测到是微信内置浏览器 -->
    <div v-if="siteMes && isWchat && isGetArrow" class="no-msg"></div> 
  </div>
</template>

<script>
import {mapState} from 'vuex'
import RedParticulars from './views/RoomInfo/RedParticulars' //查看红包详情的组件
export default {
  name: 'App',
  components: {RedParticulars},
  data() {
			return {
        ws:new WebSocket("ws://13.209.240.252:7272"),
        // ws:'',
        siteMes: '',//网站的所有data信息
        isWchat:false,//判断他是不是微信内置的浏览器
				//服务权限是否获取完
        isGetArrow: false,

        private_msg:'',//全局私人消息提醒
        open_show:false,
        open_settlement:false,
        out_clear:'',//清除时间的


        open_partivulars:false,  //打开红包详情的组件
        pack_info:'', //全局结算 红包信息
        runWebsocket:true,
        timer:'',
        Now_PrivateChatData:'',
        is_relink:false,//重连
        ggws:'',
        relink:'',
        // ping:'',
        watch_socket:'',
			}
		},
  created() {
      this.Now_PrivateChatData = this.PrivateChatData;
      this.getHrefDatas(); //得到推广码
      this.checkArea(); //检查地域限制
  },
  methods: {
      //获取地址栏的参数（key或intr）  这个是为了获得推广码!!!
			getHrefDatas() {
        let search = window.location.href
        if (search.includes('intr') || search.includes('key')) {
            this.getSearch(search)
        }
        if(search.includes('intr') && this.getSearch(search)) {
            window.localStorage.setItem('intr',this.getSearch(search));
            window.localStorage.removeItem('key');
            window.localStorage.removeItem('agent_id');
            this.$router.push({path:'/SignUp',query:{intr:this.getSearch(search)}})
        } else if(search.includes('key') && this.getSearch(search)) {
            window.localStorage.setItem('key',this.getSearch(search));
            window.localStorage.removeItem('intr');
            window.localStorage.removeItem('agent_id');
            this.$router.push({path:'/SignUp',query:{key:this.getSearch(search)}})
        } else {
            this.getAgentId();
        }
      },
      getSearch(str) {
				if(str == undefined) return
        return str.split("?")[1].split("=")[1];
      },
      //得到代理id 如果这个网站有代理id 就去掉key和intr
      getAgentId() {
          this.$http.post('/api/user/getAgentId',{domain: window.location.host}).then(res=>{
              if (res && res.data.data!=0) {
                  window.localStorage.setItem('agent_id',res.data.data)
                  window.localStorage.removeItem('key');
                  window.localStorage.removeItem('intr');
              };
          })
          
      },
      
      // 先检查区域限制
        checkArea() {
          this.$http.post('api/site/checkIp/').then(res=>{
              if (res.data.code == 0) {
                this.getWebsite();
                this.isGetArrow = true;
              } else {
                this.$router.push('/areaNotArrow') //跳到地域访问不了的页面
                this.isGetArrow = true;
              }
          })
        },      

      //这个是为了拿到网站的信息 并且用vuex 储存在状态里
       getWebsite() {
				this.$http.post('api/site/info').then(res=>{
            if (res.data && res.data.SiteClose) this.$router.push('/service');
                if (res.data) {
                  document.title = res.data.SiteName;
                  this.siteMes = res.data;
                  let ua = navigator.userAgent.toLowerCase();
                  if (res.WechatBroswer == 0 && ua.match(/MicroMessenger/i) == "micromessenger") return this.isWchat = true
                  this.isWchat = false;
                  this.$store.dispatch('getWebsiteData', res.data) // 保存网站的所有信息
                  if(res.data.Banner.count > 0) {
                    this.$store.dispatch('saveBannerImgs', res.data.Banner.data)//保存轮播图
                  };


                    //开场用js的方式 让弹窗 从下往上 
                    this.bg = 'rgba(0, 0, 0, 0);'
                    this.top = '200%'
                    setTimeout(()=>{
                        this.top = '50%' ;
                        this.bg = 'rgba(0, 0, 0, 0.2);'
                    },5);
                }
        })
                
      },
      
    // 初始化WebSocket 在大厅进行连接
  initWebSocket(){
      let _that = this
      if(!this.runWebsocket){
          var login_data = '{"type":"login","action":"hall","token":"'+ this.token +'"}';
          this.global.ws.send(login_data);
      }
      if(this.runWebsocket){
         this.ws = new WebSocket("ws://13.209.240.252:7272");
         this.global.setWs(this.ws);
      
        this.global.ws.onopen = evt => { 
          if(this.is_relink == true){
              clearInterval(this.ggws)
              this.ggws = ''
              this.is_relink = false
          }
          this.runWebsocket = false
          // 连接成功后 登录用户
          if(this.Websocket_status == 'hall'){
            var login_data = '{"type":"login","action":"hall","token":"'+ this.token +'"}';
            this.global.ws.send(login_data);
          }
        }
      };
      this.global.ws.onmessage = evt=> {
        if(this.Websocket_status == 'hall'){
        let data = JSON.parse(evt.data)
        console.log(data)
        //私聊弹窗消息
        if(data.action == 'private'&& !data.type){
            this.show_private(data);
        }

        //房间消息数量
        if(data.action == 'room' && data.type == 'message'){
            this.show_roomMessage(data);
        }
        
        //结算弹窗消息
        if(data.action == 'settlement' && data.type == 'pack'){
            this.show_settlement(data);
        }
        
        //当红包接龙是最小的时候的自动发包提示
        if(data.action == 'auto_send' && data.type == 'pack'){
           this.$createToast({time: 5000, txt:data.msg, type:'txt'}).show()
        }

        // 如果是大厅 就把大厅带的信息传给消息那边
        if(data.action && data.action == 'hall'){
            this.$store.dispatch('Friend_Now_Message', data.record)
        }
        //红点消息的统计
        if(this.Friend_Now_Message || (data.action=='hall' && data.record)){
          let sum = 0 
          for(var i in this.Friend_Now_Message) {
              sum += parseInt(this.Friend_Now_Message[i].unread)
          }
          this.$store.dispatch('Msg_num',sum)
        }
        //登录过期
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
        };
        } 
      };
        this.global.ws.onclose = evt=> {
          console.log('触发onclose')
          if(!this.ggws && this.Websocket_status == 'hall'){
              this.is_relink = true;
              this.runWebsocket = true
              this.initWebSocket()
              this.ggws = setInterval(() => {
                this.is_relink = true;
                this.initWebSocket()
                console.log('2秒一次')
            }, 2000);
          }
        }
        this.global.ws.onerror = evt=> {
          if(!this.ggws && this.Websocket_status == 'hall'){
            console.log('触发onerror')
            this.initWebSocket()
            this.runWebsocket = true;
            this.is_relink = true;
            // this.relink = this.$createToast({time: 10000, txt:'正在连接...',mask: false, type:'txt'}).show();
          }
        }
  },
    //显出私聊弹窗
    show_private(data){

      this.private_msg = data
      //下面这个是一个顶部提示 
      //如果聊天信息来源的id  是我 现在 正在私聊的id   且 我是在私聊房间的时候 不要弹窗
      if((this.private_msg.from_user.uid == this.PrivateChatData.user_id) && this.Websocket_status == 'private' ){
          this.open_show = false
      }else{
        this.open_show = true
      }
      setTimeout(()=>{
        this.open_show = false;
      },10000)
      // 这里要把消息塞到未读消息里 先找之前没有相同id的  如果来了提示消息就把未读消息加1
      if(this.Friend_Now_Message){
        var identical = false  //创建一个变量来判断有没有 相同id的 
          for(var i in this.Friend_Now_Message) {
              if(i == data.from_user.uid){
                identical = true
                let addmsg = Number(this.Friend_Now_Message[i].unread) + 1
                let MsgData = this.Friend_Now_Message
                MsgData[i].last_msg[0].content = data.content
                MsgData[i].unread = addmsg
                this.$store.dispatch('Friend_Now_Message', MsgData)
              }
          }
          if(identical == false){
            let MsgData = this.Friend_Now_Message
            MsgData[data.from_user.uid] = {
              'uid':data.from_user.uid,
              'avatar':data.from_user.avatar,
              'nickname':data.from_user.nickname,
              'unread':1
            }
            this.$store.dispatch('Friend_Now_Message', MsgData)
          }
      }else{
        let MsgData
        MsgData[data.from_user.uid] = {
            uid:data.from_user.uid,
            avatar:data.from_user.avatar,
            nickname:data.from_user.nickname,
            unread:1
          }
          this.$store.dispatch('Friend_Now_Message', MsgData)
      }
    },
    //统计房间消息数量
    show_roomMessage(data){

      //当接到群消息的时候 判断有没有群消息
      var identical_2 = false   //创建一个变量来判断有没有 相同id的
      if(!this.Group_Now_Message){
        let number = data.room_id
        let msgnum = new Object
        msgnum[number] = 1
        this.$store.dispatch('Group_Now_Message',msgnum)  //单个消息
        this.$store.dispatch('Group_Msg_total',1)           //全部统计的消息
      }else{
        for(var i in this.Group_Now_Message){
            if(i == data.room_id){
              identical_2 = true
              let addmsg = Number(this.Group_Now_Message[i]) + 1
              let msgnum = this.Group_Now_Message
                msgnum[i] = addmsg
              this.$store.dispatch('Group_Now_Message', '')
              this.$store.dispatch('Group_Now_Message', msgnum)
            }
        }
        if(identical_2 == false){
          let number = data.room_id
          let msgnum = this.Group_Now_Message
          msgnum[number] = 1
          this.$store.dispatch('Group_Now_Message', '')
          this.$store.dispatch('Group_Now_Message',msgnum)
        }
        var total = 0
        for(var n in this.Group_Now_Message){
            total = total + Number(this.Group_Now_Message[n])
        }
        this.$store.dispatch('Group_Msg_total',total)
      }

      var identical_3 = false   //创建一个变量来判断有没有 相同id的
      if(!this.Group_Message_msgList){
        let number = data.room_id
        let msglist = new Object
        if(typeof data.content == 'object'){
            msglist[number] = data.from_user.nickname + '：[红包]'
        }else{
            msglist[number] = data.from_user.nickname  + '：' + data.content 
        }
        
        this.$store.dispatch('Group_Message_msgList',msglist)  //单个消息
        this.$store.dispatch('Group_Msg_total',1)           //全部统计的消息
      }else{
        for(var i in this.Group_Message_msgList){
            if(i == data.room_id){
              identical_3 = true
              let msglist = this.Group_Message_msgList
              if(typeof data.content == 'object'){
                  msglist[i] = data.from_user.nickname + '：[红包]'
              }else{
                  msglist[i] = data.from_user.nickname  + '：' + data.content
              }
              this.$store.dispatch('Group_Message_msgList', '')
              this.$store.dispatch('Group_Message_msgList', msglist)
            }
        }
        if(identical_3 == false){
          let number = data.room_id
          let msglist = this.Group_Message_msgList
          if(typeof data.content == 'object'){
              msglist[number] = data.from_user.nickname + '：[红包]'
          }else{
              msglist[number] = data.from_user.nickname  + '：' + data.content
          }
          this.$store.dispatch('Group_Message_msgList', '')
          this.$store.dispatch('Group_Message_msgList', msglist)
        }
      }

    },
    //显出结算
    show_settlement(data){
      this.pack_info = data
      this.open_settlement = true
      
      setTimeout(()=>{
        this.open_settlement = false;
      },10000)
    },
    //去好友
    go_friend(){
      let item = {
        headimgurl:this.private_msg.from_user.avatar,
        nickname:this.private_msg.from_user.nickname,
        user_id:this.private_msg.from_user.uid,
      }

      this.$store.dispatch('savePrivateChatData', item) // 存储房间的信息到状态和本地上
      if(this.$route.path != '/home'){
        this.$router.push({name: 'home'})
      }
      setTimeout(()=>{
        this.$router.push({name: 'PrivateChat'})
      },50)
      
      this.open_show = false
    },
    //去查看红包详情 结算
    go_settlement(){
      this.open_partivulars= true
      this.open_settlement = false
    },
    close_friend(){
      this.open_show = false
    },
    close_settlement(){
      this.open_settlement = false
    },
    watch_web(){
      // this.watch_socket = setInterval(() => {
      //   if(this.global.ws.readyState != 1 &&  this.Websocket_status && this.Websocket_status == 'hall' && this.token){
      //     this.runWebsocket = true
      //     this.is_relink = true
      //     this.initWebSocket()
      // }
      // }, 2000);
    }
  },
  mounted() {  
      this.global.setWs(this.ws);
      if(this.Websocket_status && this.Websocket_status == 'hall' ){
        this.initWebSocket();
      }
      this.watch_web();
  },
  computed: {
    ...mapState([
      'token', 
      'Websocket_status',
      'PrivateChatData',//私聊数据
      'Friend_Now_Message', //好友 数据
      'Group_Now_Message', //群消息个数 数据
      'Group_Message_msgList',//群消息 数据
      'RoomData',//房间数据
      'Red_Room_list' //红包房间列表
    ]),
  },
  watch: {
    // 'token'(){
    //   if(this.token && this.token == 'true'){
    //     this.initWebSocket();
    //   }
    // },
    'Websocket_status'(){
      if(this.Websocket_status && this.Websocket_status == 'hall' && this.token){
        if(this.global.ws.readyState != 1){
          this.runWebsocket = true
        }
        this.initWebSocket()
      }
      if(this.Websocket_status == 'private' || this.Websocket_status == 'room'){
        // clearInterval(this.ping)
        clearInterval(this.watch_socket)
      }
    },
  },

  filters:{
     type_name(v){
         if(v==1) return '扫雷红包';
         if(v==2) return '牛牛红包';
         if(v==3) return '牛牛红包';
         if(v==4) return '禁枪红包';
         if(v==5) return '接龙红包';
     }
  }
}
</script>

<style lang="scss" scoped>
.no-msg {
  z-index: 10000;
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background:#eeeeee url(assets/img/isWchat.jpg) no-repeat;
  background-size: 100% auto;
}
.into-enter-active, .into-leave-active {
    transition: all .3s ease;
}
 .into-enter, .into-leave-to {
   transform: translate(50%,0%);
   opacity:0;
}




.GG-enter-active, .GG-leave-active {
    transition: all .3s ease;
}
 .GG-enter, .GG-leave-to {
   transform: translate(0%,-100%);
   opacity:0;
}
.Go_downward{
  margin:2.7rem .1rem 0;
  width: 9.8rem;
  height: 2rem;
  background-color:rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: fixed;
  z-index: 10000;
  overflow: hidden;
  padding: .2rem 0;
}

// 全局的通信样式
.G-message{
  width: 9.8rem;
  height: 2rem;
  margin: .1rem;
  background-color:rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: fixed;
  z-index: 10000;
  overflow: hidden;
  padding: .2rem 0;
}

.G_left{
  width: 80%;
  height: 2rem;
  // background-color: aqua;
  float: left;
}
.G_top{
  width: 100%;
  height: .6rem;
  // background-color: blueviolet;
  font-size: .3rem;
  box-sizing: border-box;
  padding: .1rem .3rem;
  color:  rgb(112, 112, 112);
}
.G_name{
  width: 100%;
  height: .6rem;
  line-height: .6rem;
  // background-color: rgb(98, 102, 138);
  font-size: .4rem;
  font-weight: bold;
  box-sizing: border-box;
  padding: 0 .3rem;
}
.G_msg{
  width: 100%;
  height: .8rem;
  line-height: .8rem;
  // background-color: rgb(226, 43, 113);
  box-sizing: border-box;
  padding:0 .3rem;
  font-size: .4rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color: rgb(112, 112, 112);
}
.G_right{
  width: 20%;
  height: 2rem;
  // background-color: aquamarine;
  float: left;
  position: relative;
}
.G_avatar{
   width:1.4rem;
   height: 1.4rem;
   position: absolute;
   bottom:0rem;
   margin:.1rem .3rem ;
   overflow: hidden;
   border-radius: 3px;
}
.G_avatar img{
  width: 100%;
  height: 100%;
}



// 红包详情


/* 发红包的地域 */
.red_world{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 800;
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
    background: url(assets/img/ChatRoom/ic_arrow_back_white_24dp.png) no-repeat;
    background-size: 60%;
    background-position: center;
    position: absolute;
    top:0;
    left: 0;
}
/* 垫底 */
.red_world_title{
    width: 100%;
    height: 1.2rem;
    font-size: .45rem;
    font-weight: 600;
    text-align: center
}
</style>