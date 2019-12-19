<template>
<div class="withdraw_bg">
     <TopHeader :goHome='4'/>
	
	
	<div class="balance">
		<div class="balance_title">余额</div>
		<div class="balance_money">￥{{userMoney}}</div>
	</div>

	
	
	<div v-if="allCardList">
	<button class="addCardBtn" @click="showAddDivClick()" v-if="!showAddDiv">新增银行卡</button>
	<button class="WithdrawCardBtn" @click="showWithdrawClick()" v-if="!showWithdrawDiv">提现</button>
	<button class="deleteCardBtn" @click="showDeleteDivClick()" v-if="!showDeleteDiv">删除银行卡</button>
	</div>

	<!-- 设置安全问题跟密码 -->
	<div v-if="show_SafetyProblem">
		<div class="wxts">您还未设置安全问题与安全密码,为了您的账号安全,请在删除银行卡前先设置安全问题与安全密码</div>
		<div class="input_box">
			<cube-select v-model="selectQues" :options="this.quesList[0].values"> </cube-select>
			<cube-input class="delete_input_class" placeholder="请输入安全问题答案" v-model="answer"></cube-input>
		</div>
		<div class="delete_sumbit" @click="set_SafetyProblem()">确 认 设 置</div>
	</div>

      <!-- 没有银行卡的情况  或 想新增银行卡 -->
	  <transition name = "made">
	  <div class="bind_box" v-if="!allCardList || showAddDiv">
		<div class="bind_card">
			<li class="bing_item">
				<span>开户行：</span>
				<cube-select class="bankName" v-model="pay_bank" @input='addCardTest(pay_bank, 2)' :options="bankList"> </cube-select>
			</li>
			<li class="bing_item">
				<span>卡号：</span>
				<input class="bankinput" type="text" maxlength="19" placeholder="请输入卡号" v-model="pay_num" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
			</li>
			<li class="bing_item">
				<span>开户地：</span>
				<input class="bankinput" type="text" placeholder="请输入开户省市:安徽省合肥市" v-model="pay_address" @input='addCardTest(pay_bank, 2)'/>
			</li>
			<li class="bing_item">
				<span>取款密码：</span>
				<input class="bankinput" type="password" placeholder="请输入4-6位取款密码" v-model="qk_pass" maxlength="6" autocomplete="new-password" @input='addCardTest(qk_pass, 1)'/>
			</li>
			<li class="bing_item">
				<!-- <span>开户人姓名：</span> -->
				<span>开户人：</span>
				<input class="bankinput" v-if="!userData.Name" type="text" placeholder="请输入开户行姓名" v-model="userName" maxlength="4"/>
				<input class="bankinput" v-if="userData.Name" type="text" readonly v-model="userData.Name" />
			</li>
			<div class="bind_sumbit" @click="sendBind()">提 交</div>
		</div>
	</div>
	</transition>

	<!-- 有了银行卡的情况 -->
	<transition name = "made">
	<div v-if="allCardList && showWithdrawDiv">
		<div v-for="(item,index) in allCardList" :key="index" :class="select_yhk_id == item.id? 'yh_card_activate': 'yh_card'" @click="select_yhk(item)">
			<div>卡号：{{item.pay_num}}</div>
			<div>开户行：{{item.pay_card}}</div>
			<div>开户地址：{{item.pay_address}}</div>
		</div>
		<!-- 输入金额 -->
		<div class="input_box">
			<input class="input_class" type="number" v-model="order_value" placeholder="请输入取款金额" />
			<input class="input_class" type="password" placeholder="请输入4-6位取款密码" maxlength="6" v-model="order_pass" autocomplete="new-password"/>
		</div>
		<div class="input_sumbit" @click="postData()">提 交 取 款</div>
		<div class="tkxz">
			<div class="wxts" v-if="this.Card_all_info">温馨提示：提现金额下限为{{Card_all_info.data.minAmount}}元</div>
			<p>1.银行账户持有人姓名必须与在娱乐城输入的姓名一致，否则无法申请提款。</p>
			<p>2.大陆各银行帐户均可申请提款。</p>
			<p>3.每个会员账户（北京时间）24小时内只免费提供三次提款。</p>
			<p>4.买彩后未经全额投注（存款金额一倍流水）提款申请不予受理。</p>
			<p>5.每位客户只可以使用一张银行卡进行提款,如需要更换银行卡请与客服人员联系.否则提款将被拒绝。</p>
			<p>6.为保障客户资金安全，娱乐城有可能需要用户提供电话单，银行对账单或其它资料验证，以确保客户资金不会被冒领。 </p>
			<p>5-15分钟到账急速到账时间</p>
		</div>
	</div>
	</transition>

	<!-- 删除银行卡 -->
	<transition name = "made">
	<div v-if="allCardList && showDeleteDiv && isSetQues">
		<div v-for="(item,index) in allCardList" :key="index" :class="delete_id == item.id ? 'yh_card_activate' : 'yh_card'" @click="select_delete(item)">
			<div>卡号：{{item.pay_num}}</div>
			<div>开户行：{{item.pay_card}}</div>
			<div>开户地址：{{item.pay_address}}</div>
		</div>
		<div class="input_box">
		<cube-select v-model="selectQues" :options="this.quesList[0].values"> </cube-select>
		<cube-input class="delete_input_class" placeholder="请输入安全问题答案" v-model="answer"></cube-input>
		<cube-input class="delete_input_class" :eye="eye" type='password' placeholder="请输入取款密码"    v-model="delete_pass"></cube-input>
		</div>
		<div class="delete_sumbit" @click="deleteyhk()">确 认 删 除</div>
	</div>
	</transition>


	


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
			eye: {
				open: false,
				reverse: false
			},
			fill_data:'',//要填写的数据

			show_bind_Card: false, //展示绑定卡的部件
			bankList:[
						"中国工商银行",
						"中国建设银行",
						"中国农业银行",
						"深圳发展银行",
						"中信银行",
						"招商银行",
						"交通银行",
						"中国民生银行",
						"中国光大银行",
						"东亚银行",
						"平安银行",
						"中国银行",
						"中国邮政储蓄银行",
						"兴业银行",
						"广发银行",
						"华夏银行",
						"浦发银行",
						"渤海银行",
						"宁波银行",
						"北京银行",
						"南京银行",
						"上海银行",
						"北京农村信用社",
						"浙商银行",
						"杭州银行",
						"上海农村商业银行",
						"南洋商业银行",
						"河北银行",
						"支付宝",
						"其他"
					], //银行卡列表
			userData:'',//用户数据
			pay_bank:'',//选择哪间银行卡
			pay_num:'',//卡号
			pay_address:'',//开户省市
			qk_pass:'',//取款密码
			userName:'',//用户人姓名

			
			allCardList:'',//用户已经绑定的银行卡列表
			Card_all_info:'',//卡的所有信息
			bindMostCardNum:'',//后台传来最多可以绑定多少张卡
			order_value:'',//输入金额
			order_pass:'',//输入密码

			showAddDiv:false, //展示添加
			showDeleteDiv:false,//展示删除
			showWithdrawDiv:true, //展示提现

			select_yhk_id:'',//选择的银行卡的id

			//删除银行卡的安全问题
			quesList: [{
				flex: 1,
				values: [],
			}],
			qes:[],//安全问题
			

			show_SafetyProblem:false, //安全问题的组件
			//删除银行卡时检测是否设置过安全问题
			isSetQues: false,
			delete_id:'',//选择删除的银行卡 id
			delete_num:'',//选择删除的银行卡 卡号
			selectQues:'', //选择的安全问题
			delete_pass:'',//选择删除的银行卡 卡号
			answer:'', //安全问题答案
		}
	},
	created() {
		this.zdConfig(); //判断有没有需要填写的
		this.getQuestionz()//获取安全问题
		this.getUserInfo(); //得到用户数据
		this.getAllCard();//得到用户已经绑定了的银行卡
	},
	//计算
	computed: {
		...mapState([
		'token', 
		'userMoney', //余额
		]),
	},
	methods:{
		zdConfig() {
			this.$http.post('api/user/getUserField',{'type':'draw'}).then(res=>{
				if (res && res.code == 0) {
					if(!res.data == null || res.data.length == 0){
						// 没有要填写的
					}
					this.fill_data = res.data.data
				}
			})
		},
		// 获取安全问题 // 银行卡删除的时候也要使用这个 getDeleteQuestionz
		getQuestionz() {
			this.$http.post('api/user/userAsk').then(res=>{
				if(res){
					this.qes = res.data;
					this.quesList[0].values = res.data; // 获取删除银行卡的安全问题
				}
			});
		},
		
		//获取所有银行卡
		getAllCard() {
			this.$http.post('api/users/selectBankcard').then(res=>{
				if (res.data.code == 0) {
					this.bindMostCardNum = res.data.bankcard_amount;//可以绑定的最高数量
					if (res.data.data.length > 0) {
						this.allCardList = res.data.data;
						this.Card_all_info = res
					}
				}
				if (res.data.code == 1) {
					this.bindMostCardNum = res.data.bankcard_amount;//可以绑定的最高数量
					this.allCardList = '';
				}
			});
		},
		//检测新增银行卡输入是否符合规则
		addCardTest(str,id) {
			let reg;
			if (id == 1) {
				reg = /[^0-9]/g;
			} else {
				reg = /[^\u4e00-\u9fa5]/g;
			}
			str= str.replace(reg, '');
		},
		//选择银行卡
		select_yhk(item){
			this.select_yhk_id = item.id
		},	
		//提现
		postData(){
			// 提款
			if (!parseInt(this.userMoney)) return this.$createToast({time: 2000, txt: '余额不足', type:'txt'}).show()
			if (!this.select_yhk_id) return this.$createToast({time: 2000, txt: '请选择银行卡', type:'txt'}).show()
			if (!this.order_value || !this.order_pass) return this.$createToast({time: 2000, txt: '请输入完整信息', type:'txt'}).show()

			let data = {
				money: this.order_value,
				qk_pass: this.order_pass,
				card_id: this.select_yhk_id
			}
			let wait = this.$createToast({time: 0, txt: '正在等待系统处理...', mask: true, type:'txt'}).show()
			this.$http.post('api/home/Money/newTakemoney',data).then(res=>{
				wait.hide()
				this.$createToast({time: 2000, txt: res.data.msg, type:'txt'}).show()
				if (res && res.data.code == 0) {
					// this.successPup = true;
					this.order_value = "";
					this.qk_pass = "";
				} 
				
			});
			
		},
		//显示新增银行卡界面
		showAddDivClick() {
			if(this.allCardList.length >=  this.bindMostCardNum){
				return this.$createToast({time: 2000, txt: '最多添加' + this.bindMostCardNum + '张银行卡', type:'txt'}).show()
			} 
			this.showAddDiv = true
			this.showWithdrawDiv = false
			this.showDeleteDiv = false
		},
		//显示提现界面
		showWithdrawClick() {
			this.showWithdrawDiv = true
			this.showAddDiv = false
			this.showDeleteDiv = false
			this.show_SafetyProblem = false
		},
		//显示删除页面  //要查看是否设置了安全问题
		showDeleteDivClick() {
			if(this.allCardList.length == 0){
				return this.$createToast({time: 2000, txt: '还没有添加银行卡哟', type:'txt'}).show()
			};
			if(this.allCardList.length == 1){
				return this.$createToast({time: 2000, txt: '最后一张银行卡不可删除', type:'txt'}).show()
			};
			//查看是否设置了安全问题
			if (!this.isSetQues) {
				this.$http.post('api/home/Users/isAska').then(res=>{
					if(res.data.code == 0){
						this.isSetQues = true
					}else{
						//直接显示填写安全问题的部件!
						this.showAddDiv = false;
						this.showWithdrawDiv = false;
						this.show_SafetyProblem = true;  //安全问题组件
						return ;
					} 
					
				});
			}
			
			//显示前清空上一次的填写数据
			this.delete_id = '';
			this.delete_num = '';
			this.selectQues = '';
			this.delete_pass = '';
			this.answer = '';

			this.showDeleteDiv = true;
			this.showAddDiv = false;
			this.showWithdrawDiv = false;
		},
		//得到用户数据
		getUserInfo() {
			this.$http.post('api/users/info2').then(res=>{
				if (res) this.userData = res.data.data
			});
		},

		//绑定银行卡
		sendBind() {
			if (!this.qk_pass || !this.pay_bank || !this.pay_num || !this.pay_address) {
				return this.$createToast({time: 2000, txt: '请输入完整信息', type:'txt'}).show()
			}
			if(!this.userData.Name && !this.userName){
				return this.$createToast({time: 2000, txt: '请输入完整信息', type:'txt'}).show()
			}
			if(this.qk_pass < 4 ){
				return this.$createToast({time: 2000, txt: '取款密码4-6取款密码', type:'txt'}).show()
			}
			let obj = {}
				obj['qk_pass'] = this.qk_pass;
				obj['pay_name'] = this.userName ? this.userName : this.userData.Name;
				obj['pay_card'] = this.pay_bank;
				obj['pay_num'] = this.pay_num;
				obj['pay_address'] = this.pay_address;
			this.$http.post('api/users/newBankcardsave',obj).then(res=>{
				this.$createToast({time: 2000, txt: res.data.msg, type:'txt'}).show()
				if (res && res.data.code == 0) {
					this.getAllCard();
					this.showWithdrawClick();
				}
			});
		},

		//选择删除银行卡
		select_delete(item){
			this.delete_id = item.id;
			this.delete_num = item.pay_num;
		},
		set_SafetyProblem(){
			if(!this.selectQues){
				return this.$createToast({time: 2000, txt: '请选择安全问题', type:'txt'}).show()
			}
			if(!this.answer){
				return this.$createToast({time: 2000, txt: '请输入安全问题答案', type:'txt'}).show()
			}
			let data = {
				ask: this.selectQues,
				answer: this.answer,
			}
			this.$http.post('api/home/Users/setAsk',data).then(res=>{
				this.$createToast({time: 2000, txt: res.data.msg, type:'txt'}).show()
				if (res && res.data.code == 0) {
					this.isSetQues = true;
					this.show_SafetyProblem = false;
					this.showDeleteDivClick(); //设置完后就显示 删除页面
				}
			});

		},
		//提交删除银行卡信息按钮
		deleteyhk(){
			//一个小小的预防
			if(this.allCardList.length <= 1){
				return this.$createToast({time: 2000, txt: '预留一张银行卡', type:'txt'}).show()
			}
			//删除银行卡操作
			if(!this.delete_num){
				return this.$createToast({time: 2000, txt: '请选择银行卡', type:'txt'}).show()
			}
			if(!this.selectQues){
				return this.$createToast({time: 2000, txt: '请选择安全问题', type:'txt'}).show()
			}
			if(!this.answer){
				return this.$createToast({time: 2000, txt: '请输入安全问题答案', type:'txt'}).show()
			}
			if(!this.delete_pass){
				return this.$createToast({time: 2000, txt: '请输入提款密码', type:'txt'}).show()
			}
			let obj = {
				ask: this.selectQues, //安全问题
				answer: this.answer, //安全答案
				qk_pass: this.delete_pass, //密码
				pay_num: this.delete_num //银行卡号
			}
			
			this.$http.post('api/home/Users/deleteBankcard',obj).then(res=>{
				this.$createToast({time: 2000, txt: res.data.msg, type:'txt'}).show()
				if (res && res.data.code == 0) {
					this.getAllCard();
					this.selectQues = '';
					this.answer = '';
					this.delete_pass = '';
					this.delete_num = '';
				}
			});

		},



	},
}
</script>

