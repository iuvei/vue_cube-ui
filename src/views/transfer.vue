<template>
<div class="transfer_bg">
     <TopHeader :goHome='4'/>
	
	
	<div class="balance">
		<div class="balance_title">余额</div>
		<div class="balance_money">￥{{userMoney}}</div>
	</div>
    <div class="diandi"></div>

    <div class="transfer_title">选择平台</div>
        <transition name = "into">
            <div class="transfer_item_box" v-if="liveList">
                <div :class="change_live == v.name ? 'transfer_item_active': 'transfer_item'" v-for="(v,k) in liveList" :key="k" @click="select_item(v)" >{{v.title}}</div>
            </div>
        </transition>
	<div class="transfer_title">选择方式</div>
    <div class="transfer_select_box">
        <div class="transfer_select bg_blue" :class="change_type == 'i' ? 'transfer_select_active' : ''" @click="change_type_btn('i')">转入</div>
        <div class="transfer_select bg_red" :class="change_type == 'w' ? 'transfer_select_active' : ''" @click="change_type_btn('w')">转出</div>
    </div>
    

    <div class="shortcut">
        <div class="shortcut_item" 
                v-for="(v,i) in shortcut_Data" :key="i"
            :class="money == v ? 'activate_number' :''" 
            @click="select(v)">{{v}}元
        </div>
        <div class="shortcut_input">
            <cube-input type='number' placeholder="输入金额" v-model="money"></cube-input>
        </div>
    </div>

    <div class="footer">
        <a class="nz_button nz_bg_gradual_orange nz_color_white" @click="postMess()"> 提交</a> 
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
            shortcut_Data:[100,300,500,800,1000,2000,3000,5000],
            money:'',//转换的钱
            change_type:'',//转换的类型 转入还是转出
            liveList:'',//游戏列表
            change_live:'',//转换的平台
		}
	},
	created() {
        this.getList();
	},
	//计算
	computed: {
		...mapState([
        'userMoney',
        'WebData'
		]),
	},
	methods:{
        select(v){
            this.money = v
        },
        change_type_btn(type){
            this.change_type = type
        },
        //得到列表
        getList(){
            // let arr = [];
            // this.$http.post('api/site/info').then(res=>{
            //     if(res){
            //         for (let i in res.data.OpenLive) {
            //             arr.push.apply(arr, res.data.OpenLive[i]);
            //             this.liveList = arr;
            //         }
            //     }
            // })

            let data = []
            for(let i in this.WebData.OpenLive){
                for(let n in this.WebData.OpenLive[i]){
                    console.log(this.WebData.OpenLive[i][n])
                    data.push(this.WebData.OpenLive[i][n])
                }
            }
            this.liveList = data
            console.log(data)
        },
        //选择平台
        select_item(v){
            this.change_live = v.name
            console.log(v.name)
        },
        //确认转换
        postMess(){
            if(!this.change_live) {
                return this.$createToast({time: 2000, txt: '请选择平台', type:'txt'}).show()
            }
            if(!this.change_type) {
                return this.$createToast({time: 2000, txt: '请选择方式', type:'txt'}).show()
            }
            if(!this.money) {
                return this.$createToast({time: 2000, txt: '请输入金额', type:'txt'}).show()
            }
            if(parseInt(this.userMoney) < parseInt(this.money) && this.change_type == 'i') {
                return this.$createToast({time: 2000, txt: '余额不足,请充值', type:'txt'}).show()
            }
            
            
            let type
            if(this.change_live.indexOf('BG')!=-1) {
                type = 'BG'
            } else if(this.change_live.indexOf('GG')!=-1) {
                type = 'GGQP'
            } else {
                type = this.change_live
            }
            let data = {
                type:type,
                money:this.money,
                trans:this.change_type
            }
            this.$http.post('api/live/index/moneyTrans',data).then(res=>{
                this.$createToast({time: 3000, txt: res.data.msg, type:'txt'}).show()
                if(res.data.code == 0){
                    this.$http.post('api/users/balance').then(res=>{
                        this.$store.dispatch('saveUserMoney', res.data.data.money)
                    })
                    this.money = ''
                    this.change_type = ''
                    this.change_live = ''
                }
            })
                
                
        },

	},
}
</script>

<style scoped>
.balance{
	width: 10rem;
	height: 2rem;
	background-color: rgb(170, 170, 170);
	box-shadow: 0rem .2rem .4rem -.4rem #333;
	overflow: hidden;
    position: fixed;
    z-index: 100;
}
.diandi{
    width: 10rem;
	height: 2rem;
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


/* 选择平台  选择方式 标题*/
.transfer_title{
    width: 10rem;
    height: 1rem;
    line-height: 1rem;
    font-size: .4rem;
    box-sizing: border-box;
    padding:0 .2rem;
    color: #555;
    border-left:3px solid rgb(235, 93, 93);
    background-color: rgb(224, 224, 224);
    box-shadow: .2rem .2rem .5rem -.4rem #333;
}
.transfer_item_box{
    width: 100%;
    overflow: hidden;
    position: relative;
    margin: .4rem 0;
}
.transfer_item{
    width: 4rem;
    height: 1rem;
    line-height: 1rem;
    margin: .2rem .5rem;
    float: left;
    text-align: center;
    border-radius: 5px;
    font-size: .4rem;
    box-sizing: border-box;
    border: 2px solid rgb(238, 238, 238);
    background-color: rgb(238, 238, 238);
    box-shadow: .2rem .2rem .5rem -.4rem #333;
}
.transfer_item_active{
    width: 4rem;
    height: 1rem;
    line-height: 1rem;
    margin: .2rem .5rem;
    float: left;
    text-align: center;
    border-radius: 5px;
    font-size: .4rem;
    box-sizing: border-box;
    background-color: rgb(238, 238, 238);
    border: 2px solid  rgb(89, 219, 57);
    box-shadow: .2rem .2rem .5rem -.4rem rgb(116, 221, 74);
}
.transfer_select_box{
    width: 100%;
    overflow: hidden;
    position: relative;
    margin: .4rem 0;
}
.transfer_select{
    width: 4rem;
    height: 2rem;
    line-height: 2rem;
    margin: .2rem .5rem;
    float: left;
    text-align: center;
    border-radius: 5px;
    font-size: .5rem;
    box-sizing: border-box;
    border: 1px solid  rgb(238, 238, 238);
    font-weight: bold;
    background-color: rgb(238, 238, 238);
    box-shadow: .2rem .2rem .5rem -.4rem #333;
}
.transfer_select_active{
    width: 4rem;
    height: 2rem;
    line-height: 2rem;
    margin: .2rem .5rem;
    float: left;
    text-align: center;
    border-radius: 5px;
    font-size: .5rem;
    font-weight: bold;
    background-color: rgb(238, 238, 238);
    border: 2px solid  rgb(89, 219, 57);
    box-shadow: .2rem .2rem .5rem -.4rem rgb(116, 221, 74);
}
.bg_blue{
    background-color:rgb(143, 189, 231);
}
.bg_red{
    background-color:rgb(241, 126, 117);
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
  box-shadow: 1px 1px 10px -5px #333;

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
  box-shadow: 1px 1px 10px -5px #333;
}
.activate_number{
  box-sizing: border-box;
  border: 1px solid  rgb(89, 219, 57);
  box-shadow: 2px 2px 20px -7px  rgb(116, 221, 74);
}

.footer{
  width: 100%;
  height: 1.7rem;
}

.into-enter-active, .into-leave-active {
    transition: all .5s ease;
}
 .into-enter, .into-leave-to {
   transform: scale(0,0);
   opacity:0;
}

</style>