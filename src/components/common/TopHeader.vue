<template>
<div>
    <div class="top">
        <div class="goback">
            <i @click="goBack" class="">←</i>
        </div>
        <span class="title">{{$route.meta.title}}</span>
    </div>
</div>
</template>
<script>
export default{
    data() {
        return {
        }
    },
    created(){
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
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
}
.goback{
    height: 1.2rem;
    width: 1.2rem;
    font-weight: 600;
    font-size: .7rem;
    float: left;
    position: absolute;
    top:0;
    left:0;
}
</style>