<style scoped>
.withdraw_bg{
	width: 100vw;
	/* min-height: calc(100vh - 1.2rem); */
	/* position: relative; */
}
.balance{
	width: 10rem;
	height: 2rem;
	background-color: rgb(170, 170, 170);
	box-shadow: 0rem .2rem .4rem -.4rem #333;
	overflow: hidden;
}
.balance_title{
	width: 10rem;
	height: .6rem;
	line-height: .6rem;
	font-size: .4rem;
	font-weight: bold;
	margin-top: .4rem;
	text-align: center;
	color: #fff;
}
.balance_money{
	width: 10rem;
	height: .6rem;
	line-height: .6rem;
	font-size: .5rem;
	text-align: center;
	color: rgb(229, 255, 0)
}


.bind_box{
	position: relative;
}

.no_bind{
	width: 10rem;
	height: 2rem;
	
	/* background-color: rgb(94, 37, 37); */
	position: absolute;
    top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.bind_title{
	width: 100vw;
	height: 1rem;
	line-height: 1rem;
	text-align: center;
	font-size: .4rem;
}
.bind_btn{
	width: 3rem;
	margin: auto;
	height: 1rem;
	line-height: 1rem;
	text-align: center;
	font-size: .4rem;
	border-radius: 5px;
	color: #fff;
	background-color:#38c;
}
.bind_btn:active{
	background-color:rgb(77, 153, 216);
}

/* .bind_card{
	width: 10rem;
	height:auto;
	overflow: hidden;
} */
.bind_card{
	width:9rem;
	height: auto;
	font-size: .36rem;
	background-color: rgb(243, 243, 243);
	margin:.5rem auto;
	border-radius: 3px;
	box-sizing: border-box;
	padding: .1rem;
	box-shadow:.1rem .1rem .3rem -.3rem #333;
	border:1px solid #fff;
}

.bing_item{
	/* width: 10rem; */
	width: 100%;
	height: 1rem;
	/* background-color: #38c; */
	overflow: hidden;
	position: relative;
	margin: .1rem 0;
}
.bing_item span{
	display: block;
	padding:0 .3rem;
	width: 2rem;
	height: 1rem;
	line-height: 1rem;
	/* background-color: rgb(154, 172, 187); */
	font-size: .4rem;
	float: left;
}
.bankName{
	width: 6rem;
	height: 1rem;
	font-size: .4rem;
	float: left;
}
.bankinput{
	width: 6rem;
	box-sizing: border-box;
	padding: 0  .2rem;
	height: 1rem;
	font-size: .4rem;
	float: left;
}
.bind_sumbit{
	width: 3rem;
	margin:.5rem auto;
	height: 1rem;
	line-height: 1rem;
	text-align: center;
	font-size: .4rem;
	border-radius: 5px;
	color: #fff;
	background-color:#38c;
}


/* 银行卡 */
.yh_card{
	width:8rem;
	height: auto;
	font-size: .4rem;
	background-color: rgb(243, 243, 243);
	margin:.5rem auto;
	border-radius: 3px;
	box-sizing: border-box;
	padding: .3rem .3rem;
	box-shadow:.1rem .1rem .3rem -.3rem #333;
	border:1px solid #fff;
}
.yh_card_activate{
	width:8rem;
	height: auto;
	font-size: .4rem;
	background-color: rgb(243, 243, 243);
	margin:.5rem auto;
	border-radius: 3px;
	box-sizing: border-box;
	padding: .3rem .3rem;
	border:1px solid rgba(0, 238, 255, 0.473);
	box-shadow:0rem 0rem .4rem -.2rem rgb(1, 255, 221);
}
.yh_card div , .yh_card_activate div{
	margin: .2rem 0;
}
/* 输入提现金额box */
.input_box{
	width:8rem;
	height: auto;
	font-size: .36rem;
	background-color: rgb(243, 243, 243);
	margin:.5rem auto;
	border-radius: 3px;
	box-sizing: border-box;
	padding: .3rem .3rem;
	box-shadow:.1rem .1rem .3rem -.3rem #333;
	border:1px solid #fff;
}
.input_class{
	width: 100%;
	margin: .1rem 0;
	box-sizing: border-box;
	padding: .1rem .2rem;
	border-radius: 3px;	
}
.input_sumbit{
	width:8rem;
	height: auto;
	font-size: .36rem;
	text-align: center;
	background-color: rgb(87, 166, 212);
	margin:.5rem auto;
	border-radius: 3px;
	box-sizing: border-box;
	padding: .3rem .3rem;
	box-shadow:.2rem .2rem .3rem -.3rem #333;
}
.input_sumbit:active{
	background-color:rgb(94, 157, 194);
}
.delete_sumbit{
	width:8rem;
	height: auto;
	font-size: .36rem;
	text-align: center;
	background-color: rgb(212, 106, 87);
	margin:.5rem auto;
	border-radius: 3px;
	box-sizing: border-box;
	padding: .3rem .3rem;
	box-shadow:.2rem .2rem .3rem -.3rem #333;
}
.delete_sumbit:active{
	background-color:rgb(238, 124, 109);
}

.addCardBtn{
	display: block;
	width:8rem;
	height: auto;
	font-size: .32rem;
	background-color: rgb(119, 216, 99);
	margin:.5rem auto;
	border-radius: 36px;
	box-sizing: border-box;
	padding: .3rem .3rem;
	box-shadow:.1rem .1rem .3rem -.2rem #333;
}
.WithdrawCardBtn{
	display: block;
	width:8rem;
	height: auto;
	font-size: .32rem;
	background-color: rgb(99, 179, 216);
	margin:.5rem auto;
	border-radius: 36px;
	box-sizing: border-box;
	padding: .3rem .3rem;
	box-shadow:.1rem .1rem .3rem -.2rem #333;
}
.deleteCardBtn{
	display: block;
	width:8rem;
	height: auto;
	font-size: .32rem;
	background-color: rgb(223, 116, 116);
	margin:.5rem auto;
	border-radius: 36px;
	box-sizing: border-box;
	padding: .3rem .3rem;
	box-shadow:.1rem .1rem .3rem -.2rem #333;
}
.made-enter-active, .made-leave-active {
    transition: all .3s ease-in ;
}
 .made-enter, .made-leave-to {
   transform: translate(0%,100%);
   opacity:0;
}
/* 温馨提示 */
.wxts{
	display: block;
	width:8rem;
	height: auto;
	line-height: .4rem;
	font-size: .32rem;
	background-color: rgb(204, 204, 204);
	margin:.2rem auto .5rem;
	color: rgb(243, 53, 53);
	border-radius: 3px;
	box-sizing: border-box;
	padding: .3rem .3rem;
	box-shadow:.1rem .1rem .3rem -.2rem #333;
}
/* 提款须知 */
.tkxz{
	display: block;
	width:9.6rem;
	height: auto;
	font-size: .3rem;
	background-color: rgb(231, 231, 231);
	margin:.5rem auto;
	color: rgb(77, 77, 77);
	border-radius: 3px;
	box-sizing: border-box;
	padding: .3rem .3rem;
	box-shadow:.1rem .1rem .3rem -.2rem #333;
}
.tkxz p{
	margin: .2rem 0;
	line-height: .4rem;
}

/* 删除样式 */
.delete_input_class{
	width: 100%;
	margin: .1rem 0;
	box-sizing: border-box;
	border-radius: 3px;	
}

</style>