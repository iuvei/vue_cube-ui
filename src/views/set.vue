<template>
<div class="bg">
     <TopHeader :goHome='4'/>
        <div class="item" @click="change_HeadImgurl_button()">
            <div class="item_l">头像</div>
            <div class="item_r">
                <img  src="../assets/img/PersonalCenter/ic_user_avatar.png" v-if="change_HeadImgurl == 'null'|| !change_HeadImgurl || change_HeadImgurl=='' ">
                <img :src="change_HeadImgurl" v-else>
            </div>
        </div>
        
        <div class="item" @click="change_NickName_button()">
            <div class="item_l">昵称</div>
            <div class="item_r">{{change_NickName}}</div>
        </div>

        <div class="item">
            <div class="item_l">性别</div>
            <div class="item_r">{{isSex == 1 ? '男' : '女'}}</div>
        </div>



        <a class="nz_button nz_bg_gradual_orange nz_color_white" @click="save_button()">保存</a>
</div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import TopHeader from '@/components/common/TopHeader'

export default {
  name: 'set',
  components: { TopHeader },
  data () {
    return {
        isSex:'',//男女图标
        change_NickName:'',
        change_HeadImgurl:'',
        changed: false, //没有修改过
    }
  },
  computed: {
    ...mapState([
      'userName',//这个是账号 登录用的
      'NickName',//这个是昵称  昵称一般在注册后 默认跟账号名一样 后面可以修改
      'HeadImgurl',//用户头像 默认是null 没有 后面自己换头像
      'Other',     //附加信息
    ]),
  },
  mounted() {
    this.sex()
  },
  created() {
      this.change_NickName = this.NickName  //把状态里的昵称 放到可以修改的昵称变量里来
      this.change_HeadImgurl = this.HeadImgurl  //把状态里的昵称 放到可以修改的昵称变量里来
  },
  methods:{
      sex(){
            let OtherData = this.Other
            if(typeof OtherData != 'object'){
                OtherData = JSON.parse(OtherData)
            }
              OtherData.forEach(item=>{
              if(item.name == 'sex' ){
                  this.isSex = item.status
              }
            })
      },
      //修改昵称
      change_NickName_button(){
            this.dialog = this.$createDialog({
                type: 'prompt',
                title: '修改昵称',
                prompt: {
                value: '',
                placeholder: '请输入修改的昵称'
                },
                onConfirm: (e, promptValue) => {
                    this.change_NickName = promptValue
                    this.changed = true ; //修改过
                }
            }).show()
      },
      //修改头像
      change_HeadImgurl_button(){
            this.dialog = this.$createDialog({
                type: 'prompt',
                title: '修改头像',
                prompt: {
                value: '',
                placeholder: '请输入图片url地址'
                },
                onConfirm: (e, promptValue) => {
                    this.change_HeadImgurl = promptValue
                    this.changed = true ; //修改过
                    console.log(this.change_HeadImgurl)
                }
            }).show()
      },
      //保存修改的
      save_button(){
          if(this.changed == true){
              this.$http.post('api/chat/index/updateBaseInfo',{'nick_name':this.change_NickName , 'head_image':this.change_HeadImgurl}).then(res=>{
                  console.log(res)
                    this.$createToast({
                        type: 'text',
                        time: 1000,
                        txt: res.data.msg
                    }).show()
                    if(res.data.code == 0 ){
                        this.changed = false
                        this.$store.dispatch('saveNickName', this.change_NickName)
                        this.$store.dispatch('saveHeadImgurl', this.change_HeadImgurl)
                    }
              })
          }else{
              this.$createToast({
                    type: 'text',
                    time: 1000,
                    txt: '你没有修改任何东西哦!'
                }).show()
          }
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

.item{
    width: 9.2rem;
    padding: .3rem .4rem;
    font-size: .4rem;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(231, 231, 231);
    overflow: hidden;
    position: relative;
}
.item_l{
    float: left;
    position: absolute;
    top: 50%;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
}
.item_r{
    float: right;
}
.item_r img{
    width: 2rem;
    height: 2rem;
    border-radius: 5px;
}
</style>