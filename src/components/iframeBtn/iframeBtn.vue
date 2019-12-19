<template class="iframeBtn">
  <div id="moveDiv" class="movediv" @click="closeIframe" @touchmove='move' @touchstart='down' @dragstart="down" @drag="move" @dragend="end" draggable="true">
    <div class="circle_1">
      <div class="circle_2">
        <div class="circle_3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {Drag} from '@/assets/js/drag'
export default {
  data() {
    return {
      chatSwitch: true, // 用来判定显示聊天室跟投注背景图
      ifShow: false, // 是否显示菜单
      flags: false,
      position: { x: 0, y: 0 },
      nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
      maxLeft:'',
      maxTop:''
    }
  },
  created() {
    let showTab = window.sessionStorage.getItem('showTab');
    if(showTab){
      this.chatSwitch = showTab === 'bet';
    } else{
      window.sessionStorage.setItem('showTab', 'bet');
    }
  },
  methods: {
    // 点击显示与收缩小球事件
    showMenu() {
      this.ifShow = !this.ifShow
    },
    closeIframe () {
      this.$emit('closeIframe')
    },
    // 鼠标按下与手指触摸事件
    down() {
      var sty = null;
      let dom = document.getElementById('moveDiv');
      if(window.getComputedStyle) {
          sty = window.getComputedStyle(dom, null); // 非IE
      } else {
          sty = dom.currentStyle; // IE
      }
      this.flags = true;
      var touch = event.touches ? event.touches[0] : event;
      this.position.x = touch.clientX;//鼠标指针向对于浏览器页面（或客户区）的水平坐标
      this.position.y = touch.clientY;
      this.dx = moveDiv.offsetLeft;//距离左侧的位置
      this.dy = moveDiv.offsetTop;//距离顶部的位置
      this.maxLeft = document.body.clientWidth - sty.width.split('px')[0]; //当前元素可移动的最大左偏移
      // this.maxTop = document.body.clientHeight - sty.height.split('px')[0]; //当前元素可移动的最大上偏移
      this.maxTop = window.screen.height - sty.height.split('px')[0]; //当前元素可移动的最大上偏移
    },
    // 移动拖拽事件
    move() {
      if(this.flags){
        this.getLocation(event.touches ? event.touches[0] : event);
      }
    },
    // 鼠标抬起与手指抬起触摸结束事件
    end() {
      if(!event.touches ){//PC
        this.getLocation(event.touches ? event.touches[0] : event);
      }
      this.flags = false;
    },
    getLocation(touch){
      moveDiv.style.left = `${this.dx+touch.clientX-this.position.x}px`;
      moveDiv.style.top = `${this.dy+touch.clientY-this.position.y}px`;
      let OtherWidth=window.innerWidth-document.all.moveDiv.offsetWidth;
      let OtherHeight=window.innerHeight-document.all.moveDiv.offsetHeight;
      if(moveDiv.offsetLeft<=0) moveDiv.style.left ="0px";
      if(moveDiv.offsetLeft>=this.maxLeft) moveDiv.style.left =this.maxLeft+'px';
      if(moveDiv.offsetTop<=0) moveDiv.style.top ="0px";
      if(moveDiv.offsetTop>=this.maxTop) moveDiv.style.top = this.maxTop+'px';
      // if((OtherWidth-moveDiv.offsetLeft)<=0) moveDiv.style.left = OtherWidth+"px";
      // if((OtherHeight-moveDiv.offsetTop)<=0) moveDiv.style.top = OtherHeight+"px";
      //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
      // document.addEventListener("touchmove",function(){event.preventDefault()},false);
    },
  }
};
</script>

<style scoped>
.movediv {
  position: fixed;
  top: 20vh;
  left: 0;
  z-index: 99999999;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 10px;
  background-color: rgba(65, 65, 65, 0.8);
  overflow: hidden;
}
.circle_1{
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  margin: .2rem;
  position: relative;
  overflow: hidden;
}
.circle_2{
  width: .82rem;
  height: .82rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  margin: .1rem;
  overflow: hidden;
}
.circle_3{
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  margin: .1rem;
}
</style>
<style>

</style>