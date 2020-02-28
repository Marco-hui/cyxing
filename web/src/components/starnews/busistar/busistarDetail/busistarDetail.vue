<template>
    <div id="busistarDetail">
        <div class="header">
            <i class="fa fa-reply" @click="goToBack"></i>
            <h4>校园创业之星 -- {{busistarDetailData.starname}}</h4>
            <i></i>
        </div>
        <div class="DetailMian">
            <div class="information">
                <div class="img"><img :src="busistarDetailData.headImg"/></div>
                <div class="content">
                    <p class="name">{{busistarDetailData.starname}} （{{busistarDetailData.age}}岁）</p>
                    <p class="sex"><span>{{busistarDetailData.sex}}</span> <span>{{busistarDetailData.school}}</span></p>
                    <p class="manifesto">创业宣言： {{busistarDetailData.manifesto}}</p>
                </div>
            </div>
            <div class="mainProject" v-if="busistarDetailData.mainpro_msg">
                <h4>主要创业项目</h4>
                <p><span class="projectName">{{busistarDetailData.mainpro_msg.projectName}}</span> <span class="type">项目类型：{{busistarDetailData.mainpro_msg.projectType}}</span></p>
                <p>项目描述：{{busistarDetailData.mainpro_msg.description}}</p>
            </div>
            <div class="otherproject">
                <h4>其他成就</h4>
                <p>{{busistarDetailData.otherproject}}</p>
            </div>
            <div class="story">
                <h4>创业经历</h4>
                <p v-html="busistarDetailData.story"></p>
            </div>
        </div>
    </div>
</template>

<script>
    import './busistarDetail.scss'
    import http from '../../../../utils/httpClient'
    import $ from 'jquery'
    export default{
        data(){
            return{
                busistarDetailData:{}
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
            http.get('MgetOneBusistar',{id}).then(res=>{
                this.$store.state.app.index_show=false;
                if(res.data.status) this.busistarDetailData=res.data.data[0];
            })
        }
    }
</script>