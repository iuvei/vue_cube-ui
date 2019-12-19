<template>
<div class="recharge_bg">
     <TopHeader :goHome='4'/>


<!-- 当isAt 为真时 代表可以显示这个支付方式 -->
<div v-show="is_show">
     <!-- TOP 选择支付方式 -->
      <div class="recharge_top">
        <cube-scroll ref="scroll" direction="horizontal"  :options="options" class="horizontal-scroll-list-wrap">
          <ul class="list-wrapper recharge">
            <cube-tab-bar v-model="selectedLabel" show-slider  @change="selectIndex">
                <cube-tab label="bank" key="bank">银行汇款</cube-tab>
                
                <transition name = "into">
                    <cube-tab label="offline" key="offline" v-if="xxpay.length>0">线下充值</cube-tab>
                </transition>

                  <cube-tab v-for="(item, index) in typeData" :label="item.id" :key="index" v-show="item.bankList.length">{{item.name}}</cube-tab>
            </cube-tab-bar>
          </ul>
        </cube-scroll>
      </div>


      <!-- 中间选择后显示的部分 -->
      <div class="recharge_body">

          <!-- 银行汇款 -->
          <transition name = "into">
          <div v-if="this.selectedLabel == 'bank'">
                <div class="yh_card" v-for="(item,i) in cardList" :key="i"  @click="selectOne(item)"  :class="pay_id == item.id ? 'yh_active':''" >
                    <div class="yh_card_item">开户行：{{item.bank_name}}</div>
                    <div class="yh_card_item">银行卡号：{{item.bank_number}}</div>
                    <div class="yh_card_item">开户地址：{{item.bank_city}}</div>
                    <div class="yh_card_item">开户名：{{item.bank_xm}}</div>
                </div>

                <div class="yh_info">
                  <div class="yh_info_item">
                      汇款方式：
                  </div>
                  <!-- <cube-input  v-model="money"></cube-input> -->
                  <cube-select class="yh_select" v-model="huikuanType" :options="bankType"></cube-select>
                  <div class="yh_info_item">
                      汇款时间：
                  </div><cube-input class="yh_select" v-model="date" readonly></cube-input>
                  <div class="yh_info_item">
                      备注：
                  </div><cube-input class="yh_select" v-model="about" placeholder="请备注账号/姓名"></cube-input>
              </div>
          </div>
          </transition>
          
          <!-- 线下充值 -->
          <transition name = "into">
          <div v-if="this.selectedLabel == 'offline' && this.xxpay.length>0">
              <div v-for="(item,n) in xxpay" :key="n">

                <div class="ewm_card" v-for="(x,i) in item.list" :key="i" @click="selectXX(x,item)" :class="xx_id == x.id ? 'ewm_active':''" >
                      <div class="qrcodeImg"  @click="showImagePreview(x.qrcode_url)">
                        <img :src="x.qrcode_url" alt="二维码">
                      </div>
                      <div class="qrcodeInfo">
                        <div class="qrcode_name">{{item.type | filterTypeName}}</div>
                        <div class="qrcode_describe">{{x.describe}}</div>
                        <div class="qrcode_t1">方式：先扫码付款再提交</div>
                        <div class="qrcode_t2">限额：单笔最高限额4999，单笔最低10</div>
                      </div>
                </div>
            </div>
        </div>
          </transition>

        <!-- 第三方充值 -->
        <transition name = "into">
        <div v-if="this.selectedLabel != 'offline' && this.selectedLabel != 'bank' && this.xxpay.length>0">
            <form  :action="typeData[third_party_num].form" method="get" target="_blank" ref="onlineform" >
                <div v-for="(v,i) in typeData[third_party_num].bankList" :key="i"
                     @click="selectM($event,v,typeData[third_party_num])"
                     :class="third_pay_bank == v.value ?  'Third_item_activate' : 'Third_item'">
                    {{v.name}}
                    <i class="cubeic-right" v-if="third_pay_bank == v.value"></i>
                </div>
                
                <input type="hidden" name="pay_bank"  :value="third_pay_bank" />
                <input type="hidden" name="PayAmount" v-model="money"/>
                <!-- <input type="hidden" name="ip"        v-model="ip"/> -->
                <input type="hidden" name="token"     :value="token" />
            </form>
      </div>
      </transition>

      <!-- 快捷键 -->
      <transition name = "into">
        <div class="shortcut" v-if=" this.selectedLabel != 'offline'">
            <div class="shortcut_item" 
                 v-for="(v,i) in shortcut_Data" :key="i"
                :class="money == v ? 'activate_number' :''" 
                @click="select(v)">{{v}}元
            </div>
            <div class="shortcut_input">
                <cube-input type='number' v-model="money"></cube-input>
            </div>
        </div>
      </transition>
      <!-- 线下金额 -->
      <transition name = "into">
        <div class="WarmPrompt" v-if=" this.selectedLabel == 'offline'">
								<div>温馨提示</div> 
              最低收款10元，支付时请带有小数点（如：1000.68等不整数），请支付成功后截图成功凭证联系在线客服或提交汇款信息！
        </div>
      </transition>
      <transition name = "into">
        <div class="yh_info" v-if=" this.selectedLabel == 'offline'">
            <div class="yh_info_item">金额：</div>
            <cube-input type='number' class="yh_select" v-model="xx_money" placeholder="请输入充值金额"></cube-input>
            <div class="yh_info_item">备注：</div>
            <cube-input class="yh_select" v-model="xx_about" placeholder="请备注账号/姓名"></cube-input>
        </div>
      </transition>


        <!-- 底部提交 -->
          <div class="footer">
            <a class="nz_button nz_bg_gradual_orange nz_color_white" @click="postMess()"> 提交</a> 
          </div>
      </div>
        <!-- <div class="nz_placeholder"></div> -->
