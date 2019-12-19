<template>
<div><!-- 我的  -->




<div class="scroll-list-wrap">


  <cube-scroll
    ref="scroll"
    :scroll-events="['scroll']"
    :data="[]"
    :options="options"
    @scroll="onScrollHandle"
    @pulling-down="onPullingDown">
    <div>
              <!-- <template slot="pulldown" slot-scope="props">
                <div
                    v-if="props.pullDownRefresh"
                    class="cube-pulldown-wrapper"
                    :style="pullDownStyle">
                  <div class="pulldown-content">
                    <span v-if="props.beforePullDown">{{ pullDownTip }}</span>
                    <template v-else>
                      <span v-if="props.isPullingDown">正在更新...</span>
                      <span v-else>更新成功</span>
                    </template>
                  </div>
                </div>
              </template> -->

    <!-- 标题头部 -->
    <div class="topTitle">
          <!-- 头像 -->
           <router-link class="menu_item"  to="/set">
              <div class="portrait_area">
                <img  src="../../assets/img/PersonalCenter/ic_user_avatar.png" v-if="HeadImgurl == 'null'|| !HeadImgurl || HeadImgurl=='' ">
                <img :src="HeadImgurl" v-else>
              </div>
           </router-link>
          <!-- 名字 / 账号 -->
          <div class="name_area">
            <div class="name">
              <div>{{NickName}}</div> 
              <img src="../../assets/img/PersonalCenter/ic_male.png"  v-if="isSex == 1 ">
              <img src="../../assets/img/PersonalCenter/ic_female.png"  v-if="isSex == 2 ">
            </div>
            <div class="area">
                账号:{{userName}}
            </div>
          </div>

          <!-- 金币图像 和金额 -->
          <div class="money_area">
            <div class="money">
              金额:{{userMoney}}元
            </div>
          </div>
    </div>

    <!-- 代理中心 分享 -->
    <div class="agency_share">
        <router-link class="agrncy" to="/agencyHub" tag="div">
            <i></i>
            <div>代理中心</div>
        </router-link>  
        <router-link class="share" to="/shareHub" tag="div" v-if="PromoteCode">
            <i></i>
            <div>分享</div>
        </router-link>
        <!-- 当没有推广码的时候不显示 -->
        <div class="share"  v-else> 
            <i></i>
            <div>分享</div>
        </div>
    </div>

    <!-- 个人中心菜单 -->
    <ul class="menu">
      <li class="menu_item" v-if="PromoteCode">
        <i class="icon_front nz_yqm"><icon-svg icon-class="yaoqingma"/></i> 
        <div>邀请码 
        <i class="icon icon_copy" :data-clipboard-text="(url + PromoteCode)" @click="copy()"></i>
        <span class="invite_num">{{PromoteCode}}</span></div>
      </li>
      <router-link class="menu_item" tag="li" to="/recharge">
        <i class="icon_front nz_czzx"><icon-svg icon-class="48"/></i> 
        <div>充值中心
        <i class="icon cubeic-arrow"></i></div>
      </router-link>
      <router-link class="menu_item" tag="li" to="/withdraw">
        <i class="icon_front nz_tgzx"><icon-svg icon-class="qianbao-"/></i> 
        <div>提现中心 
        <i class="icon cubeic-arrow"></i></div>
      </router-link>
      <router-link class="menu_item" tag="li" to="/transfer">
        <i class="icon_front nz_edzh"><icon-svg icon-class="qianbao-"/></i> 
        <div>额度转换 
        <i class="icon cubeic-arrow"></i></div>
      </router-link>
      <router-link class="menu_item" tag="li" to="/roomReport">
        <i class="icon_front nz_fjbb"><icon-svg icon-class="chengshi"/></i> 
        <div>房间报表
        <i class="icon cubeic-arrow"></i></div>
      </router-link>
      <router-link class="menu_item" tag="li" to="/sendRedPack">
        <i class="icon_front nz_fbjl"><icon-svg icon-class="zhangdan"/></i> 
        <div>发包记录
        <i class="icon cubeic-arrow"></i></div>
      </router-link>
      <router-link class="menu_item" tag="li" to="/ChessRecord">
        <i class="icon_front nz_qpjl"><icon-svg icon-class="zhangdan"/></i> 
        <div>棋牌记录
        <i class="icon cubeic-arrow"></i></div>
      </router-link>
      <router-link class="menu_item" tag="li" to="/HelpCenter">
        <i class="icon_front nz_bzzx"><icon-svg icon-class="weibiaoti-"/></i> 
        <div>帮助中心 
        <i class="icon cubeic-arrow"></i></div>
      </router-link>
      <li class="menu_item">
        <a :href="$store.state.WebData.SiteService">
        <i class="icon_front nz_zxkf"><icon-svg icon-class="kefu"/></i> 
        <div> 在线客服 
        <i class="icon cubeic-arrow"></i></div>
        </a>
      </li>
    </ul>
    <ul class="menu">
      <router-link class="menu_item" tag="li" to="/set">
        <i class="icon_front nz_set"><icon-svg icon-class="shezhi"/></i> 
        <div>设置 
        <i class="icon cubeic-arrow"></i></div>
      </router-link>
      <li class="menu_item" @click="exit()">
        <i class="icon_front nz_exit"><icon-svg icon-class="tuichu2"/></i> 
        <div>退出 
        <i class="icon cubeic-arrow"></i></div>
      </li>
    </ul>
    
    <!-- 占位置 苹果手机有奇奇怪怪的问题 要不拉不到下面... -->
    <div class="nz_placeholder"></div>
  </div>
  </cube-scroll>

