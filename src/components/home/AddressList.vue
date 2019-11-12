<template>
<div><!-- 通讯录 -->
        <!-- 头部 -->
        <HomeHeader :msg="msg"></HomeHeader>

<div class="box">
<cube-index-list :data="cityData" >

    <cube-index-list-group
      v-for="(group, index) in cityData" :key="index" :group="group">
      <cube-index-list-item
        v-for="(item, index) in group.items" :key="index" :item="item"
        @select="selectItem" class="custom-list">
        <div class="custom-item">
          <i>头像</i>
          {{item.name}}</div>
      </cube-index-list-item>
    </cube-index-list-group>

</cube-index-list>
</div>
        

</div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader'

const cityData = [
  { "name": "官方客服",
    "items": [ {"name": "客服娜娜", "value": 1 },]
  },
  { "name": "邀请我的好友",
    "items": [ {"name": "客服娜娜", "value": 2 },]
  },
  { "name": "C",
    "items": [ { "name": "趁涛红柳绿",  "value": 3 },]
  },
  { "name": "F",
    "items": [ { "name": "风吹萤火",  "value": 4 },]
  },
  { "name": "G",
    "items": [ { "name": "光风霁月",  "value": 5 },]
  },
  { "name": "H",
    "items": [ { "name": "红藕香残",  "value": 6 },]
  },
  { "name": "L",
    "items": [ { "name": "冷风",  "value": 7 },
               { "name": "林野青苍",  "value": 8 },
               { "name": "莲花飘香",  "value": 9 },]
  },
  { "name": "Q",
    "items": [ { "name": "前方",  "value": 10 },
               { "name": "前方",  "value": 11 },
               { "name": "披肩女神",  "value": 12 },]
  },
  { "name": "S",
    "items": [ { "name": "时光的模样",  "value": 13 },
               { "name": "谁知道你",  "value": 14 },]
  },
  { "name": "Y",
    "items": [ { "name": "夜声",  "value": 15 },
               { "name": "烟凡·古楼",  "value": 16 },
               { "name": "赢钱",  "value": 17 },]
  }
]

export default {
  name: 'ActvityReward',
  components: { HomeHeader },
  data () {
    return {
      msg:'通讯录',
      cityData: cityData
    }
  },
  created() {
    
  },
  
  methods:{
    selectItem(item) {
      console.log(item.name)
    },
    clickTitle(title) {
      console.log(title)
    }
  },

 
}
</script>



<style scoped>
.box{
  width: 100%;
  height: calc(100vh - 2.6rem);
  background-color: rgb(230, 230, 230);
}



.custom-item{
  height: 1rem;
  line-height: 1rem;
  padding: .1rem .2rem;
  font-size: .36rem;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(219, 219, 219);
}
/* 让最后一个不要显示下划线 */
.custom-list:last-child .custom-item{
  border-bottom: none
}


/* 头像 */
.custom-item i {
  display:block;
  width: .9rem;
  height: .9rem;
  margin: .05rem ;
  margin-right: .3rem;
  text-align: center;
  border-radius: 3px;
  font-size: .2rem;
  background-color: rgb(214, 214, 214);
  float: left;
}
</style>

<style>
/* 修改通讯录 一项的标题的样式 */
.cube-index-list-anchor {
    padding: 0.3rem 0.4rem 0.2rem 0.3rem;
}
</style>
