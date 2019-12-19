<template>
<div class="ChessRecord_bg">
     <TopHeader :goHome='4'/>
    
    <div class="fudong">
        <cube-button class="time_class" @click="showPicker">{{inquire_name}}</cube-button>
        <cube-button class="time_class" @click="showDatePicker">{{time}}</cube-button>
        <cube-button class="time_class" @click="tips()">{{end_time}}</cube-button>
        <div></div>
    </div>
	
    
    <transition name = "into">
    <div class="scroll-list-ChessRecord" v-if="datalist">
        <cube-scroll
            ref="scroll_CR"
            :data="datalist"
            :options="options"
            @pulling-up="onPullingUp">
            <div v-for="(item,i) in datalist" :key="i">
                <div class="card">
                    <div class="card_title">{{item.platform}}</div>
                    <div class="card_game">【{{item.game_type}}】- {{item.bet_info}}</div>
                    <div class="card_data_box">
                        <div class="card_data">投注：<span :class="item.valid_bet_amount >= 0 ? 'green':'red'">{{item.valid_bet_amount}}</span></div>
                        <div class="card_data">输赢：<span :class="item.live_win >= 0 ? 'green':'red'">{{item.live_win}}</span></div>
                        <div class="card_data" v-if="item.is_back">返水：<span :class="item.back_amt >= 0 ? 'green':'red'">{{item.back_amt}}</span></div>
                    </div>
                    <div class="card_time">{{item.ch_bet_time}}</div>
                </div>
            </div>
        </cube-scroll>
    </div>
    </transition>

    <transition name = "into">
    <div class="scroll-list-ChessRecord" v-if="no_data">
        <div class="no_data">
            暂无数据,请选择合理时间段,或参与棋牌类游戏
        </div>
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
            ChessList:'',//所有棋牌列表
            inquire_name:'全部',//查询的名字
            today:new Date(),
            time:'',//时间
            end_time:'',//结束时间
            page:1, //第一页
            ps:20 ,//一页显示的多少个数据
            currType: '0', //选择的棋牌类型

            options:{
                pullUpLoad: true,
                scrollbar: true
            },

            datalist:'',//数据列表
            no_data:'', //没有数据
		}   
	},
	created() {
        this.end_time = String(this.today.getFullYear()) + '-' + String(this.today.getMonth() + 1) + '-' + String(this.today.getDate())

        let timestamp = new Date(this.end_time);
        let end_Y = new Date( timestamp.getTime() -  2592000000).getFullYear();
        let end_M = new Date( timestamp.getTime() -  2592000000).getMonth() + 1;
        let end_R = new Date( timestamp.getTime() -  2592000000).getDate();
        this.time = end_Y + '-' + end_M + '-' + end_R 


        // this.end_time = String(this.today.getFullYear()) + '-' + String(this.today.getMonth() + 1) + '-' + String(this.today.getDate())
        this.getAllLiveList()//获得所有真人棋牌
        this.getRecordList()//获得记录列表
	},
	//计算
	computed: {
		...mapState([
            'WebData',
        ]),
	},
	methods:{
        //关于上拉加载
        onPullingUp() {
            this.page = this.page + 1 
            let data = {
                p:this.page,
                ps:this.ps,
                platform:this.currType, //棋牌类型
                start_date:this.time,
                end_date:this.end_time,
            }
            this.$http.post('/api/users/getLiveBet',data).then(res=>{
             if(res && res.data.code ==0){
                let list = res.data.list.data 
                list.forEach(item=>{
                    this.datalist.push(item)
                });
             }else{
                 this.page = this.page - 1
                 this.$refs.scroll_CR.forceUpdate();
             }
          })
        },

        //获得所有真人棋牌列表
        getAllLiveList(){
            let data = []
            for(let i in this.WebData.OpenLive){
                for(let n in this.WebData.OpenLive[i]){
                    data.push(this.WebData.OpenLive[i][n])
                }
            }
            let arr = [{text:'全部',value:'0'}]
            data.forEach((item,index)=>{
                let obj = {}
                obj.text = item.title
                obj.value = item.name
                arr.push(obj)
            })
            this.ChessList = arr
            this.inquire_name = this.ChessList[0].text
            this.currType = this.ChessList[0].value
        },
        //提示只能选一个月的
        tips(){
            this.$createToast({time: 5000, txt: '数据仅展示一个月以内的,选择前面的开始时间即可', type:'txt'}).show();
        },
        //打开查询
        showPicker() {
            if (!this.picker) {
                this.picker = this.$createPicker({
                    title: '选择类型',
                    data: [this.ChessList],
                    onSelect: this.selectname,
                })
            }
            this.picker.show()
        },
        selectname(selectedVal, selectedIndex, selectedText) {
            this.currType = selectedVal[0]
            this.inquire_name = selectedText[0]
            this.page = 1;
            this.datalist = '';
            this.no_data = false; //先把没有数据的这个关掉 这样不会影响视觉效果 等到请求到数据后再去判断
            this.getRecordList();
            // console.log(selectedVal)
            // console.log(selectedIndex)
            // console.log(selectedText)
        },

        //选择日期
        showDatePicker() {
        if (!this.datePicker) {
            this.datePicker = this.$createDatePicker({
            title: '选择时间',
            min: new Date(2008, 7, 8),
            max: new Date(2020, 9, 20),
            value: new Date(),
            format: {
                year: 'YYYY',
                month: 'MM',
                date: 'DD'
            },
            onSelect: this.selectdate,
            })
        }

        this.datePicker.show()
        },
        selectdate(date, selectedVal, selectedText) {
            this.time = selectedText[0] + '-' + selectedText[1] + '-' + selectedText[2];

            let timestamp = new Date(this.time);
            let end_Y = new Date( timestamp.getTime() +  2592000000).getFullYear();
            let end_M = new Date( timestamp.getTime() +  2592000000).getMonth() + 1;
            let end_R = new Date( timestamp.getTime() +  2592000000).getDate();
            this.end_time = end_Y + '-' + end_M + '-' + end_R 

            this.page = 1;
            this.getRecordList();
        },
        //选择日期end

        //获得数据
        getRecordList(){
            let data = {
                p:this.page,
                ps:this.ps,
                platform:this.currType,
                start_date:this.time,
                end_date:this.end_time,
            }
            this.$http.post('/api/users/getLiveBet',data).then(res=>{
             if(res && res.data.code ==0){
                 this.datalist = res.data.list.data
                 this.no_data = false; //有数据\
                 if(res.data.list.length == 0){
                     this.no_data = true
                 }
             }else{
                 this.no_data = true //没有数据
             }
          })
        }
                
                

	},
}
</script>

