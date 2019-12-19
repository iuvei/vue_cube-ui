<template>
<div class="bg">
     <TopHeader/>
     
     <div class="scroll-list-wrap">
         
        <cube-scroll  ref="scroll" :data="[]" :options="options" @pulling-down="onPullingDown" nest-mode="free" class="wrap">
            <div class="content">
                <div class="top"></div>

                        <div class="top_title">
                            <div class="member">
                                <div class="number">{{this.subordinateData.sub_member}}</div>
                                <div class="data_number">团队成员</div>
                            </div>
                            <div class="member">
                                <div class="number">{{this.subordinateData.direct_member}}</div>
                                <div class="data_number">直属下级</div>
                            </div>
                        </div>

                        <div class="body">
                            <cube-scroll  ref="scroll_2" :data="[]" nest-mode="free">

                                    <div class="item" v-for="(item,i) in this.subordinateData.data" :key="i">
                                        <div class="item_top">
                                            <div class="item_img">
                                                <!-- <img src="../../assets/img/images.jpg" alt=""> -->
                                                <img :src="item.headimgurl" alt=""  onerror="item.headimgurl = ''"  v-if="item.headimgurl != ''">
                                                <img src="../../assets/img/PersonalCenter/ic_user_avatar.png"  v-else>
                                            </div>
                                            <div class="item_name">{{item.nickname}}</div>
                                            <div class="item_sex_nv" v-if="item.sex == 2"></div>
                                            <div class="item_sex_nan" v-else></div>
                                        </div>
                                        <div class="item_bottom">
                                            <div class="item_player">
                                                <div class="item_number">{{item.sub_num}}</div>
                                                <div class="data_name">玩家数</div>
                                            </div>
                                            <div class="item_commission">
                                                <div class="item_number">{{item.sub_profit}}</div>
                                                <div class="data_name">流水佣金</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="nz_placeholder"></div>
                            </cube-scroll>
                        </div>
            </div>
        </cube-scroll>
     </div>
</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'

export default {
  name: 'subordinate',
  components: { TopHeader },
  data () {
    return {
        subordinateData:'',//下级会员的 数据
        options: {
            // pullDownRefresh: {
            // threshold: 80,
            // stop: 100,
            // txt: '更新成功'
            // },
            pullDownRefresh:false
      },
      
    }
  },
  created() {
      this.getData()
  },
  methods:{
    getData(){
        this.$http.post('api/chat/index/subAgentList').then(res=>{
            this.subordinateData = res.data.list
        })
    },

    onPullingDown() {
    // 模拟更新数据
        this.$refs.scroll.forceUpdate()
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
.scroll-list-wrap{
  height: calc(100vh - 1.2rem);
  overflow: hidden;
  background-color:aliceblue;
}

.content{
    height: calc(100vh - 1.2rem);
}
.top{
    width: 10rem;
    height: 5rem;
    /* background-color: #976467; */
    position: absolute;
    overflow: hidden;
}
.top::before{
    content: '';
    width: 30rem;
    height: 30rem;
    position: absolute;
    top: -200%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #fe4d57;
    border-radius: 50%;
    z-index: auto;
}
.top_title{
    width: 10rem;
    height: 4rem;
    position: absolute;
    z-index: 10000;
}
.body{
    position: relative;
    top: 4rem;
    width: 9rem;
    height: calc(100vh - 5.2rem);
    margin: auto;
    /* background-color: rgb(255, 255, 255); */
}

.member{
    width: 50%;
    height: 4rem;
    float: left;
    text-align: center;
}
.number{
    color: #fff;
    margin: .8rem 0;
    font-size: .8rem;
}
.data_number{
    color: #fff;
    margin: .1rem 0;
    font-size: .3rem;
}

.item{
    width: 100%;
    height: 3rem;
    margin-bottom: .5rem;
    background-color: #fff;
    border-radius: 4px;
    /* overflow: hidden; */
    box-shadow:  0 .1rem 1rem  -.6rem #333;
}
.item_top{
    width: 100%;
    height: 1.8rem;
    /* background-color: blue; */
    overflow: hidden;
}
.item_img{
    width: 1rem;
    height: 1rem;
    margin: .4rem 0 .4rem .5rem;
    /* background-color: #fe4d57; */
    float: left;
}
.item_img img{
    width: 100%;
    height: 100%;
}
.item_name{
    height: .8rem;
    margin: .4rem 0;
    padding: .1rem;
    float: left;
    font-size: .3rem;
}
.item_sex_nv{
    width: 1rem;
    height: 1rem;
    margin: .4rem 0;
    float: left;
    background: url(../../assets/img/PersonalCenter/ic_female.png) no-repeat;
    background-size: 50%;
}
.item_sex_nan{
    width: 1rem;
    height: 1rem;
    margin: .4rem 0;
    float: left;
    background: url(../../assets/img/PersonalCenter/ic_male.png) no-repeat;
    background-size: 50%;
}

.item_bottom{
    width: 100%;
    height: 1rem;
}
.item_player, .item_commission{
    width: 50%;
    height: 1.2rem;
    float: left;
    text-align: center;
}
.item_number{
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    font-size: .5rem;
}
.data_name{
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    font-size: .3rem;
    color: rgb(126, 126, 126);
}



</style>