</div>




</div>
</template>

<script>
import Clipboard from 'clipboard';
import {mapActions,mapState} from 'vuex'
export default {
  name: 'PersonalCenter',
  data () {
    return {
      msg:'我的',
      isSex:'',//男女图标
      options: {
        pullDownRefresh: false
      },
      
      pullDownY: 0, //下拉的距离
      url:window.location.host + '/#/?key=',
      pullDownStyle: '',//下拉的距离css样式
      triggerSurpriseFlag: false,//这个是先定义成false 等拉到超过一个位置改为true 强制刷新用的
    }
  },
  created() {
    //判断是男是女  通过循环 Other这个附加信息表 找到里面name是sex的 对象 然后返回 status 1是男 2是女
      
  },
  mounted() {
    this.sex()
  },
  computed: {
    ...mapState([
      'userName',//这个是账号 登录用的
      'NickName',//这个是昵称  昵称一般在注册后 默认跟账号名一样 后面可以修改
      'userMoney', //余额
      'PromoteCode',//推广码
      'HeadImgurl',//用户头像 默认是null 没有 后面自己换头像
      'Other',     //附加信息
    ]),

    // 以下是关于滑动的
    pullDownTip() {
      if (this.pullDownY <= 60) {
        return '下拉刷新...'
      } else if (this.pullDownY <= 90) {
        return '继续下拉有惊喜...'
      } else {
        return '松手得惊喜！'
      }
    },
    headerStyle() {
      return Math.min(1, Math.max(0, 1 - this.pullDownY / 40))
    }
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
      onPullingDown() {
        // 模拟更新数据
        // 当拉的距离大于90  就马上刷新  否则就一秒后刷新
        if (this.triggerSurpriseFlag) {
            this.$refs.scroll.forceUpdate()
            return
        }
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 1000)
      },
      
      onScrollHandle(pos) {
          // console.log(pos)   // 根据 :scroll-events="['scroll']"  打印出滑动的位置
          this.pullDownY = pos.y

          if (pos.y > 0) {
            this.pullDownStyle = `top:${pos.y}px`
            this.triggerSurpriseFlag = false
          if (this.pullDownY > 90) {
            this.triggerSurpriseFlag = true
          }
        }
      },
      // 复制
      copy(){
        var clipboard = new Clipboard('.icon_copy')
        clipboard.on('success', e => {
          this.$createToast({
            time: 1000,
            txt: '复制成功',
            type:'txt'
          }).show()
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$createToast({
            time: 1000,
            txt: '该浏览器不支持自动复制',
            type:'txt'
          }).show()
          // 释放内存
          clipboard.destroy()
        })
      },
      //退出登录
      exit(){
        this.$createActionSheet({
        data: [
          { 
            content: '下次不自动登录 并 退出',
          },
          {
            content: '不记住密码 并 退出',
          }
        ],
        onSelect: (item, index) => {
          if(index == 0){
              window.localStorage.setItem('auto_logIn','false');
          }
          if(index == 1){
              window.localStorage.setItem('auto_logIn','false');
              window.localStorage.setItem('password','');
          }
          this.$store.dispatch('Websocket_status','');
          window.sessionStorage.setItem('access_token','');
          if(!window.sessionStorage.getItem('access_token')){
              this.$router.push('/');
          }
        }
      }).show()

      }
    },

    
}
</script>


<style scoped>
a{
 color: rgb(94, 94, 94);
}
.nz_placeholder{
  width: 100%;
  height: 4rem;
}
  

.scroll-list-wrap{
  height: 100vh;
  background-color:rgb(243, 243, 243);
}


