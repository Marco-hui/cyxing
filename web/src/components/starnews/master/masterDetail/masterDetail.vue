<template>
    <div id="masterDetail">
        <div class="header">
            <i class="fa fa-reply" @click="goToBack"></i>
            <h4>创业大咖 -- {{masterDetailData.name}}</h4>
            <i></i>
        </div>
        <div class="DetailMian">
            <div class="information">
                <div class="img"><img :src="baseUrl+masterDetailData.img"/></div>
                <div class="msg">
                    <p class="name">{{masterDetailData.name}}</p>
                    <p class="achievement">{{masterDetailData.achievement}}</p>
                </div>
            </div>
            <div class="introduce">
                <h4>人物事迹介绍：</h4>
                <div v-html="masterDetailData.introduce"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import './masterDetail.scss'
    import http from '../../../../utils/httpClient'
    import $ from 'jquery'
    export default{
        data(){
            return{
                masterDetailData:{},
                baseUrl:http.base_url
            }
        },
        methods:{
            goToBack(){
                history.go(-1);
            }
        },
        mounted(){
            var id = this.$route.params.id;
            this.$store.state.app.index_show=true;
            http.get('getOneList',{type:'master',id}).then(res=>{
                this.$store.state.app.index_show=false;
                this.masterDetailData=res.data.data[0];
            })
        }
    }
</script>