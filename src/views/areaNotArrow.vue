<template>
<div>
	<div class="top">{{title}}</div>
	<div class="bg">
		<p>您当前所在的地区访问限制</p>
		<p>对您造成的不便表示万分歉意。</p>
		<p>若有任何疑问，可联系我们的客服中心。</p>
		<a :href="$store.state.WebData.SiteService">
		<cube-button class="button">客服</cube-button>
		</a>
	</div>
</div>
</template>

<script>
	export default {
		name: "areaNotArrow",
		data(){
			return{
				title:'',//标题
			}
		},
		created() {
			this.title = document.title
		},
	}
</script>
<style scoped>
.top{
	width: 100%;
	height:7vh;
	line-height:7vh;
	background-color: #111;
	color: aliceblue;
	font-size: .5rem;
	text-align: center;
	font-weight: bold;
}
.bg{
	width: 100%;
	height: 93vh;
	background: #000 url(../assets/img/AccessRestriction.png) no-repeat;
	background-size: cover;
	color: aliceblue;
	text-align: center;
	font-size: .4rem;
	overflow: hidden;
}
.bg p{
	margin: 1rem;
}
.button{
	width:90%;
	margin:5rem 5%;
	
}
</style>
