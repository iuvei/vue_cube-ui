<template>
<div>
    <!-- 首页home的 通用头部 -->
    <div class="top">
        <span class="title">{{msg}}</span>
    </div>

</div>
</template>

<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
    }
  },
  created() {
  },
  props:{
      msg: String
  },
  methods:{
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
  font-size: .5rem;
  color: #fff;
  font-family: 'Microsoft YaHei';
}
</style>
