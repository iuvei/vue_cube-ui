<template>
<div class="bg">
     <TopHeader :goHome='4'/>
     <cube-button @click="installImg()" class="download">下载</cube-button>
      <div class="QRcode_box" ref="QRcode_box">
          <img src="../../assets/img/agencyHub/launch_bg.png" id="img1" class="img1"/>
          <img :src="QRdata" id="img2" class="img2"/>
      </div>
</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'
import html2canvas from 'html2canvas'
export default {
  name: 'shareHub',
  components: { TopHeader },
  data () {
    return {
      QRdata:'',
      aa:'',
    }
  },
  created() {
    this.getQRcode()
    
  },
  methods:{
    getQRcode(){
      this.$http.post('api/chat/index/shareQrcode').then(res=>{
        this.QRdata = res.data.list.qrcode
        if(this.QRdata){
          setTimeout(()=>{
             this.installhc() //进来先把两张图片合在一起 方便可以一键下载
          },1000)
         
        }
      })
    },


    installhc(){
      let that = this;
      html2canvas(that.$refs.QRcode_box,{useCORS:true,logging:true}).then(canvas=>{
        // console.log(canvas)
        // console.log(canvas.toDataURL)
        that.aa = URL.createObjectURL(that.base64ToBlob(canvas.toDataURL()))
      });
    },
    base64ToBlob(code){
      let parts = code.split(';base64,');
      let contentType = parts[0].split(':')[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length
      let uInt8Array = new Uint8Array(rawLength);
      for(let i = 0 ; i<rawLength; i++){
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array],{type:contentType});
    },

    //下载图片
    installImg(){
      let name = '分享';
      let image = new Image();
      //解决宽裕 Canvas 污染问题
      image.setAttribute("crossOrigin","anonymous");
      image.onload = function(){
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image,0,0,image.width,image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); //生成一个a元素
        let event = new MouseEvent("click"); //创建一个单击事件
        a.download = name || "photo"; //设置图片名称
        a.href = url; //将生成的url设置为a.href属性
        a.dispatchEvent(event); //触发a的单击事件
      }
      image.src = this.aa;
    }




  }
 
}
</script>

<style scoped>
.bg{
  width: 100%;
  height: 100vh;
  background-color: #e64040;
}
.download{
  position: fixed;
  top:1.2rem;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.295);
}
.QRcode_box{
  width: 100%;
  overflow: hidden;
  position: absolute;
}
.img1{
  width: 100%;
}
.img2{
  width: 40%;
  position: absolute;
  top: 58%; left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>