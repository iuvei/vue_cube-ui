<template>
<div class="bg">
     <TopHeader/>
     <img src="../../assets/img/agencyHub/tgjc.png"  @click="copy()"  :data-clipboard-text="data"  class="img" >
        <div :data-clipboard-text="data" v-text="data" class="text"  @click="copy()" >
     </div>
</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'
import Clipboard from 'clipboard';
export default {
  name: 'generalize',
  components: { TopHeader },
  data () {
    return {
        data:'1、点击“我的”,复制“邀请码”分享链接，或点击“分享”,分享二维码图片到微信朋友圈或者QQ动态,以及各大平台论坛,分享时注意文字说明好自己的邀请码,代理申请后，可以享有下级发包流水的2%,实时返佣,随时提现!',
    }
  },
  methods:{
      // 复制
      copy(){
        var clipboard = new Clipboard('.img')
        clipboard.on('success', e => {
          this.$createToast({
            time: 1000,
            txt: '复制成功',
            type:'txt'
          }).show()
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$createToast({
            time: 1000,
            txt: '该浏览器不支持自动复制',
            type:'txt'
          }).show()
          // 释放内存
          clipboard.destroy()
        })
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
img{
    width: 100%;
}
.text{
  font-size: .46rem;
  padding: .4rem;
  
}
</style>