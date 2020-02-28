<template>
	<div id="newsapp">
		<div class="search_news">
			<input type="text" placeholder="搜索">
			<i class="fa fa-search"></i>
		</div>

		<ul class="tab_ul">
			<li v-for="(obj,idx) in typeData" :key="idx" @click="switchover(idx)">
				<router-link :to="'/starnews/'+idx" v-if="idx == 0">{{obj.view}}</router-link>
				<router-link :to="'/starnews/'+obj.type+'/'+idx" v-else>{{obj.view}}</router-link>
			</li>
		</ul>
		<div class="news_area">
			<router-view></router-view>
		</div>
		<cyfooter></cyfooter>
	</div>
</template>
<script>
	import './starnew.scss';
	import '../../common/base.css';
	import cyfooter from '../cyfooter/cyfooter.vue';
	import http from '../../utils/httpClient'
	export default{
		data(){
			return {
				typeData:[{type:"",view:"创业新闻"},{type:"busistar",view:"校园创业之星"},{type:"master",view:"创业成功人物"},{type:"book",view:"创业书籍"},{type:"matchs",view:"创业大赛"}]
			}
		},
		components:{
			cyfooter
		},
		mounted(){
			$('#newsapp .cyfooter ul li').eq(3).addClass('active');
			if(this.$route.params.stage) this.changeStage();
			$('#newsapp .tab_ul li').eq(this.$store.state.app.starnews_stage.stage).addClass('active');
		},
		methods:{
			switchover(idx){
				this.changeStage();
				$('#newsapp .tab_ul li').removeClass('active').eq(idx).addClass('active');
			},
			changeStage(){
				this.$store.state.app.starnews_stage = {type:this.$route.name,stage:this.$route.params.stage}
			}
		}
	}
</script>