</div>

</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'
import {mapActions,mapState} from 'vuex'
export default {
  name: 'recharge',
  components: { TopHeader },
  data () {
    return {
        selectedLabel: 'bank',
        shortcut_Data:[100,300,500,800,1000,2000,3000,5000],
        options: {
            click:true,
        },
        money:'',
        isAt: false,  //当isAt为真时就显示支付方式
        is_show: false,  //当isAt为真时就显示支付方式
        typeData: '', //支付方式列表
        cardList:'',
        xxpay: '',//线下支付的列表
        
        //银行汇款 
        pay_id:'', //选择银行卡后赋值的id
        bankType:[], //汇款方式列表
        huikuanType:'',  //汇款方式
        date: this.getCurrTime(),//获取当前时间
        about:'',  //汇款备注
        select_bank_data:'', //选择好和填写好的 银行卡信息

        payImg:{},
        xx_id:'',//线下二维码id
        xx_money:'',
        xx_about:'',
        xx_type:'',
        xx_data:'',
        

        third_party_num:'',//选择的第三方序号
        third_pay_bank:'', //第三方付款的值
        lowM:'', //第三方最小充值
        heM:'', //第三方最大充值
    }
  },
  created() {
    this.zdConfig(); //要先获得 充值的时候需不需要填写 银行卡信息这些..
    this.getPayType();
    this.getUserCardList();
  },
  //计算
  computed: {
    ...mapState([
      'token', 
    ]),
  },
  methods:{
    //或者需不需要填写银行卡信息
    zdConfig(){
        this.$http.post('api/user/getUserField',{'type':'recharge'}).then(res=>{
            if(res.data  && res.data.code ==0){
                //判断是否需要验证 (如果不需要验证就直接显示充值页面 否则就填写银行卡信息)
                if(!res.data.data == null || res.data.data.length == 0){
                  this.isAt = true;
                  return;
                }
                this.pzData = res.data.data;


                //判断一下在需要验证的情况下 有没有要必填的
                // for(let i = 0 ; i <= this.pzData.length-1 ; i++){
                //   if(this.pzData[i].status == 'required'){
                //     this.isBt = true;
                //     return;
                //   }else{
                //     this.isAt = true;
                //     if(!sessionStorage.getItem('isXtClose')){
                //       this.isXt = true;
                //     }
                //   }
                // }

            }
        })
    },
    //得到第三方支付方式
    getPayType(){
        this.$http.post('/api/pay/mobilelist').then(res=>{
          if (res && res.data.code == 0){
            this.typeData = res.data.data
          }
        })
    },
    getUserCardList() {
      this.$http.post('/api/HuikuanList/showBank').then(res=>{
          if (res && res.data.code == 0) {
            for(let i in res.data.huikuanType){
              this.bankType.push(res.data.huikuanType[i])
            }
            this.cardList = res.data.data;
            if (res.data.qrcode_img.length) {
              this.xxpay = res.data.qrcode_img;
              for(let k in res.data.qrcode_img){
                if(!this.payImg[res.data.qrcode_img[k].type]) this.payImg[res.data.qrcode_img[k].type] = [];
                this.payImg[res.data.qrcode_img[k].type].push(res.data.qrcode_img[k])
              }
            }
          }
          this.is_show = true
      })

      this.huikuanType = this.bankType[0];
    },
    //二维码图片预览
    showImagePreview(img_url) {
      let img_urlList = []
      img_urlList.push(img_url)
      this.$createImagePreview({
        imgs:img_urlList
      }).show()
    },
    //选择一张银行卡
    selectOne(item){
       this.pay_id  = item.id
    },
    //选择一张线下二维码
    selectXX(x,item){
       this.xx_id  = x.id
       this.xx_type = item.type
    },
    //选择第三方支付中的一种大类
    selectIndex(index){
      this.third_pay_bank = ''
      this.lowM = ''
      this.heM = ''
      this.money = ''
      for(let n=0; n<this.typeData.length; n++){
        if(this.typeData[n].id == index){
          this.third_party_num = n
        }
      }
    },
    //选择第三方支付中的一种小类
    selectM(e,v,vv){
        this.third_pay_bank = v.value;
				this.lowM = vv.pay_lowest;
				this.heM = vv.pay_height;
    },
    //快捷选择
    select(number){
      this.money = number;
    },

    //提交
    postMess(){
      //选择的是银行汇款
      if(this.selectedLabel == 'bank'){
          if(!this.pay_id){
              return this.$createToast({time: 2000, txt: '请选择银行卡', type:'txt'}).show()
          }
          if(!this.about || !this.huikuanType){
              return this.$createToast({time: 2000, txt: '请输入完整信息', type:'txt'}).show()
          }
          if(!this.money){
              return this.$createToast({time: 2000, txt: '请输入充值金额', type:'txt'}).show()
          }
          this.select_bank_data = {
            'order_value':this.money,
            'huikuanType':this.huikuanType,
            'about':this.about,
            'id':this.pay_id,
          }
          this.$http.post('api/home/money/deposit',this.select_bank_data).then(res=>{
             this.$createToast({time: 2000, txt:res.data.msg , type:'txt'}).show()
             if(res.data.code == 0){
                this.about = ""; //初始化 备注和 汇款方式
                this.huikuanType = "";
                this.$router.push('/rechargeRecord')
             }
          })
        //选择线下支付
      }else if(this.selectedLabel == 'offline'){
          this.postXpay();
      //选择第三方支付
      }else{
          if(!this.money || !this.third_pay_bank ) return this.$createToast({time: 2000, txt: '请输入完整信息', type:'txt'}).show()
          if (parseInt(this.money) < parseInt(this.lowM)) return this.$createToast({time: 2000, txt: '存款最低限额为' + this.lowM, type:'txt'}).show()
          if (parseInt(this.money) > parseInt(this.heM))  return this.$createToast({time: 2000, txt: '存款最高限额为' + this.heM, type:'txt'}).show() 
          this.$refs.onlineform.submit();
      }
    },
     // 第三方支付的方法
    postXpay(){
       if(!this.xx_id){
            return this.$createToast({time: 2000, txt: '请选择扫码方式', type:'txt'}).show()
        }
        if(!this.xx_money){
            return this.$createToast({time: 2000, txt: '请输入金额', type:'txt'}).show()
        }
        if(this.xx_money<10){
            return this.$createToast({time: 2000, txt: '最低入款为10元', type:'txt'}).show()
        }
        if(!this.xx_about){
            return this.$createToast({time: 2000, txt: '请填写备注', type:'txt'}).show()
        }
        this.xx_data = {
          'order_value':this.xx_money,
          'about':this.xx_about,
          'type':this.xx_type,
        }
        this.$http.post('api/home/money/scanDeposit',this.xx_data).then(res=>{
             this.$createToast({time: 2000, txt:res.data.msg , type:'txt'}).show()
             if(res.data.code == 0){
                this.xx_money = ""; //初始化 备注和 汇款方式
                this.xx_about = ""; //初始化 备注和 汇款方式
                this.xx_type = ""; //初始化 备注和 汇款方式
             }
          })

    },

    //获取当前时间!
    getCurrTime() {
      let time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() - 0 + 1) : time.getMonth() + 1;
      let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
      let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
      let min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
      let sec = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
      return y + "-" + m + "-" + d + "-" + h + ":" + min + ":" + sec;
    },
  },
  filters: {
			filterTypeName: function(t) {
				if (t == 'wechat') {
					return '微信线下扫码支付'
				} else if (t == 'alipay') {
					return '支付宝线下扫码支付'
				} else if (t == 'qq') {
					return 'QQ线下扫码支付'
				} else if (t == 'cloudpay') {
					return '云闪付'
				} else{
					return '其他通道'
				}
			}
		},
 
}
</script>

