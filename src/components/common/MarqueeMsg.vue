<template>
<div>
<div class="marquee" @click="show_msg_box()">
    <i></i>
    <div>
        <marquee  class="marquee_msg" behavior="behavior"  loop="2">1.文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。</marquee>
    </div>
</div>

</div>
</template>

<script>
export default{
    name: "MarqueeMsg",
    data() {
        return {
        }
    },
    created(){
    },
    methods:{
        
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
    /*! autoprefixer: ignore next */
    background:-webkit-gradient(linear, 100% 0, 0 0, from(#ffffff), to(#ff343400));
    background: -webkit-linear-gradient(to right, #ffffff , #ff343400); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #ffffff , #ff343400); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #ffffff , #ff343400); /* Firefox 3.6 - 15 */ 
    background: linear-gradient(to right, #ffffff , #ff343400); /* 标准的语法 */
    position: absolute;
    z-index: 2;
}
.marquee_msg::after{
    content: '';
    width: .6rem;
    height: .6rem;
    line-height: .6rem;
    padding-right:.2rem;
    /*! autoprefixer: ignore next */
    background:-webkit-gradient(linear, 100% 0, 0 0, from(#ff343400), to(#ffffff));
    background: -webkit-linear-gradient(to right, #ff343400 , #ffffff); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to right, #ff343400 , #ffffff); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #ff343400 , #ffffff); /* Firefox 3.6 - 15 */ 
    background: linear-gradient(to right, #ff343400 , #ffffff); /* 标准的语法 */
    position: absolute;
    right: 0;
    top: 0;
}
</style>