.topTitle{
  height: 3.61rem;
  background:url('../../assets/img/PersonalCenter/bg_me.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
/* 头像区域 */
.portrait_area{
  width: 1.6rem;
  height: 1.6rem;
  background-color: black;
  margin: 1.11rem .2rem .9rem .4rem;
  float: left;
  border-radius: 4px;
  overflow: hidden;
}
.portrait_area img{
  width: 100%;
  height: 100%;
}
/* 名字区域 */
.name_area{
  width: 4.4rem;
  height: 1.4rem;
  /* background-color: rgb(235, 1, 1); */
  margin: 1.21rem .1rem .4rem ;
  float: left;
}
.name_area .name{
  height: .7rem;
  line-height: .7rem;
  /* background-color: rgb(207, 204, 204); */
  font-size: .4rem;
  color: aliceblue;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.name_area .name div{
  height: .7rem;
  line-height: .7rem;
  float: left;
}
.name_area .name img{
  height: .6rem;
  line-height: .6rem;
  margin:.05rem .1rem;
  float: left;
}
.area{
  height: .7rem;
  line-height: .7rem;
  font-size: .4rem;
  color: aliceblue;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
/* 金币区域 */
.money_area{
  width: 3rem;
  height: 3.6rem;
  background-color: rgb(235, 1, 1);
  background: url(../../assets/img/PersonalCenter/ic_me_star.png) no-repeat;
  background-size: 90% auto;
  float: right;
  position: relative;
}
.money_area .money{
  max-width: 7.2rem;
  height: 1rem;
  line-height: 1rem;
  font-size: .4rem;
  color: #fff;
  position: absolute;
  padding-right: .5rem;
  bottom: 0;
  right: 0;
  /* background-color: rgb(41, 38, 243); */
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}


/* 代理与分享 */
.agency_share{
  width: 100%;
  height: 2.4rem;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
}
/* 代理 */
.agrncy{
  display: block;
  width: 50%;
  height:100%;
  float: left;
}
.agrncy i{
  display: block;
  width: 1.6rem;
  height:1.6rem;
  margin: auto;
  background-color: rgb(4, 5, 5);
  background:url(../../assets/img/PersonalCenter/ic_proxy_center.png) no-repeat;
  background-size: 60%;
  background-position: center;
}
.agrncy div{
  width: 100%;
  height:.8rem;
  margin: auto;
  /* background-color: rgb(136, 51, 51); */
  text-align: center;
  font-size: .4rem;
}

/* 分享 */
.share{
  display: block;
  width: 50%;
  height:100%;
  /* background-color: rgb(146, 21, 69); */
  float: left;
}
.share i{
  display: block;
  width: 1.6rem;
  height:1.6rem;
  margin: auto;
  background-color: rgb(4, 5, 5);
  background:url(../../assets/img/PersonalCenter/ic_user_money.png) no-repeat;
  background-size: 60%;
  background-position: center;
}
.share div{
  width: 100%;
  height:.8rem;
  margin: auto;
  /* background-color: rgb(136, 51, 51); */
  text-align: center;
  font-size: .4rem;
}

/* 菜单item */
.menu{
  margin-top: .1rem;
}
.menu_item{
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  font-size: .44rem;
  color: rgb(94, 94, 94);
  background-color: #fff;
  margin-bottom: 1px;
}
.icon_front{
  display: block;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: .5rem;
  float: left;
  margin:.1rem .2rem;
}
.menu_item .icon{
  height: 1.2rem;
  line-height: 1.2rem;
  font-size: .6rem;
  padding-right:.2rem; 
  float:right;
  color: rgb(138, 138, 138);
}
.invite_num{
  height:1.2rem;
  float:right;
}
.menu_item .icon_copy{
  width: 2rem;
  height: 1.2rem;
  line-height: 1.2rem;
  padding-right:.2rem; 
  float:right;
  /* background-color: black; */
  background: url(../../assets/img/PersonalCenter/icon_me_copy.png) no-repeat;
  background-size: 60%;
  background-position: center;
}

.nz_yqm{
  color: #fa5151;
  font-size: .5rem;
}
.nz_czzx{
  color: #1485ee;
  font-size: .56rem;
}
.nz_zdjl{
  color: #fa9d3b;
  font-size: .6rem;
}
/* .nz_fjbb{
  color: #469beb;
  font-size: .6rem;
} */
.nz_fbjl{
  color: #2cc1d4;
  font-size: .56rem;
}
.nz_hbxq{
  color: #d326e2;
  font-size: .6rem;
}
.nz_bzzx{
  color: #6467f0;
  font-size: .7rem;
}
.nz_tgzx{
  color: #fa5151;
  font-size: .5rem;
}
.nz_zxkf{
  color: #1afa29;
  font-size: .78rem;
}
.nz_set{
  color: #1485ee;
  font-size: .78rem;
}
.nz_exit{
  color: #6467f0;
  font-size: .56rem;
}




</style>