<style scoped>
.recharge_bg{
    width: 100vw;
    height: 100%;
    background-color: aliceblue;
}
.recharge_top{
  height: 1.2rem;
}
/* 银行卡样式 */
.yh_card{
  width: 8rem;
  height: 2rem;
  padding: .5rem;
  margin: .2rem .5rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 10px -5px #333;

  border-radius: 5px;
  border: 1px solid  rgb(255, 255, 255);
}
.yh_card_item{
  font-size: .4rem;
  height: .5rem;
  line-height: .5rem;
  display: block; 
}
.yh_active{
  border: 1px solid  rgba(101, 213, 241, 0.6);
  box-shadow: 2px 2px 20px -7px rgb(101, 213, 241);
}
.yh_info{
  width: 8rem;
  padding: .5rem;
  margin: auto;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 10px -5px #333;
  border-radius: 5px;
  overflow: hidden;
}
.yh_info_item{
  width: 2rem;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  font-size: .4rem;
  margin:.2rem 0;
  float: left;
}
.yh_select{
  width: 6rem;
  text-align: center;
  height: 1rem;
  line-height: .5rem;
  font-size: .4rem;
  margin:.2rem 0;
  float: left;
}
.scroll-list-wrap_2{
  min-height: 1rem;
  max-height: calc(100vh - 2.4rem - 2.2rem);
  background-color: rgb(54, 115, 168);
}


