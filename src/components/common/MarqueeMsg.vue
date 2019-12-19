<template>
<div>
<div class="marquee" @click="show_msg_box()">
    <i></i>
    <div>
        <marquee  class="marquee_msg" behavior="behavior"  loop="2">{{Competition}}</marquee>
    </div>
</div>

</div>
</template>

<script>
export default{
    name: "MarqueeMsg",
    data() {
        return {
            Competition:[], //赛事公告窗的数据
            show_marquee:true , //看看有没有后台传来的 赛事公告 没有就写默认的
        }
    },
    created(){
        this.jointData()
    },
    methods:{
        show_msg_box(){
            if(this.show_marquee){
                this.$store.commit('ChangeNotice',true)
            }
        },
        jointData(){
            if(this.$store.state.WebData.Msg){
                let data = this.$store.state.WebData.Msg
                if(data.length > 0){
                    data.forEach((item , index)=> {
                        this.Competition =  this.Competition + (index+1) + '、'  + item.content 
                    });
                    this.show_marquee = true;
                }else{
                    this.Competition = '暂无公告!'
                    this.show_marquee = false;
                }
                
            }
        }
    },
}
</script>
<style scoped>

.marquee{
    width: 100%;
    height: .8rem;
    background-color: rgb(255, 255, 255);
    overflow: hidden;
    border-bottom: 1px solid rgb(240, 240, 240);
}
.marquee i{
    width: .6rem;
    height: .6rem;
    margin: .1rem 0rem .1rem .2rem;
    overflow: hidden;
    float: left;
    background: url(../../assets/img/common/ic_notice.png) no-repeat;
    background-size: 70%;
    background-position: center;
}
.marquee_msg{
    width: 9rem;
    height: .6rem;
    line-height: .6rem;
    margin: .1rem 0rem ;
    padding-right:.2rem;
    overflow: hidden;
    font-size: .34rem;
    float: left;
    position: relative;
}
.marquee_msg::before{
    content: '';
    width: .6rem;
    height: .6rem;
    line-height: .6rem;
    padding-right:.2rem;
    background:-webkit-gradient(linear, 100% 0, 0 0, from(#ffffff), to(#ff343400));
    background: -webkit-linear-gradient(to right, #ffffff , #ff343400); 
    background: -o-linear-gradient(to right, #ffffff , #ff343400); 
    background: -moz-linear-gradient(to right, #ffffff , #ff343400); 
    background: linear-gradient(to right, #ffffff , #ff343400); 
    position: absolute;
    z-index: 2;
}
.marquee_msg::after{
    content: '';
    width: .6rem;
    height: .6rem;
    line-height: .6rem;
    padding-right:.2rem;
    background:-webkit-gradient(linear, 100% 0, 0 0, from(#ff343400), to(#ffffff));
    background: -webkit-linear-gradient(to right, #ff343400 , #ffffff);
    background: -o-linear-gradient(to right, #ff343400 , #ffffff); 
    background: -moz-linear-gradient(to right, #ff343400 , #ffffff); 
    background: linear-gradient(to right, #ff343400 , #ffffff); 
    position: absolute;
    right: 0;
    top: 0;
}
</style>
