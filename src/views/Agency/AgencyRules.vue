<template>
<div class="bg">
     <TopHeader/>
     <img src="../../assets/img/agencyHub/dlyj.png" alt="">
</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'

export default {
  name: 'AgencyRules',
  components: { TopHeader },
  data () {
    return {
    }
  },
  methods:{
     
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
</style>