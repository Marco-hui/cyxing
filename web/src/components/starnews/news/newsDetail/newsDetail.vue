<template>
    <div id="newsDetail">
        <div class="header">
            <i class="fa fa-reply" @click="goToBack"></i>
            <h4>{{newsDetailData.title}}</h4>
            <i></i>
        </div>
        <div class="DetailMian">
            <h2>{{newsDetailData.title}}</h2>
            <p><span>{{newsDetailData.timestape}}</span><span>来源：{{newsDetailData.from}}</span><span><i class="fa fa-eye"></i> {{newsDetailData.see}}</span></p>
            <div class="article" v-html="newsDetailData.text"></div>
        </div>
    </div>
</template>

<script>
    import './newsDetail.scss'
    import http from '../../../../utils/httpClient'
    import $ from 'jquery'
    export default{
        data(){
            return{
                newsDetailData:{}
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
            http.get('getOneList',{type:'cynews',id}).then(res=>{
                this.$store.state.app.index_show=false;
                this.newsDetailData=res.data.data[0];
            })
        }
    }
</script>