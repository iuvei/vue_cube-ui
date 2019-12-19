<template>
<div>
    <div class="top">
        <div class="goback" v-show="this.$route.path != '/' && this.PCtop" @click="goHOME(goHome)">
            <i><icon-svg icon-class="fanhui1"/></i>
        </div>

        <div class="goback" v-show="this.$route.path != '/' && !this.PCtop" @click="goBack">
            <i class="get_back"><icon-svg icon-class="fanhui1"/></i>
        </div>

        <span class="title">{{$route.meta.title}}</span>
    </div>
    <div class="pad"></div>
</div>
</template>
<script>
export default{
    data() {
        return {
            PCtop:false, //不是PersonalCenter PC个人中心的返回
        }
    },
    created(){
        if(this.goHome || this.goHome == 0){
            this.PCtop = true;
        }else{
            this.PCtop = false;
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        goHOME(number){
            this.$router.push({name: 'home', params:{LowNumber: number}})
        }
    },
    props:{
        'goHome':Number
    },
}
</script>
<style scoped>

.top{
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: #fe4d57;
    text-align: center;
    font-weight: 600;
    font-size: .46rem;
    color: #fff;
    font-family: 'Microsoft YaHei';
    position: fixed;
    z-index: 9999;
}

.goback{
    height: 1.2rem;
    line-height: 1.2rem;
    width: 1.2rem;
    font-weight: 600;
    font-size: .6rem;
    float: left;
    position: absolute;
    top:0;
    left:0;
    /* background: url(../../assets/img/common/ic_arrow_back_white_24dp.png) no-repeat; */
    background-size: 60%;
    background-position: center;
}

</style>
