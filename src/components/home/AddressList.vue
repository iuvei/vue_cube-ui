<template>
<div><!-- 通讯录 -->
        <!-- 头部 -->
        <HomeHeader :msg="msg"></HomeHeader>

<div class="box">
  <!-- 没有好友的情况 页面 -->
<div class="no_friend" v-if="!addressData">
  您还没有好友哦，快去邀请添加吧！
</div>
<cube-index-list :data="addressData" v-if="addressData" :options="options">

    <cube-index-list-group
      v-for="(group, index) in addressData" :key="index" :group="group"  v-show="group.items.length > 0" >
      <cube-index-list-item
        v-for="(item,index) in group.items" :key="index" :item="item"
        @select="selectItem" class="custom-list">
        <div class="custom-item">
          <!-- <i>头像</i> -->
          <img src="../../assets/img/PersonalCenter/ic_user_avatar.png" v-if="item.headimgurl == 'null'|| !item.headimgurl || item.headimgurl=='' ">
          <img :src="item.headimgurl" v-else>
          {{item.nickname}}</div>
      </cube-index-list-item>
    </cube-index-list-group>

</cube-index-list>
</div>
        

</div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader'
import {mapState} from 'vuex'

export default {
  name: 'ActvityReward',
  components: { HomeHeader },
  data () {
    return {
      msg:'通讯录',
      options:{
          click:false,
      },
      addressData:[],//创建一个数组
      alphabet:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#']
    }
  },
  created() {
    this.addressData = [
        { "name": "☆",
          "items": [ {"nickname": this.$store.state.NickName, "user_id": this.MyUid ,'headimgurl':this.$store.state.HeadImgurl},]
        }
      ];
    this.getBookAddress() //获得通讯录
  },
  computed: {
    ...mapState([
      'MyUid',// 我的用户id
    ]),
  },
  methods:{
    selectItem(item) {
      // if(item.user_id == this.MyUid){
      //     return this.$createToast({time: 1000, txt: '自己不能找自己聊天哦!~', type:'txt'}).show()
      // }
      if(this.global.ws.readyState != 1){
        return this.$createToast({time: 2000, txt:'网络异常，尝试重新连接', type:'txt'}).show()
      }
      this.$store.dispatch('savePrivateChatData', item) // 存储房间的信息到状态和本地上
      this.$router.push({path: 'PrivateChat',query:{goHome:3}})
    },
    getBookAddress(){

      
      if(JSON.parse(window.sessionStorage.getItem('Address_list'))){
        this.addressData = JSON.parse(window.sessionStorage.getItem('Address_list'))
      }else{
          this.alphabet.forEach(item=>{
              this.addressData.push({
                'name':item,
                'items':[]
              })
          })
          this.$http.post('api/chat/index/bookAddress').then(res=>{
              let r = res.data.list
              r.forEach(item=>{
                  this.addressData.forEach(i=>{
                        if(item.first == i.name){
                          i.items.push({
                            'nickname':item.nickname,
                            'user_id':item.user_id,
                            'headimgurl':item.headimgurl,
                          })
                        }
                  })
              })
              this.$store.dispatch('Address_list', this.addressData)
          })
      }
    }



  },

 
}
</script>



<style scoped>
.box{
  width: 100%;
  height: calc(100vh - 2.6rem);
  background-color: rgb(241, 241, 241);
}



.custom-item{
  height: 1rem;
  line-height: 1rem;
  padding: .1rem .2rem;
  font-size: .36rem;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(219, 219, 219);
}
/* 让最后一个不要显示下划线 */
.custom-list:last-child .custom-item{
  border-bottom: none
}


/* 头像 */
.custom-item img {
  display:block;
  width: .9rem;
  height: .9rem;
  margin: .05rem ;
  margin-right: .3rem;
  text-align: center;
  border-radius: 3px;
  font-size: .2rem;
  background-color: rgb(214, 214, 214);
  float: left;
}

.no_friend{
  width: 100%;
  height: calc(100vh - 2.6rem);
  line-height: calc(100vh - 2.6rem);
  text-align: center;
  font-size: .5rem;
  background-color: rgb(241, 241, 241);
  text-shadow: .1rem .1rem 2px rgb(110, 105, 105);
}





</style>

<style>
/* 修改通讯录 一项的标题的样式 */
.cube-index-list-anchor {
    padding: 0.3rem 0.4rem 0.2rem 0.3rem;
}
</style>
