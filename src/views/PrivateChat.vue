<template>
<div>
    <div class="top">
        <div class="goback"  @click="goHOME()">
            <i><icon-svg icon-class="fanhui2"/></i>
        </div>
        <div class="title">
            {{Now_PrivateChatData.nickname}}
        </div>
    </div>


    <!-- 聊天区域 -->
<!-- <div class="Chat_area" > -->
<div :class="open_emoji == true? 'emoji_Chat_area' : 'Chat_area' ">

    <div class="scroll-list-wrap">                        
    <cube-scroll  ref="scroll"  :options="pull_down"   :scroll-events="['scroll']" @scroll="scroll">
    <div>
        <div class="arrive_top_l" v-if="Now_ChatMsgData.length > 20"> - 到顶了 - </div>
        <div class="user_item" v-for="(item,i) in Now_ChatMsgData" :key="i">
        <div class="msg_time" v-if="item && item.timeSwitch">{{item.time}}</div>
        <!-- 头像那边 -->
        <div class="user_left" v-if="item.from_user.uid != my_uid">
            <img src="../assets/img/ChatRoom/ic_user_avatar.png" v-if="item.from_user.avatar == 'null'|| !item.from_user.avatar || item.from_user.avatar=='' ">
            <img :src="item.from_user.avatar" v-else>
        </div>

        <!-- 头像这边 -->
        <div class="my_user_left" v-if="item.from_user.uid == my_uid">
            <img src="../assets/img/ChatRoom/ic_user_avatar.png" v-if="item.from_user.avatar == 'null'|| !item.from_user.avatar || item.from_user.avatar=='' ">
            <img :src="item.from_user.avatar" v-else>
        </div>


            <!-- 消息那边 -->
            <div class="user_right" v-if="item.from_user.uid != my_uid">
                <!-- 昵称 -->
                <!-- <div class="user_name">{{item.from_user.nickname}}</div> -->
                <!-- 文字 == 2 -->
                <div v-if="item.content_type == 2">
                    <div class="triangle02"></div>
                    <div class="user_info">
                        {{item.content}}
                    </div>
                </div>
            </div>
            <!-- 右方end -->



            <!-- 消息这边 -->
            <div class="my_user_right" v-if="item.from_user.uid == my_uid">
                <!-- 昵称 -->
                <!-- <div class="my_user_name">{{item.from_user.nickname}}</div> -->
                <!-- 文字 item.content_type == 2 -->
                <div v-if="item.content_type == 2">
                    <div class="my_triangle02"></div>
                    <div class="my_user_info">
                        {{item.content}}
                    </div>
                </div>
            </div>
            <!-- 己方end -->

        </div>
    
    </div>
    
    </cube-scroll>
    </div>

</div>

    <!-- 底部区域 -->
     <div class="footer_area" >
         <div class="footer_input">
            <div @click="input_focus()" >
                <cube-input class="cube_input" v-model="input_msg" @keyup.enter.native="send_msg" :class="have_msg==true ? 'cube_input' : 'cube_input_false'" ref="input"></cube-input>
            </div>
            <div class="Emoji_input" @click="change_emoji()"><icon-svg icon-class="smiling"/></div>

            <!-- <transition name = "fade1">
                <div class="Add_input" v-if="!have_msg"><icon-svg icon-class="jiahao"/></div>
            </transition> -->
            <transition name = "fade2">
                <div class="send_input" v-if="have_msg" @click="send_msg()">发送</div>
            </transition>
        </div>
        

    <transition name = "xx">
        <div class="emoji_box" v-if="open_emoji">
            <cube-scroll>
                <div class="fudong">
                    <div class="emoji_item" v-for="(e,i) in emojiList" :key="i" @click="select_emoji(e)">{{e}}</div>
                </div>
            </cube-scroll>
        </div>
    </transition>
    </div>  

</div>
</template>

<script>
import {mapActions,mapState} from 'vuex'


