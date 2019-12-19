<template>
<div class="bg">
     <TopHeader :goHome='4'/>
        <div class="top_area">
            <div class="top_img"></div>
        </div>


        <div class="today_total">
            <div class="today_box">
                <div class="total_title">今天注册人数</div>
                <div class="total_body"><span class="red">0</span>/0</div>
            </div>
            <div class="today_box">
                <div class="total_title">今天充值总额</div>
                <div class="total_body"><span class="green">￥0.00</span></div>
            </div>
            <div class="today_box">
                <div class="total_title">今天佣金分成</div>
                <div class="total_body"><span class="orange">￥0.00</span></div>
            </div>
        </div>
        <div class="generalize" v-if="PromoteCode">
            <div class="generalize_title green">代理推广链接</div>
            <div class="generalize_body">
                <div class="generalize_text orange">{{url}}{{PromoteCode}}</div>
                <div class="icon_copy" :data-clipboard-text="(url + PromoteCode)" @click="copy()"></div>
            </div>
        </div>


        <div class="body_area">
            <div class="body_item">
                <router-link to="/subordinate" tag="li">
                <div class="item_img xjdl"></div>
                <div class="item_name">下级代理</div>
                </router-link>
            </div>
            <div class="body_item">
                <router-link to="/Myforms" tag="li">
                <div class="item_img wdbb"></div>
                <div class="item_name">我的报表</div>
                </router-link>
            </div>
            <div class="body_item">
                <router-link to="/shareHub" tag="li">
                <div class="item_img fx"></div>
                <div class="item_name">分享</div>
                </router-link>
            </div>
            <div class="body_item">
                <router-link to="/AgencyRules" tag="li">
                <div class="item_img dlgz"></div>
                <div class="item_name">代理规则</div>
                </router-link>
            </div>
            <div class="body_item">
                <router-link to="/generalize" tag="li">
                <div class="item_img tgjc"></div>
                <div class="item_name">推广教程</div>
                </router-link>
            </div>
        </div>
</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'
import Clipboard from 'clipboard';
import {mapActions,mapState} from 'vuex'
export default {
  name: 'agencyHub',
  components: { TopHeader },
  
  data () {
    return {
        url:window.location.host + '/#/?key=',
    }
  },
  computed: {
    ...mapState([
      'PromoteCode',//推广码
    ]),
  },
  methods:{
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
  }
 
}
</script>

<style scoped>
.bg{
    width: 100vw;
    height: 100vh;
    background-color: rgb(248, 248, 248);
}
.top_area{
    width: 100%;
    height: 4rem;
    background-color: #fff;
    overflow: hidden;
    margin-bottom: .3rem;
}
.top_img{
    width: 9rem;
    height: 3rem;
    margin: .5rem;
    background:url(../assets/img/agencyHub/icon_bzsz_detial.png) no-repeat;
    background-size: 100%;
}
.body_area{
    width: 100%;
    background-color: #fff;
    overflow: hidden;
}
.body_item{
    width: 3.33rem;
    height: 3.33rem;
    float: left;
}
.item_img{
    width: 1.33rem;
    height: 1.33rem;
    margin: .7rem auto .3rem; 
}
.item_name{
    width: 3.33rem;
    height: 1rem;
    text-align: center;
    font-size: .3rem;
}
.xjdl{
    background: url(../assets/img/agencyHub/icon_item_xjwj.png) no-repeat;
    background-size: 90%;
    background-position: center; 
}
.dlgz{
    background: url(../assets/img/agencyHub/icon_item_rule.png) no-repeat;
    background-size: 90%;
    background-position: center; 
}
.wdbb{
    background: url(../assets/img/agencyHub/icon_item_wdbb.png) no-repeat;
    background-size: 90%;
    background-position: center; 
}
.fx{
    background: url(../assets/img/agencyHub/icon_item_fxzq.png) no-repeat;
    background-size: 90%;
    background-position: center; 
}
.tgjc{
    background: url(../assets/img/agencyHub/icon_item_tgjc.png) no-repeat;
    background-size: 90%;
    background-position: center; 
}


.today_total{
    width: 9.3rem;
    height: 2rem;
    border-radius: 10px;
    background-color: #fff;
    margin: .2rem auto;
}
.today_box{
    width: 3.1rem;
    height: 2rem;
    background-color: #fff;
    float: left;
    color: rgb(97, 97, 97);
}
.total_title{
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    font-size: .4rem;
    text-align: center;
    margin: .4rem 0 0 0;
}
.total_body{
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    font-size: .46rem;
    text-align: center;
    margin: .1rem 0 .2rem 0;
    font-weight: bold;
}
.green{
    color: rgb(127, 233, 113);
    font-weight: bold;
}
.red{
    color: rgb(238, 77, 56);
    font-weight: bold;
}
.orange{
    color: rgb(238, 153, 56);
    font-weight: bold;
}

.generalize{
    width: 9.3rem;
    border-radius: 10px;
    background-color: #fff;
    margin: .2rem auto;
    overflow: hidden;
    position: relative;
}
.generalize_title{
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    font-size: .5rem;
    text-align: center;
    margin: .2rem 0;
}
.generalize_text{
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    font-size: .46rem;
    text-align: center;
    margin: .2rem 0;
}
 .icon_copy{
  width: 2rem;
  height: 1.2rem;
  line-height: 1.2rem;
  padding-right:.2rem; 
  position: absolute;
  top: 0;
  right: 0;
  float:right;
  background: url(../assets/img/PersonalCenter/icon_me_copy.png) no-repeat;
  background-size: 60%;
  background-position: center;
}
</style>