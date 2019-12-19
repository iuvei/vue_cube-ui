<template>
<div class="bg">
     <TopHeader :goHome='0'/>
     <div class="select_area">
        <div class="item" v-for="(item,i) in create_room_data"   
            :key="i" @click="select(item)">
            <img :src="item.img" :class="roomType == item.value ? 'active' : ''">
            <div class="item_name">{{item.text}}</div>
        </div>

     </div>
         <cube-input class="amount"  :type="type" placeholder='请填写该房间发包最小金额'  v-model="min_money"></cube-input>
         <cube-input class="amount"  :type="type" placeholder='请填写该房间发包最大金额'  v-model="max_money"></cube-input>
     
     <a class="nz_button nz_bg_gradual_orange nz_color_white" @click="GOcreate()"> 创 建 </a> 
</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'
export default {
  name: 'createRoom',
  components: { TopHeader },
  data () {
    return {
        create_room_data:[
        {'text':'红包扫雷','value': 1,'img':require('../assets/img/createRoom/saolei.png')},
        {'text':'牛牛不翻倍','value': 2 ,'img':require('../assets/img/createRoom/no-niu.png')},
        {'text':'牛牛翻倍','value': 3 ,'img':require('../assets/img/createRoom/niuniu.png')},
        // {'text':'禁抢','value': 4 ,'img':require('../assets/img/createRoom/jinqiang.png')}, //禁枪 不允许创建自建房
        {'text':'接龙','value': 5 ,'img':require('../assets/img/createRoom/jielong.png')}
      ],
      roomType:'', //房间类型
      roomName:'',//房间名字
      min_money:'',
      max_money:'',
      type:'number',
    }
  },
  methods:{
      select(item){
          this.roomType = item.value
          this.roomName = item.text
      },
      GOcreate(){
          if(!this.roomName) return this.$createToast({time: 1000, txt: '请选择房间类型', type:'txt'}).show() 
          if(!this.min_money) return this.$createToast({time: 1000, txt: '请填写最小金额', type:'txt'}).show() 
          if(!this.max_money) return this.$createToast({time: 1000, txt: '请填写最大金额', type:'txt'}).show() 
          if(Number(this.max_money) < Number(this.min_money)) return this.$createToast({time: 1000, txt: '最大金额要大于最小金额', type:'txt'}).show() 
          this.$createDialog({
            type: 'confirm',
            content: `<div style="width:100%; text-align:center">确认创建房间信息</div><br/>房间类型: ${this.roomName} <br/>最小金额: ${this.min_money} <br/>最大金额: ${this.max_money}`,
            confirmBtn: {
                text: '确定创建',
                active: true,
                disabled: false,
                href: 'javascript:;'
                },
            onConfirm: () => {
                this.$http.post('api/chat/index/createRoom',{'room_type':this.roomType,'min_money':Number(this.min_money),'max_money':Number(this.max_money)}).then(res=>{
                    this.$createToast({
                        type: 'text',
                        time: 1000,
                        txt: res.data.msg,
                    }).show()
                    if(res.data.code == 0){
                        this.upload_roomList()
                        setTimeout(()=>{
                            this.$createToast({
                                type: 'text',
                                time: 1000,
                                txt: '房间创建成功! 正在跳转到首页'
                            }).show()
                            setTimeout(()=>{
                                // this.$router.push('/home')
                                this.$router.push({name: 'home', params:{LowNumber: 0}})
                            },500)
                        },500)
                    }
                })
            },
        }).show()
      },

      //刷新房间列表的方法
        upload_roomList(){
            this.$http.post('/api/chat/index/roomList').then(res=>{
                if(res && res.data.code == 0 ){
                if(res.data.list.sys_room_list && res.data.list.sys_room_list.length > 0){
                    res.data.list.sys_room_list.forEach(item => {
                        item.homePage = 1
                        item.room_form = 'sys_room_list'
                    });
                }
                if(res.data.list.self_room_list && res.data.list.self_room_list.length > 0){
                    res.data.list.self_room_list.forEach(item => {
                        item.homePage = 1
                        item.room_form = 'self_room_list'
                    });
                }
                if(res.data.list.agent_room_list && res.data.list.agent_room_list.length > 0){
                    res.data.list.agent_room_list.forEach(item => {
                        item.homePage = 1
                        item.room_form = 'agent_room_list'
                    });
                }
                this.Red_Room_list = res.data.list
                this.$store.dispatch('Red_Room_list', this.Red_Room_list)
                }
            })
        },
  }
 
}
</script>

<style scoped>

.bg{
    min-height: 100vh;
    background-color: aliceblue;
}
.select_area{
    width: 9rem;
    margin: .5rem auto;
    overflow: hidden;
}

.item{
    width: 2.6rem;
    height: 2.6rem;
    margin: .5rem .2rem ;
    float: left;
}
.item img{
    display: block;
    width: 2rem;
    height: 2rem;
    margin: 0 .3rem;
    box-sizing: border-box;
    border-radius: 14px;
}
.active{
    box-sizing: border-box;
    border: 1px solid rgba(75, 150, 235, 0.4) !important;
    box-shadow: 0px 0px 10px -1px rgb(0, 255, 255) !important;
}
.item_name{
    width: 2.6rem;
    height: .6rem;
    line-height: .6rem;
    font-size: .4rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: center;
}

.amount{
    width: 9rem;
    height: 1rem;
    margin: .2rem auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px 1px 5px -1px #333;
    overflow: hidden;
}
</style>