const emojiList = [
    '😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘',
    '🥰','😗','😙','😚','🙂','🤗','🤩','🤔','😐','😑','😶','🙄','😏',
    '😣','😥','😮','🤐','😯','😪','😫','🤓','😴','😌','😛','😜','😝',
    '🤤','😒','😓','😔','😕','🙃','🤑','😲','🙁','😖','😞','😟','😤',
    '😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','😳',
    '🤪','😵','🥴','😠','😡','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇',
    '🥳','🥺','🤠','🤥','🤫','🌠','🌀','🌈','🌂','☔','⚡','⛄','🔥',
    '💧','🌞','🌜','🌊','⭐','🌌','🪐','🌍','🍔','🍟','🍓','🍒','🍑',
    '🍐','🍊','🍉','🍇','🥝','🎂','🍎','🍅'
]
export default {
  name: 'PrivateChat',
  data () {
    return {
        Now_PrivateChatData:'',//现在这个房间的数据
        Now_ChatMsgData:'',//聊天数据
        pull_down:{
          click:true,
          listenScroll: true,
          probeType: 3,
          pullDownRefresh:false,
        },
        ws:{} ,// 初始化websocket

        input_msg:'',

        Now_Y :'', //用户滑动的高度
        my_uid: this.MyUid,//用户id 登录的时候会传过来

        is_relink:false,//是在重新连接
        have_msg:false,//判断有没有消息
        open_emoji:false,

        emojiList:emojiList,

        is_relink:false,//重连
        ggws:'',
        relink:'',
        // ping:'',

        watch_socket:'',
    }
  },
  created() {
    this.$store.dispatch('Websocket_status','private')
    this.my_uid = this.MyUid
    if(typeof this.PrivateChatData != 'object'){
        this.Now_PrivateChatData = JSON.parse(this.PrivateChatData);
    }else{
        this.Now_PrivateChatData = this.PrivateChatData;
    }
    this.initWebSocket();//初始化
    // this.watch_web();//监听websocket
  },
  computed: {
    ...mapState([
      'PrivateChatData',//房间数据
      'token',
      'MyUid',
      'Websocket_status',
    ]),
  },
  methods:{
    changeEmoji(emoji) {
　　　 this.emoji = emoji
    },
    // 初始化WebSocket 在房间进行连接
  initWebSocket(){
      let that = this;

      if(!this.is_relink){
          var login_data = '{"type":"login","action":"private","to_id":"'+ this.Now_PrivateChatData.user_id +'","token":"'+ this.token +'"}';
          this.global.ws.send(login_data);
      }
      if(this.is_relink){
        this.ws = new WebSocket("ws://13.209.240.252:7272");
        this.global.setWs(this.ws);

        this.ws.onopen = evt => { 
        // if(this.Websocket_status == 'private'){
            if(this.ggws){
                clearInterval(this.ggws);
                this.ggws = ''
            }
            // 连接成功后 登录用户
            // if(this.Websocket_status == 'private'){
                var login_data = '{"type":"login","action":"private","to_id":"'+ this.Now_PrivateChatData.user_id +'","token":"'+ this.token +'"}';
                this.ws.send(login_data);
                if(this.is_relink == true){
                    this.is_relink = false
                }
            // }
        // }
        };
      }

    this.global.ws.onmessage = evt=> {
         if(this.Websocket_status == 'private'){
            let data = JSON.parse(evt.data)
            console.log(data)
            //如果 类型是登录 就把登录拿到的历史数据 颠倒一下数组 然后放进 变量
            if(data.type == 'login'){
                this.Now_ChatMsgData = (data.record).reverse()
                if(this.is_relink == true){
                    relink.hide()
                    this.is_relink = false
                }
                    //   遍历数据 看看 消息的时间是否相近  是的话就不用显示消息时间 
                    if(this.Now_ChatMsgData.length > 0){
                        if(this.Now_ChatMsgData.length > 3){
                            for(let i=0; i<this.Now_ChatMsgData.length - 2;i++){
                                if(Date.parse(this.Now_ChatMsgData[i+1].time) - Date.parse(this.Now_ChatMsgData[i].time) > 600000 ){
                                    this.Now_ChatMsgData[i+1].timeSwitch = true
                                }else{
                                    this.Now_ChatMsgData[i+1].timeSwitch = false
                                }
                            }
                        }
                    this.Now_ChatMsgData[0].timeSwitch = true
                    }
                    

                    setTimeout(()=>{
                        // this.$refs.scroll.refresh()
                        this.$refs.scroll.scrollTo(0,this.$refs.scroll.scroll.maxScrollY,'0')
                    },1)
            }
            //如果 类型 是消息  且是 ==2  是文字类型 就把他塞进 循环数组里面
                if(data.type == 'message'){
                    this.Now_ChatMsgData.push(data)
                    
                        //判断用户是不是在往上看历史记录 如果是 就不要自动往下滑动了
                        if(this.Now_Y - this.$refs.scroll.scroll.maxScrollY < 400){
                            setTimeout(()=>{
                                this.$refs.scroll.scrollTo(0,this.$refs.scroll.scroll.maxScrollY,'500')
                            },1)
                        }
                }
                if(data.action == 'private' && !data.type){
                    this.$emit('show_private',data)
                }
                if(data.action == 'settlement'){
                    this.$emit('show_settlement',data)
                }
                //当红包接龙是最小的时候的自动发包提示
                if(data.action == 'auto_send' && data.type == 'pack'){
                this.$createToast({time: 3000, txt:data.msg, type:'txt'}).show()
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
    };
        // 断了 会重新自己连接
    this.global.ws.onclose = evt=> {
        if(!this.ggws && this.Websocket_status == 'private'){
        this.is_relink = true;
        this.initWebSocket()
        this.ggws = setInterval(() => {
            this.initWebSocket()
            }, 2000);
        }
    }
    this.global.ws.onerror = evt=> {
        if(!this.ggws && this.Websocket_status == 'private'){
            this.is_relink = true;
            this.initWebSocket()
            // this.relink = this.$createToast({time: 10000, txt:'正在连接...',mask: false, type:'txt'}).show();
        }
    }

  },
    scroll(obj) {
        // console.log(obj.y)
        this.Now_Y = obj.y
    },
    
    input_focus(){
        if(this.open_emoji){
            this.open_emoji = false
        }
        this.$refs.scroll.refresh() 
        setTimeout(()=>{
            
            this.$refs.scroll.scrollTo(0,this.$refs.scroll.scroll.maxScrollY,'50')
        },50)
    },
    change_emoji(){
        this.open_emoji = !this.open_emoji
        this.$refs.scroll.refresh() 
        setTimeout(()=>{
            this.$refs.scroll.refresh() 
            this.$refs.scroll.scrollTo(0,this.$refs.scroll.scroll.maxScrollY,'50')
        },50)
    },
    //选择emoji
    select_emoji(e){
        this.input_msg = this.input_msg + e
    },
    //发消息
    send_msg(){
        //点击发送的时候 先判断 有没有断链 如果断链的 就告诉网络异常
        if(this.global.ws.readyState != 1){
            this.$createToast({time: 2000, txt:'网络异常，重连中...', type:'txt'}).show()
            if(!this.ggws && !this.is_relink){
                this.is_relink = true;
                this.initWebSocket();
            }
            if(!this.open_emoji){
                this.$refs['input'].focus()
            }
            return;
        }
        let data = '{"type":"chat",  "action":"chat_private", "content_type":2, "nl2br":"0", "content": "'+ this.input_msg + '"}'
        this.global.ws.send(data);
        this.input_msg = '';
        if(!this.open_emoji){
            this.$refs['input'].focus()
        }
    },
    //回首页
    goHOME(number){
        if(this.ggws){
            clearInterval(this.ggws)
        }
        this.$router.push({name: 'home', params:{LowNumber: this.$route.query.goHome}})
    }
  },
  destroyed() {
    if(this.ggws){
        clearInterval(this.ggws)
    }
  },
   watch: {
       'input_msg'(){
           if(this.input_msg.length > 0){
               this.have_msg = true
           }else{
               this.have_msg = false 
           }
       }
   },
 
}
</script>

<style scoped>

.top{
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: #ededed;
    font-weight: 600;
    font-size: .46rem;
    color: #fff;
    font-family: 'Microsoft YaHei';
    position: fixed;
    z-index: 10;
}
.goback{
    height: 1.2rem;
    width: 1.2rem;
    font-weight: bold;
    font-size: .5rem;
    text-align: center;
    float: left;
    color: #444;
}

.title{
    width: 7.4rem;
    height: 1.2rem;
    font-size: .45rem;
    font-weight: 600;
    float: left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #000;
}





.Chat_area{
    width: 100%;
    height: calc(100vh - 2.4rem);
    /* background-color: aliceblue; */
    background-color: #ededed;
    position: absolute;
    bottom: 1.2rem;
    box-sizing: border-box;
    /* padding: .1rem; */
}
.emoji_Chat_area{
    width: 100%;
    height: calc(100vh - 8.4rem);
    /* background-color: aliceblue; */
    background-color: #ededed;
    position: absolute;
    top:1.2rem;
    box-sizing: border-box;
    padding: .1rem;
}


.scroll-list-wrap{
  width: 100%;
  height: 100%;  
  background-color: #ededed;
  /* background-color: #dfdfdf; */
  overflow: hidden;
}


.footer_area{
    width: 100%;
    /* height: 1.2rem; */
    position: absolute;
    bottom: 0;
    z-index: 100;
    background-color: #f7f7f7;
}
.cube_input{
    width: 7rem;
    height: .8rem;
    margin: .2rem;
    border-radius: 5px;
    overflow: hidden;
    border: none;
    background-color: #fff;
    float: left;
    transition: all .2s;
}
.cube_input_false{
    width: 8.6rem;
    height: .8rem;
    margin: .2rem;
    border-radius: 5px;
    overflow: hidden;
    border: none;
    background-color: #fff;
    float: left;
    transition: all .2s;
}

.Emoji_input{
    width: .8rem;
    height: .8rem;
    line-height: .8rem;
    margin: .2rem 0;
    overflow: hidden;
    float: left;
    font-size: .68rem;
}
.Add_input{
    width: .8rem;
    height: .8rem;
    line-height: .8rem;
    margin: .2rem .1rem;
    overflow: hidden;
    float: left;
    font-size: .74rem;
    font-weight: bold;
    transition: all .1s;
}
.send_input{
    width: 1.6rem;
    height: .8rem;
    line-height: .8rem;
    margin: .2rem .1rem;
    overflow: hidden;
    float: left;
    background-color: #07c160;
    border-radius: 3px;
    font-size: .4rem;
    text-align: center;
    color: #e4fff1;
}



.user_item{
    width:9.4rem;
    min-height: 1rem;
    margin: .2rem auto;
    overflow: hidden;
}
.user_left{
    width: 1rem;
    height:1rem;
    /* background-color: yellow; */
    float: left;
}
.my_user_left{
    width: 1rem;
    height:1rem;
    /* background-color: yellow; */
    float: right;
}
.user_left img{
    width: 1rem;
    height:1rem;
    border-radius: 5px;
}
.my_user_left img{
    width: 1rem;
    height:1rem;
    border-radius: 5px;
}
.user_right{
    max-width: 7rem;
    min-height:1.4rem;
    float: left;
    position: relative;
}
.my_user_right{
    max-width: 7rem;
    min-height:1.4rem;
    float: right;
    position: relative;
}
.user_name{
    height:.46rem;
    font-size: .34rem;
    box-sizing: border-box;
    position: relative;
    left: .4rem;
}
.my_user_name{
    height:.6rem;
    font-size: .4rem;
    box-sizing: border-box;
    padding: .1rem .4rem;
    text-align: right;
}
/* 用户消息样式 */
.user_info{
    margin:0 .2rem .2rem .3rem;
    min-height:.8rem;
    background-color: #ffffff;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: .1rem .1rem .4rem -.4rem #333;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
}
.my_user_info{
    margin:0 .3rem .2rem .2rem;
    min-height:.8rem;
    /* background-color: #ffffff; */
    background-color: #95ec69;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: .1rem .1rem .4rem -.4rem #333;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
    text-align: right;
}
.triangle02{
    width: 0;
    height: 0;
    border-top: .3rem solid transparent ;
    border-right: .36rem solid rgb(255, 255, 255);
    border-bottom: .3rem solid transparent ;
    border-left: .52rem solid transparent ;
    position: absolute;
    top:.2rem;
    left: -.35rem;
}
.my_triangle02{
    width: 0;
    height: 0;
    border-top: .3rem solid transparent ;
    border-right: .52rem solid transparent ;
    border-bottom: .3rem solid transparent ;
    border-left: .36rem solid #95ec69;
    position: absolute;
    top:.17rem;
    right: -.35rem;
}

/* 到顶了 */
.arrive_top_l{
    width: 2rem;
    height: .5rem;
    line-height: .5rem;
    font-size: .4rem;
    text-align: center;
    margin: .1rem auto;
}


.fade1-enter-active{
    transition: all .3s ease;
}
.fade1-leave-active {
    transition: all .3s ease;
}
 .fade1-enter{
   transform: scale(0, 0);
}
.fade1-leave-to {
    transform: scale(0, 0);
}

.fade2-enter-active{
    transition: all .5s ease;
}
.fade2-leave-active {
    transition: all 1s ease;
}
 .fade2-enter{
   transform: scale(0, 0);
}
.fade2-leave-to {
   transform: translate(200%,0);
}


.msg_time{
    width: 4rem;
    height: .5rem;
    line-height: .5rem;
    margin:0 auto .3rem;
    text-align: center;
    font-size: .32rem;
    border-radius: 10px;
    background-color: #dadada;
}


.footer_input{
    display: block;
    overflow: hidden;
    height: 1.2rem;
}
.emoji_box{
    position: relative;
    width: 100%;
    height: 6rem;
    background-color: #f7f7f7;;
    overflow: hidden;
}
.fudong{
    overflow: hidden;
}
.emoji_item{
    width: 1.25rem;
    height: 1.25rem;
    line-height: 1.25rem;
    text-align: center;
    /* background-color: #333; */
    font-size: .56rem;
    float: left;
}

.xx-enter-active, .xx-leave-active {
    transition: all .1s ease;
}
 .xx-enter, .xx-leave-to {
   height: 0;
   opacity:0;
}

</style>
<style>
.cube_input input:focus{
    outline:none !important;
}
.cube-input-field:focus{
    outline:none !important;
}
.cube_input-active{
     outline:none !important;
}

</style>