/* 二维码样式 */
.ewm_card{
  width: 9rem;
  /* height: 3rem; */
  padding: .1rem;
  margin: .2rem .4rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 10px -5px #333;

  border-radius: 5px;
  border: 1px solid  rgb(255, 255, 255);
  overflow: hidden;
}
.ewm_active{
  border: 1px solid  rgba(101, 213, 241, 0.6);
  box-shadow: 2px 2px 20px -7px rgb(101, 213, 241);
}
.qrcodeImg{
  width: 3rem;
  height: auto;
  /* background-color: #333; */
  float: left;
}
.qrcodeImg img{
  width: 100%;
  height: 100%;
}
.qrcodeInfo{
  width: 6rem;
  box-sizing: border-box;
  padding: .1rem;
  height: auto;
  float: left;
  font-size: .5rem;
  /* background-color: rgb(235, 57, 57) */
}
.qrcode_name{
   font-size: .5rem;
   font-weight: bold;
}
.qrcode_describe{
  margin: .2rem 0;
  font-size: .3rem;
  color: rgb(110, 110, 110);
}
.qrcode_t1,.qrcode_t2{
  font-size:.3rem;
  margin: .1rem 0;
}

/* 第三方样式item */
.Third_item{
  width: 8.4rem;
  height: 1rem;
  line-height: 1rem;
  padding:0 .3rem;
  font-size: .5rem;
  margin: .2rem .4rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 10px -5px #333;

  border-radius: 5px;
  border: 1px solid  rgb(255, 255, 255);
  overflow: hidden;
}
.Third_item_activate{
  width: 8.4rem;
  height: 1rem;
  line-height: 1rem;
  padding:0 .3rem;
  font-size: .5rem;
  margin: .2rem .4rem;
  background-color: rgb(255, 255, 255);

  border-radius: 5px;
  overflow: hidden;
  border: 1px solid  rgba(101, 213, 241, 0.6);
  box-shadow: 2px 2px 20px -7px rgb(101, 213, 241);
}
.Third_item_activate i{
  color: rgb(54, 224, 54)
}

