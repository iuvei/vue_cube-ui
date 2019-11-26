<template>
<div><!-- 消息  -->




<div class="scroll-list-wrap">

   <header ref="topHeader"><img src="https://dpubstatic.udache.com/static/dpubimg/_tEw0ofPJ9/jd_header2.png"></header>

  <cube-scroll
    ref="scroll"
    :scroll-events="['scroll']"
    :data="items"
    :options="options"
    @scroll="onScrollHandle"
    @pulling-down="onPullingDown">
  </cube-scroll>

  内容


</div>




</div>
</template>

<script>

export default {
  name: 'PersonalCenter',
  data () {
    return {
      msg:'消息',
      items: [
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
        },
      ],

      options: {
        pullDownRefresh: {
          threshold: 80,
          stop: 100,
          txt: '更新成功'
        }
      },
      pullDownY: 0, //下拉的距离
      pullDownStyle: '',//下拉内容 距离底部的高度
      triggerSurpriseFlag: false,
    }
  },
  created() {
  },
  computed: {
    pullDownTip() {
      if (this.pullDownY <= 60) {
        return '下拉刷新...'
      } else if (this.pullDownY <= 90) {
        return '继续下拉有惊喜...'
      } else {
        return '松手得惊喜！'
      }
    },
    headerStyle() {
      return Math.min(1, Math.max(0, 1 - this.pullDownY / 40))
    }
  },

  
  methods:{
      onPullingDown() {
      // 模拟更新数据
        setTimeout(() => {
            this.$refs.scroll.forceUpdate()
        }, 1000)
      },
      onScrollHandle(pos) {
        console.log(pos)
        this.pullDownY = pos.y
        if (pos.y > 0) {
          this.pullDownStyle = `top:${pos.y}px`
          this.triggerSurpriseFlag = false
          if (this.pullDownY > 90) {
            this.triggerSurpriseFlag = true
          }
        }
        this.$refs.topHeader.style.opacity = this.headerStyle
      },

    },

    
}
</script>


<style scoped>
.scroll-list-wrap{
  height: 100vh;
  background-color: antiquewhite;
}

</style>
