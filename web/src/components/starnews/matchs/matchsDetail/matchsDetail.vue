<template>
    <div id="matchsDetail">
        <div class="header">
            <i class="fa fa-reply" @click="goToBack"></i>
            <h4>{{matchsDetailData.cnname}}</h4>
            <i></i>
        </div>
        <div class="DetailMian">
            <div class="detail">
                <img :src="baseUrl+matchsDetailData.imgUrl" />
                <h4>{{matchsDetailData.cnname}}</h4>
                <h5>{{matchsDetailData.enname}}</h5>
                <p class="hold"><span>举办方：</span>{{matchsDetailData.hold_unit}}</p>
                <p class="type"><span>比赛性质：</span>{{matchsDetailData.match_type}}</p>
                <p class="desc">{{matchsDetailData.desc}}</p>
                <p class="url"><span>官网地址：</span><a :href="matchsDetailData.url" target="_blank">{{matchsDetailData.url}}</a></p>
            </div>
        </div>
    </div>
</template>

<script>
    import './matchsDetail.scss'
    import http from '../../../../utils/httpClient'
    import $ from 'jquery'
    export default{
        data(){
            return{
                matchsDetailData:{},
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
            http.get('getOneList',{type:'matchs',id}).then(res=>{
                this.$store.state.app.index_show=false;
                this.matchsDetailData=res.data.data[0];
            })
        }
    }
</script>