<style scoped>
.ChessRecord_bg{
    width: 100vw;
    min-height:100vh ;
    background-color: #eeeeee;
}
.ChessRecord_bg .time_class{
    width: 33.33%;
    float: left;
    background-color: #eeeeee;
    color: rgb(46, 46, 46);
    border: 0;
    border-radius: 0;
}


.card{
    width: 9rem;
    height: auto;
    border-radius: 5px;
    margin: .4rem auto;
    overflow: hidden;
    background-color: #fff;
    box-shadow: .1rem .1rem .5rem -.3rem rgb(163, 163, 163);
}
.card_title{
    width: 92%;
    margin: auto;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    border-bottom: 1px solid rgb(199, 199, 199);
    font-size: .4rem;
    font-weight: bold;
}
.card_game{
    width: 90%;
    margin: auto;
    min-height: .8rem;
    line-height: .8rem;
    font-size: .4rem;
    text-align: center;
}
.card_data_box{
    margin:.1rem 0;
}
.card_data{
    width: 90%;
    margin: auto;
    height: .5rem;
    line-height: .5rem;
    font-size: .4rem;
}
.card_time{
    width: 92%;
    margin: auto;
    height: .8rem;
    line-height: .8rem;
    border-top: 1px solid rgb(199, 199, 199);
    font-size: .4rem;
}

.green{
    color: #5abb46;
}
.red{
    color: #f36148;
}
.scroll-list-ChessRecord{
    width: 100%;
    height: calc(100vh - 1.2rem);
    overflow: hidden;
}

.no_data{
    width: 9rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  font-size: .4rem;
  margin: .5rem auto;
  border-radius: 5px;
  background-color: #333;
  box-shadow: 1px 1px 2px -1px #333;
  color: #ededed;
}

.into-enter-active, .into-leave-active {
    transition: all .3s ease;
}
 .into-enter, .into-leave-to {
   /* transform: translate(50%,0%); */
   opacity:0;
}
</style>