/* 温馨提示 */
.WarmPrompt{
  width: 8rem;
  padding: .5rem;
  margin: .2rem auto;
  font-size: .3rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 10px -5px #333;
  border-radius: 5px;
  overflow: hidden;
}
.WarmPrompt div{
  margin-bottom: .1rem;
  text-align: center;
}

/* 快捷键区域 */
.shortcut{
  width: 8.8rem;
  height: 4rem;
  margin: .5rem auto 0;
  /* background-color: blue; */
}
.shortcut_item{
  width:1.8rem;
  height: 1rem;
  line-height: 1rem;
  margin: .2rem;
  background-color: #fff;
  font-size: .4rem;
  float: left;
  text-align: center;
  border-radius: 3px;
  box-shadow: 2px 2px 20px -10px #333;

  box-sizing: border-box;
  border: 1px solid #fff;
}
.shortcut_input{
  width:8.8rem;
  height: 1rem;
  line-height: 1rem;
  float: left;
  margin:.2rem 0;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 2px 2px 20px -10px #333;
}
.activate_number{
  box-sizing: border-box;
  border: 1px solid  rgba(101, 213, 241, 0.6);
  box-shadow: 2px 2px 20px -7px rgb(101, 213, 241);
}
.footer{
  width: 100%;
  height: 1.7rem;
  /* padding-bottom: .3rem; */
}
.recharge_body{
  overflow: hidden;
  position: relative;
  min-height: calc(100vh - 2.4rem);
  padding-bottom: 1rem;
}


.into-enter-active {
    transition: all .5s ease;
}
 .into-leave-active {
    transition: all .1s ;
}
 .into-enter, .into-leave-to {
   transform: translate(0%,-50%);
   opacity:0;
}

</style>
<style>
.recharge_bg .cube-scroll-wrapper {
  height: auto;
}
.recharge_top .horizontal-scroll-list-wrap{
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px
}
.recharge_top .cube-scroll-content{
    display: inline-block
}
.recharge_top .list-wrapper{
    padding: 0 10px;
    line-height: 60px;
    white-space: nowrap;
}
.recharge_top .list-item{
    display: inline-block
}

.recharge_top .list-wrapper{
  padding: 0;
}
/* 设置样式 */
.recharge_top .recharge .cube-tab{
  font-size: .46rem;
  line-height: 1rem;
  padding: 0;
  margin:0 .2rem;

}

</style>