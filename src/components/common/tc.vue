<template>
  <div>

    <!-- 公告弹窗 -->
    <div v-if="WindowData.data && WindowData.data.length > 0">
      <div class="mask" v-show="show_mask && this.WindowData.data[0]"  @click="show_false()"></div>
        <div class="window" v-show="show_window && this.WindowData.data[0]" >
            <div class="window_top">
                <i class="close" @click="show_false()">❌</i>
                <span class="title">{{this.WindowData.data[0].title}}</span>
            </div>
           
            <div class="window_body">
                <p>{{this.WindowData.data[0].msg}}</p>
                 <img :src="this.WindowData.data[0].wap_img_url" class="window_img">
            </div>
        </div>
    </div>



  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'TC',
  data() {
    return {
      // 弹窗
        show_mask:true,
        show_window:true,
        WindowData:'', //网站公告 数据
        show_tc:true,
    }
  },
  created() {
      this.getWebsite()
  },
  computed: {
    ...mapState([
      'WebData'
    ]),
  },
  methods: {
      getWebsite(){
          if(!window.sessionStorage.getItem('close_tc')){
            this.WindowData = this.WebData.Window
          }else{
            this.WindowData = '';
          }
          
      },
      show_false(index){
          this.WindowData.data.shift()
          if(this.WindowData.data == ''){
            window.sessionStorage.setItem('close_tc',true)
          }
      },
  }
}
</script>

<style lang="scss" scoped>
// 以下弹窗
.mask{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 888;
    transition: all .3s;
}
.window{
    width: 86%;
    min-height: 7rem;
    max-height: 16rem;
    background-color: #fff;
    border-radius: .3rem;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%,-50%);
    z-index: 999;
    transition: all .6s;
}
.window_top{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color: rgb(255, 64, 89);
    overflow: hidden;
    text-align: center;
    font-size: .4rem;
}
.close{
    display: block;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
}
.title{
    color: #fff;
}
.window_body{
    width: calc(100% - .6rem);
    max-height: 16rem;
    padding: .3rem;
    font-size: .4rem;
    text-align: left;
    color: rgb(158, 158, 158);
    font-family: 'Microsoft YaHei';
    overflow: auto;
}
.window_img{
  width: 100%;
  margin-top:.2rem;
}


</style>
